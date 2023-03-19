const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 800;

let xPos = (canvas.width)/2;
let yPos = (canvas.height)/2;

let img1 = new Image();
img1.src ="ufo.png";
img1.onload = function(){
    ctx.drawImage(img1, xPos,yPos, 100 ,100); 
}

let btnAdelante = document.getElementById("adelante");
let btnAtras = document.getElementById("atras");
let btnIzquierda = document.getElementById("izquierda");
let btnDerecha = document.getElementById("derecha");

let btnSubmit = document.getElementById('submit');

let string="";

btnSubmit.addEventListener('click',()=>{
    let x = document.getElementById("text").value;
    string = x;
    logica(string);
    document.getElementById("text").value = " ";
    console.log(string);
    
})







async function logica(input){
    /*
    Avanzar, Retroceder, Repetir, Vuelta,  Centrar, Pintura

    Avanzar (10)
    Retrocer (10) Repetir (3)
    Vuelta izquierda 60
    Centrar ovni 
    Pintura roja
    */
    // MOVIMIENTOOOOO

    


    async function moveUfo(x,y){
        const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms))
        xPos = Number(xPos);
        x = Number(x);
        x= xPos+ x;
        console.log(x);
        while (true){
            if(xPos < x){
                xPos++;
            }
            else if (xPos > x){
                
                xPos--
            }
            ctx.drawImage(img1, xPos,yPos, 100 ,100);
            if(xPos === x){
                break;
            }
            
            await asyncWait(1);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        yPos = Number(yPos);
        y = Number(y);
        y= yPos+ y;
        console.log(y);
        while (true){
            if(yPos < y){
                yPos++;
            }
            else if (yPos > y){
                
                yPos--
            }
            ctx.drawImage(img1, xPos,yPos, 100 ,100);
            if(yPos === y){
                break;
            }
            
            await asyncWait(1);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        }
        console.log("DONE MOV");
        
    }


    async function adelante(numMovimiento){
        await moveUfo(0,-numMovimiento);
    }

    async function atras(numMovimiento){
        await moveUfo(0,numMovimiento);

    }

    async function izquierda(numMovimiento){
        await moveUfo(-numMovimiento,0);

    }

    async function derecha(numMovimiento){
        await moveUfo(numMovimiento,0);

    }





    function limpiarCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }



    const regex = /[\w]+|[\(\)]|[0-9]*/g; // Hacer una expresion que acepte todo tipo de palabras, caracteres y simbolos.
    const found = input.match(regex); // Guarda en un arreglo todas las palabras que hicieron match con la regex


    // Map con las expresiones y sus tokens correspondientes
    const expressions= new Map([
        [/[aA]vanzar|[rR]etroceder|[rR]epetir|[vV]uelta|[cC]entrar|[Pp]intura/, "Instruccion"],
        [/\(/, "inicioParentesis"],  // value = regex, key = string
        [/\)/, "finalParentesis"],
        [/[Ii]zquierda|[Dd]erecha/, "direccion"],
        [/[Rr]ojo|[Aa]zul|[Vv]erde|[Aa]marillo/, "color"],
        [/[Oo]vni/, "objeto"],
        [/^(?:[1-9]|[1-4][0-9]|50)$/, "numero"],
        [/([0-2]?[0-9]{1,2}|3[0-5][0-9]|360)/, "grados"],
    ]);
        


        
    //Cada palabra del arreglo se checan con el primer valor del map, que son las expresiones regulares
    // Si hacen match, se guarda el token en otro arreglo

    // Quitamos espacios en blanco del arreglo
    found.forEach((word,i)=>{
        if(word === ''){
            found.splice(i,1);
        }
    })

    expressions.forEach((key, value)=>{
        let regExp=(value);
        found.forEach((word,i)=>{
            if(regExp.test(word)){
                found[i]= {key,word};
                
            }
        })

    })
    found.forEach((token, word)=>{
        console.log(token, word);
    })

    function sigToken2(arr){
        if(arr.length != 0){
            let token = arr.shift();
            return [token.key, token.word];
        }
    }



await parser(found);
async function parser(foundArr){
    if(foundArr.length != 0){
        let [token,word] = sigToken2(foundArr);
            if(token === 'Instruccion'){
                let mov = word;
                [token,word] = sigToken2(foundArr);
                if(token === 'color' | token === 'objeto'){ // Checamos la constante (color, objeto, direccion) para aceptarla y terminar ó aceptarla y buscar más expresiones
                    // Si el arreglo todavía tiene algo, llamar a recursividad para aceptar la siguiente expresión
                    if(verificarInputVacio()){
                        console.log("Frase aceptada / Sintaxis correcta");
                        //process.exit(0);
                    }
                    else{
                        await parser(foundArr);
                    }
                }
                else if(token === 'direccion'){
                    let dir = word;
                    [token, word] = sigToken2(foundArr);
                    if(token === 'inicioParentesis' ){ // buscamos aceptar el (
                        [token, word] = sigToken2(foundArr);
                        if(  token === 'numero' | token === 'grado'){
                            let num = word;
                            [token,word] = sigToken2(foundArr);
                            if(token === 'finalParentesis'){
                                if(dir === 'izquierda'){
                                    await izquierda(num);
                                    console.log("IZQUIERDA");
                                    await parser(foundArr);
                                }
                                else if(dir === 'derecha'){
                                    await derecha(num);
                                    console.log("DERECHA");
                                    await parser(foundArr);
                                }
                                
                            }
                            else{
                                console.log("Error! Se esperaba: )");
                                //process.exit(1); // Termina el programa con error
                            }
                        }
                        else{
                            console.log("Error! Se esperaba: numero: 0-360");
                            //process.exit(1); // Termina el programa con error
                        }
                    }
                    else{
                        console.log("Error! Se esperaba: (");
                        //process.exit(1); // Termina el programa con error
                    }
                }
                else if(token === 'inicioParentesis' ){ // buscamos aceptar el (
                    [token,word] = sigToken2(foundArr);
                    if( token === 'numero' || token === 'grado'){
                        let num = word;
                        [token,word] = sigToken2(foundArr);
                        if(token === 'finalParentesis'){
                            if(mov === 'avanzar' || mov === 'Avanzar' ){
                                console.log("ADELANTE2");
                                await adelante(num);
                                console.log("ADELANTE");
                                await parser(foundArr);
                            }
                            else if(mov === 'retroceder' || mov === 'Retroceder'){
                                await atras(num);
                                console.log("ATRAS");
                                await parser(foundArr);
                            }
                        }
                        else{
                            console.log("Error! Se esperaba: )");
                            //process.exit(1); // Termina el programa con error
                        }
                    }
                    else{
                        console.log("Error! Se esperaba: numero: 0-360");
                        //process.exit(1); // Termina el programa con error

                    }

                }
                else{
                    console.log("Error! Se esperaba: color: rojo/azul/amarillo/verde ó objeto: ovni ó direccion: izquierda/derecha ó (");
                    //process.exit(1); // Termina el programa con error
                }
            }
            else{
                console.log("Fin!");
                await parser(foundArr);
            }
        }
        else{
            console.log("No hay mas INPUT")
        }
    }
}