

let input = "Adelante (10)";


const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[aA]delante|[0-9]+|\(|\)/g;
const found = input.match(regex);

console.log(found);

const expressions= new Map([
    [new RegExp(/[aA]delante/), "Identificador"], 
    [new RegExp(/[0-9]+/), "integer"],
    [new RegExp(/\(/), "openParentesis"],  // value = regex, key = string
    [new RegExp(/\)/), "closedParentesis"]
]);
    
let arr = new Array;
    
expressions.forEach((key, value)=>{
    let exp = new RegExp(value);
    found.forEach((word,i)=>{
        if(exp.test(word)){
            found[i]= key;
        }
        
    })
    
})

console.log(found);