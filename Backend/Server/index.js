

let input = "Vuelta derecha (6) Avanzar (10) centrar ovni pintura rojo"; // INPUT


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
            found[i]= key;
        }
        
    })


})


function sigToken(){
    let token = found.shift();
    return token;
}

function verificarInputVacio(){ // Utilizamos esta función para revisar si todavía hay items en el arreglo con las palabras aceptadas
    if(found.length === 0){
        return true;
    }
    else{
        return false;
    }
}

let token = sigToken();
function parser(){
        if(token === 'Instruccion'){
            token = sigToken();
            if(token === 'color' | token === 'objeto'){ // Checamos la constante (color, objeto, direccion) para aceptarla y terminar ó aceptarla y buscar más expresiones
                // Si el arreglo todavía tiene algo, llamar a recursividad para aceptar la siguiente expresión
                if(verificarInputVacio()){
                    console.log("Frase aceptada / Sintaxis correcta");
                    process.exit(0);
                }
                else{
                    token = sigToken();
                    parser();
                }
            }
            else if(token === 'direccion'){
                token = sigToken();
                if(token === 'inicioParentesis' ){ // buscamos aceptar el (
                    token = sigToken();
                    if(  token === 'numero' | token === 'grado'){
                        token = sigToken();
                        if(token === 'finalParentesis'){
                            if(verificarInputVacio()){
                                console.log("Frase aceptada / Sintaxis correcta");
                                process.exit(0); // Termina el programa exitosamente
                            }
                            else{
                                token = sigToken();
                                parser();
                            }
                        }
                        else{
                            console.log("Error! Se esperaba: )");
                            process.exit(1); // Termina el programa con error
                        }
                    }
                    else{
                        console.log("Error! Se esperaba: numero: 0-360");
                        process.exit(1); // Termina el programa con error
                    }
                }
            }
            else if(token === 'inicioParentesis' ){ // buscamos aceptar el (
                token = sigToken();
                if(  token === 'numero' | token === 'grado'){
                    token = sigToken();
                    if(token === 'finalParentesis'){
                        if(verificarInputVacio()){
                            console.log("Frase aceptada / Sintaxis correcta");
                            process.exit(0); // Termina el programa exitosamente
                        }
                        else{
                            token = sigToken();
                            parser();
                        }
                    }
                    else{
                        console.log("Error! Se esperaba: )");
                        process.exit(1); // Termina el programa con error
                    }
                }
                else{
                    console.log("Error! Se esperaba: numero: 0-360");
                    process.exit(1); // Termina el programa con error

                }

            }
            else{
                console.log("Error! Se esperaba: color: rojo/azul/amarillo/verde ó objeto: ovni ó direccion: izquierda/derecha ó (");
                process.exit(1); // Termina el programa con error
            }
        }
        else{
            console.log("Error! Se esperaba: Instruccion");
            process.exit(1);
        } 
    }


parser();
