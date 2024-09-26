export function GenerateCode () {

    const characters = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    let code = "";
    for (let i=0; i<12; i++) code +=characters.charAt(Math.floor(Math.random()*characters.length)); 
    // console.log(code)
    return code;
};