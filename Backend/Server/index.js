

let input = "avanzar (10)"; // INPUT


const regex = /[\w]+|[\(\)]|[0-9]*/g;
const found = input.match(regex); // Guarda en un arreglo todas las palabras que hicieron match con la regex

console.log(found); 


// Map con las expresiones y sus tokens correspondientes
const expressions= new Map([
    [/[aA]vanzar|[rR]etroceder|[rR]epetir/, "Instruccion"], 
    [/[Vv]uelta/, "giro"],
    [/\(/, "openParentesis"],  // value = regex, key = string
    [/\)/, "closedParentesis"],
    [/[Ii]zquierda|[Dd]erecha/, "direccion"],
    [/[Pp]intura/, "identificadorDeColor"], 
    [/[Rr]ojo|[Aa]zul|[Vv]erde|[Aa]marillo/, "colores"],
    [/[Oo]vni/, "objeto"],
    [/^(?:[1-9]|[1-4][0-9]|50)$/, "numeros"],
    [/([0-2]?[0-9]{1,2}|3[0-5][0-9]|360)/, "grados"],
]);
    

    
//Cada palabra del arreglo se checan con el primer valor del map, que son las expresiones regulares
// Si hacen match, se guarda el token en otro arreglo
expressions.forEach((key, value)=>{
    let exp = new RegExp(value);
    found.forEach((word,i)=>{
        if(word === ''){
            found.splice(i,1);
        }
        if(exp.test(word)){
            found[i]= key;
        }
        
    })
    
})

console.log(found);