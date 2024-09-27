import Image from "next/image";

export function RegistrationImage (){
    return(
        <Image
        // src="https://img.icons8.com/?size=100&id=ctIDym8c6Lmt&format=png&color=000000"
        src='/registration-96.png'
        alt="registration-icon"
        width={100} //192
        height={100} //192
        style={{
            height: 'auto',
            width: '100%',
        }}
        />
    )
};

// export function CalculatorIcon (){
//     return (
//         <Image
//         src="./icon-calculator.svg"
//         alt="calculator-icon" 
//         width={24} 
//         height={24} 
//         className="mr-2"
//         />
//     )
// }
