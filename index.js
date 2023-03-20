
// Esta primera parte del código es para la configuración gráfica del canvas de HTML

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



let btnSubmit = document.getElementById('submit');

let string="";

let color = "red"; // Aqui ponemos el color rojo por default

function cambiarColor(colorNuevo){ // Creamos una función para poder cambiar el color más abajo
    color = colorNuevo;
}


// Este es el botón que envía los datos de la página y lo pasa por el Parser
btnSubmit.addEventListener('click',()=>{

    let x = document.getElementById("text").value;
    string = x.toLowerCase();
    logica(string);
    document.getElementById("text").value = " ";
    console.log("Input:",string);
    
})




// Aqui tenemos toda la logica para procesar el lexico y la sintaxis

async function logica(input){

    async function moveUfo(x,y){ // Esta función es para el movimiento de los gráficos
        ctx.clearRect(xPos-(img1.width)/2,  yPos-(img1.height)/2, img1.width, img1.height);
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

    


    async function adelante(numMovimiento){ //Esta es la función para mover adelante
        await moveUfo(0,-numMovimiento);

    }

    async function atras(numMovimiento){ //Esta es la función para mover atras
        await moveUfo(0,numMovimiento);
    }

    async function izquierda(numMovimiento){ //Esta es la función para mover izquierda
        await moveUfo(-numMovimiento,0);
    }

    async function derecha(numMovimiento){ //Esta es la función para mover derecha
        await moveUfo(numMovimiento,0);

    }



    function limpiarCanvas(){ // Con esta función limpiamos los dibujos del canvas y dejamos las posiciones en default
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img1,  xCentrado-(img1.width)/2, yCentrado-(img1.height)/2, img1.width, img1.height);
        xPosInicial = canvas.width/2;
        yPosInicial = canvas.height/2;
        xPos = canvas.width/2;
        yPos = canvas.height/2;
        ctx.closePath();
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
    // Si hacen match, se guarda el token y la palabra en otro arreglo

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

    //Con esta funcion obtenemos el objeto del arreglo en el que se encuentran los tokens y las palabras
    // obtenemos [token, word]
    function sigToken2(arr){
        if(arr.length != 0){
            let token = arr.shift();
            return [token.key, token.word];
        }
    }


// Aqui empieza nuestra funcion del parser para analizar la sintaxis
await parser(found);
async function parser(foundArr){
    if(foundArr.length != 0){ // Si ya no hay mas items en el arreglo, sale, ya que acepta Epsilon
        let [token,word] = sigToken2(foundArr);
            if(token === 'Instruccion'){ // Si el token es instruccion, guardamos la palabra en una variable temporal y seguimos
                let mov = word;
                [token,word] = sigToken2(foundArr);
                if(token === 'color'){ // Checamos el color y recursividad para seguir aceptando expresiones si quedan en el arreglo
                    let clr = word; // Guardamos el color en una variable y checamos. Usamos la funcion cambarColor()
                    if(clr === 'rojo'){
                        console.log("Frase aceptada!");
                        cambiarColor("red");
                        console.log("Color Cambiado a : rojo");
                        await parser(foundArr);
                    }else if (clr === 'azul'){
                        console.log("Frase aceptada!");
                        cambiarColor("blue");
                        console.log("Color Cambiado a : azul");
                        await parser(foundArr);
                    }
                    else if(clr === 'verde'){
                        console.log("Frase aceptada!");
                        cambiarColor("green");
                        console.log("Color Cambiado a : verde");
                        await parser(foundArr);
                    }
                    else if (clr ==='amarillo'){
                        console.log("Frase aceptada!");
                        cambiarColor("yellow");
                        console.log("Color Cambiado a : amarillo");
                        await parser(foundArr);
                    }
                }
                else if (token === 'objeto'){ // Si el token es objeto es por que la frase es Centrar Ovni. Limpiamos la pantalla/canvas
                    limpiarCanvas();
                    console.log("Frase aceptada!");
                    console.log("Ovni centrado y canvas borrado");

                }
                else if(token === 'direccion'){ // Si el token es direccion, guardamos la palabra en una variable temporal y seguimos
                    let dir = word;
                    [token, word] = sigToken2(foundArr);
                    if(token === 'inicioParentesis' ){ // buscamos aceptar el (
                        [token, word] = sigToken2(foundArr);
                        if(  token === 'numero'){ // buscamos aceptar el numero de 1-50
                            let num = word; // Guardamos el numero en una variable temporal 
                            [token,word] = sigToken2(foundArr);
                            if(token === 'finalParentesis'){ // buscamos aceptar el )
                                // Si llegamos hasta aqui sin errores es por que la palabra de direccion es izquierda o derecha. Checamos 
                                // y llamamos la funcion para movernos y recursividad para aceptar más entradas
                                if(dir === 'izquierda'){
                                    console.log("Frase aceptada!");
                                    await izquierda(num);
                                    await parser(foundArr);
                                }
                                else if(dir === 'derecha'){
                                    console.log("Frase aceptada!");
                                    await derecha(num);
                                    await parser(foundArr);
                                }else{
                                    console.log("Error sintaxis: Comando no reconocido, checar palabras reservadas y su sintaxis");
                                }
                                
                            }
                            else if(token === 'idComa'){ // si no hubo final parentesis es por que quiere poner , repetir #. Buscamos ,
                                [token,word] = sigToken2(foundArr);
                                if(token ==='Instruccion_Repetir'){ // Buscamos Instruccion_Repetir y seguimos
                                    [token,word] = sigToken2(foundArr);
                                    if(token === 'numero'){ // Buscamos numero y lo guardamos en una variable temporal para usarlo en la función
                                        let numRepeat = word;
                                        [token,word] = sigToken2(foundArr);
                                        if(token === 'finalParentesis'){ // Esperamos el )
                                            if(dir === 'izquierda'){
                                                console.log("Frase aceptada!");
                                                 // Aqui repetimos el movimiento, si fue izquierda o derecha


                                                 // El for loop no es para el analizis sintáctico, pero si para
                                                // que se mueva n numero de veces ya que es repetir
                                                for (let i =0; i < numRepeat; i++){
                                                    await izquierda(num);
                                                }
                                                await parser(foundArr); //llamamos recursividad para aceptar más entradas
                                            }
                                            else if(dir === 'derecha'){
                                                console.log("Frase aceptada!");
                                                for (let i =0; i < numRepeat; i++){
                                                    await derecha(num);
                                                }
                                                await parser(foundArr); //llamamos recursividad para aceptar más entradas
                                            }
                                            else{
                                                console.log("Error sintaxis: Comando no reconocido, checar palabras reservadas y su sintaxis");
                                            }
                                        }
                                        else{
                                            console.log("Se esperaba: )")
                                        }

                                    }
                                    else{
                                        console.log("Se esperaba: numero entero 1-50");
                                    }
                                }
                                else{
                                    console.log("Se esperaba: repetir");
                                }

                            }
                            else{
                                console.log("Error! Se esperaba: )  ó ,");
                                //process.exit(1); // Termina el programa con error
                            }
                        }
                        else{
                            console.log("Error! Se esperaba: numero entero 1-50");
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
                    if( token === 'numero'){ // Buscamos aceptar numero
                        let num = word;
                        [token,word] = sigToken2(foundArr);
                        if(token === 'idComa'){ // Podemos aceptar , para repetir
                            [token,word] = sigToken2(foundArr);
                            if(token === 'Instruccion_Repetir'){ // Buscamos Instruccion_Repetir y seguimos
                                [token,word] = sigToken2(foundArr);
                                if(token === 'numero'){ // Buscamos aceptar numero
                                    let numRepeat = word;
                                    [token,word] = sigToken2(foundArr);
                                    if(token === 'finalParentesis'){ // Buscamos aceptar )
                                        // Si llego hasta aqui solo tenemos que ver cual fue el valor de la variable
                                        // temporal de mov para avanzar o retroceder con repetir

                                        // El for loop no es para el analizis sintáctico, pero si para
                                        // que se mueva n numero de veces ya que es repetir
                                        if(mov === 'avanzar'){
                                            console.log("Frase aceptada!");
                                            for (let i =0; i < numRepeat; i++){
                                                await adelante(num);
                                            }
                                            await parser(foundArr); //llamamos recursividad para aceptar más entradas
                                        }
                                        else if(mov === 'retroceder'){
                                            console.log("Frase aceptada!");
                                            for (let i =0; i < numRepeat; i++){
                                                await atras(num);
                                            }
                                            await parser(foundArr); //llamamos recursividad para aceptar más entradas
                                        }
                                        else{
                                            console.log("Error sintaxis: Comando no reconocido, checar palabras reservadas y su sintaxis");
                                        }

                                    }
                                    else{
                                        console.log("Se esperaba: )")
                                    }
                                }
                                else{
                                    console.log("Se esperaba: numero entero 1-50");
                                }
                            }
                            else{
                                console.log("Se esperaba: repetir");
                            }

                        }
                        else if(token === 'finalParentesis'){ // Podemos cerrar el parentesis para solo avanzar # veces
                            if(mov === 'avanzar'){ // Checamos la variable temporal con la palabra clave y realizamos
                                // la funcion
                                console.log("Frase aceptada!");
                                await adelante(num);
                                await parser(foundArr); //llamamos recursividad para aceptar más entradas
                            }
                            else if(mov === 'retroceder'){
                                console.log("Frase aceptada!");
                                await atras(num);
                                await parser(foundArr); //llamamos recursividad para aceptar más entradas
                            }else{
                                console.log("Error sintaxis: Comando no reconocido, checar palabras reservadas y su sintaxis");
                            }
                        }
                        else{
                            console.log("Error! Se esperaba: ) ó ,");
                            //process.exit(1); // Termina el programa con error
                        }
                    }
                    else{
                        console.log("Error! Se esperaba: numero entero 1-50");
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



