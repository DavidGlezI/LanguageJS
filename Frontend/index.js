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

function moveUfo(x,y, repeat){
    for(let i =0; i<repeat;i++){
        ctx.clearRect(xPos,yPos,xPos+ 100 ,yPos + 100 );
        xPos += x;
        yPos += y;
        ctx.drawImage(img1, xPos,yPos, 100 ,100); 
    }
    
}

let btnAdelante = document.getElementById("adelante");
let btnAtras = document.getElementById("atras");
let btnIzquierda = document.getElementById("izquierda");
let btnDerecha = document.getElementById("derecha");


function adelante(repeat){
    ctx.beginPath();
    ctx.moveTo(xPos,yPos);
    moveUfo(0,-10, repeat);

}

function atras(repeat){
    ctx.beginPath();
    ctx.moveTo(xPos,yPos);
    moveUfo(0,10, repeat);

}

function izquierda(repeat){
    ctx.beginPath();
    ctx.moveTo(xPos,yPos);
    moveUfo(-10,0, repeat);

}

function derecha(repeat){
    ctx.beginPath();
    ctx.moveTo(xPos,yPos);
    moveUfo(10,0, repeat);

}

btnAdelante.addEventListener("click",()=>{
    //   
    adelante(3);
})

btnAtras.addEventListener("click",()=>{
    //   
    atras();
})

btnIzquierda.addEventListener("click",()=>{
    //   
    izquierda();
})

btnDerecha.addEventListener("click",()=>{
    //   
    derecha();
})



function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
