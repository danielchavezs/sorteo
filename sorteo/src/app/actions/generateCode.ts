export function generateCode () {

    // Definimos los carctéres alfanuméricos considerados para la generación del código.
    const characters = "abcdefghijkmnpqrtuvwxyz012346789ABCDEFGHJKMNPQRTUVWXYZ";
    let code = "";
    for (let i=0; i<12; i++) code +=characters.charAt(Math.floor(Math.random()*characters.length)); 
    // console.log(code)
    return code;
};