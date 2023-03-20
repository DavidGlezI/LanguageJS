const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");



canvas.height = 400;
canvas.width = 800;



let xPos = canvas.width/2;
let yPos = canvas.height/2;

let img1 = new Image();
img1.src ="ufo.png";

let xPosInicial = canvas.width/2;
let yPosInicial = canvas.height/2;

let xCentrado = canvas.width/2;
let yCentrado = canvas.height/2;


img1.onload = function () {
    let offset = 300;
    while (img1.width > canvas.width || img1.height> canvas.height) {
    
      if (img1.width > canvas.width) {
      
        let newWidth = canvas.width-offset;
        
        img1.height = Math.round((img1.height / img1.width) * newWidth);
        
        img1.width = newWidth;
        
      }
      else if (img1.height > canvas.height) {
      
        let newHeight = canvas.height-offset;
        
        img1.width = Math.round((img1.width / img1.height) * newHeight);
        
        img1.height = newHeight;
      
      }
    
    }
    
    ctx.drawImage(img1,  xPos-(img1.width)/2,  yPos-(img1.height)/2, img1.width, img1.height); 

  };


let btnAdelante = document.getElementById("adelante");
let btnAtras = document.getElementById("atras");
let btnIzquierda = document.getElementById("izquierda");
let btnDerecha = document.getElementById("derecha");

let btnSubmit = document.getElementById('submit');

let string="";

let color = "red";

function cambiarColor(colorNuevo){
    color = colorNuevo;
}



btnSubmit.addEventListener('click',()=>{

    let x = document.getElementById("text").value;
    string = x.toLowerCase();
    logica(string);
    document.getElementById("text").value = " ";
    console.log("Input:",string);
    
})



let ovni = ctx.drawImage(img1,  xPos-(img1.width)/2,  yPos-(img1.height)/2, img1.width, img1.height); 



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
        ctx.strokeStyle = color;
        ctx.moveTo(xPosInicial, yPosInicial);
        while (true){
            if(xPos < x){
                xPos++;
            }
            else if (xPos > x){
                xPos--;
            }
            ctx.drawImage(img1,  xPos-(img1.width)/2,  yPos-(img1.height)/2, img1.width, img1.height); 
            ctx.lineTo(xPos,yPos);
            ctx.stroke();
            
            if(xPos === x){
                break;
            }
            
            await asyncWait(1);
            ctx.clearRect(xPos-(img1.width)/2,  yPos-(img1.height)/2, img1.width, img1.height);
            yPosInicial = yPos;

        }

        yPos = Number(yPos);
        y = Number(y);
        y= yPos+ y;
        while (true){
            if(yPos < y){
                yPos++;

            }
            else if (yPos > y){
                yPos--;
            }
           
            ctx.drawImage(img1,  xPos-(img1.width)/2,  yPos-(img1.height)/2, img1.width, img1.height); 
            ctx.lineTo(xPos,yPos);
            ctx.stroke();
            if(yPos === y){
                break;
            }
            
            await asyncWait(1);
            ctx.clearRect(xPos-(img1.width)/2,  yPos-(img1.height)/2, img1.width, img1.height);
            xPosInicial = xPos;    
        }    
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
        ctx.drawImage(img1,  xCentrado-(img1.width)/2, yCentrado-(img1.height)/2, img1.width, img1.height); 
    }



    const regex = /[\w]+|[,]|[\(\)]|[0-9]*/g; // Hacer una expresion que acepte todo tipo de palabras, caracteres y simbolos.
    const found = input.match(regex); // Guarda en un arreglo todas las palabras que hicieron match con la regex

    // Map con las expresiones y sus tokens correspondientes
    const expressions= new Map([
        [/[aA]vanzar|[rR]etroceder|[vV]uelta|[cC]entrar|[Pp]intura/, "Instruccion"],
        [/[rR]epetir/, "Instruccion_Repetir"],
        [/\(/, "inicioParentesis"],  // value = regex, key = string
        [/\)/, "finalParentesis"],
        [/[Ii]zquierda|[Dd]erecha/, "direccion"],
        [/\,/, "idComa"],
        [/[Rr]ojo|[Aa]zul|[Vv]erde|[Aa]marillo/, "color"],
        [/[Oo]vni/, "objeto"],
        [/^(?:[1-9]|[1-4][0-9]|50)$/, "numero"],
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
                if(token === 'color'){ // Checamos la constante (color, objeto, direccion) para aceptarla y terminar ó aceptarla y buscar más expresiones
                    let clr = word;
                    if(clr === 'rojo'){
                        cambiarColor("red");
                        console.log("Color Cambiado a : rojo");
                        await parser(foundArr);
                    }else if (clr === 'azul'){
                        cambiarColor("blue");
                        console.log("Color Cambiado a : azul");
                        await parser(foundArr);
                    }
                    else if(clr === 'verde'){
                        cambiarColor("green");
                        console.log("Color Cambiado a : verde");
                        await parser(foundArr);
                    }
                    else if (clr ==='amarillo'){
                        cambiarColor("yellow");
                        console.log("Color Cambiado a : amarillo");
                        await parser(foundArr);
                    }
                }
                else if (token === 'objeto'){
                    limpiarCanvas();
                    console.log("Ovni centrado y canvas borrado")

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
                                    await parser(foundArr);
                                }
                                else if(dir === 'derecha'){
                                    await derecha(num);
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
                else if(token === 'inicioParentesis'){ // buscamos aceptar el (
                    [token,word] = sigToken2(foundArr);
                    if( token === 'numero' || token === 'grado'){
                        let num = word;
                        [token,word] = sigToken2(foundArr);
                        if(token === 'idComa'){
                            [token,word] = sigToken2(foundArr);
                            if(token === 'Instruccion_Repetir'){
                                [token,word] = sigToken2(foundArr);
                                if(token === 'numero'){
                                    let numRepeat = word;
                                    [token,word] = sigToken2(foundArr);
                                    if(token === 'finalParentesis'){
                                        if(mov === 'avanzar' || mov === 'Avanzar' ){
                                            for (let i =0; i < numRepeat; i++){
                                                await adelante(num);
                                            }
                                            await parser(foundArr);
                                        }
                                        else if(mov === 'retroceder' || mov === 'Retroceder'){
                                            await atras(num, numRepeat);
                                            await parser(foundArr);
                                        }

                                    }
                                    else{
                                        console.log("Se esperaba: )")
                                    }
                                }
                                else{
                                    console.log("Se esperaba: numero entero")
                                }
                            }
                            else{
                                console.log("Se esperaba: repetir")
                            }

                        }
                        else if(token === 'finalParentesis'){
                            if(mov === 'avanzar' || mov === 'Avanzar' ){
                                await adelante(num,3);
                                await parser(foundArr);
                            }
                            else if(mov === 'retroceder' || mov === 'Retroceder'){
                                await atras(num);
                                await parser(foundArr);
                            }   
                        }
                        else{
                            console.log("Error! Se esperaba: ) ó ,");
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
                await parser(foundArr);
            }
        }
    }
}



