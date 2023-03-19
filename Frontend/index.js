
/*
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

*/
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
        
        await asyncWait(10);
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
        if(yPos === x){
            break;
        }
        
        await asyncWait(10);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return Promise.resolve(undefined);
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
    document.getElementById("text").value = " ";
    console.log(string);
    logica(string);
    
})




function adelante(numMovimiento){
    ctx.beginPath();
    ctx.moveTo(xPos,yPos);
    moveUfo(0,-numMovimiento);
}

function atras(numMovimiento){
    ctx.beginPath();
    ctx.moveTo(xPos,yPos);
    moveUfo(0,numMovimiento);

}

async function izquierda(numMovimiento){
    console.log(numMovimiento);
    console.log("izquierda");
    await moveUfo(-numMovimiento,0);

}

async function derecha(numMovimiento){
    console.log(numMovimiento);
    console.log("derecha");
    await moveUfo(numMovimiento,0);

}





function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



function logica(input){
    /*
    Avanzar, Retroceder, Repetir, Vuelta,  Centrar, Pintura

    Avanzar (10)
    Retrocer (10) Repetir (3)
    Vuelta izquierda 60
    Centrar ovni 
    Pintura roja
    */




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

    console.log(found);

    function sigToken(){
        let token = found.shift();
        return [token.key, token.word];
    }

    function verificarInputVacio(){ // Utilizamos esta función para revisar si todavía hay items en el arreglo con las palabras aceptadas
        if(found.length === 0){
            return true;
        }
        else{
            return false;
        }
    }

    

    async function parser(){
        let [token,word] = sigToken();
            if(token === 'Instruccion'){
                let mov = word;
                [token,word] = sigToken();
                if(token === 'color' | token === 'objeto'){ // Checamos la constante (color, objeto, direccion) para aceptarla y terminar ó aceptarla y buscar más expresiones
                    // Si el arreglo todavía tiene algo, llamar a recursividad para aceptar la siguiente expresión
                    if(verificarInputVacio()){
                        console.log("Frase aceptada / Sintaxis correcta");
                        //process.exit(0);
                    }
                    else{
                        parser();
                    }
                }
                else if(token === 'direccion'){
                    let dir = word;
                    [token, word] = sigToken();
                    if(token === 'inicioParentesis' ){ // buscamos aceptar el (
                        [token, word] = sigToken();
                        if(  token === 'numero' | token === 'grado'){
                            let num = word;
                            [token,word] = sigToken();
                            if(token === 'finalParentesis'){
                                if(verificarInputVacio()){
                                    console.log("Frase aceptada / Sintaxis correcta");
                                    
                                    if(dir === 'izquierda'){
                                        await izquierda(num);
                                    }
                                    else if(dir === 'derecha'){
                                        await derecha(num);
                                    }
                                    //process.exit(0); // Termina el programa exitosamente
                                }
                                else{
                                    
                                    //[token,word] = sigToken();
                                    parser();
                                    console.log(dir);
                                    console.log(num);
                                    if(dir === 'izquierda'){
                                        await izquierda(num);
                                    }
                                    else if(dir === 'derecha'){
                                        await derecha(num);
                                    }
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
                    [token,word] = sigToken();
                    if(  token === 'numero' | token === 'grado'){
                        let num = word;
                        [token,word] = sigToken();
                        if(token === 'finalParentesis'){
                            if(verificarInputVacio()){
                                console.log("Frase aceptada / Sintaxis correcta");
                                if(mov = 'avanzar'){
                                    await adelante(num);
                                }
                                else if(mov = 'retroceder'){
                                    await atras(num);
                                }
                                //process.exit(0); // Termina el programa exitosamente
                            }
                            else{
                                if(mov = 'avanzar'){
                                    adelante(num);
                                }
                                else if(mov = 'retroceder'){
                                    atras(num);
                                }
                                //[token,word] = sigToken();
                                parser();
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
                console.log("Error! Se esperaba: Instruccion");
                //process.exit(1);
            } 
        }


    parser();
}


