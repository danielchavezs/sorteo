import { Parameters } from "../types";

export const validateString = (value: string, field: keyof Parameters) => {
    const regex =
      field === 'city'
        ? /^[a-zA-ZÀ-ÿ\s.]+$/ // Acepta letras, tildes, espacios y puntos (.)
        : /^[a-zA-ZÀ-ÿ\s]+$/; // Acepta letras, tildes y espacios, sin puntos

    let errorMessage = '';

    const fieldNameMap: Record<string, string> = {
      firstName: 'nombre',
      lastName: 'apellido',
      department: 'departamento',
      city: 'municipio',
    };

    const name = fieldNameMap[field];

    if (value.trim() === '') {
      errorMessage = `Debes ingresar un ${name}.`;
    } else if (!regex.test(value)) {
      errorMessage = `${name} no válido: no se aceptan números o caracteres especiales.`;
    };

    return errorMessage;
  };


export const validateNumber = (
    value: string | number,
    field: keyof Parameters
    ) => {
    
    const regex = /^\d+$/; // Acepta solo números
    let errorMessage = '';
    
    
    const fieldMap: Record<string, string> = {
        pone: 'telefono',
        nationalID: 'documento',
    };
    
    // const errorHandling = fieldMap[field];

    if (typeof value === 'string' && value.trim() === '') {
      errorMessage = `Debes ingresar un ${field} válido.`;
    } else if (!regex.test(String(value))) {
      errorMessage = `Este campo solo puede contener números.`;
    } else if (field === 'phone' && String(value).length !== 10) {
      errorMessage = 'El número de teléfono debe tener exactamente 10 dígitos.';
    } else if (field === 'nationalID' && String(value).length > 10) {
      errorMessage = 'El número de documento no puede tener más de 10 dígitos.';
    };
    return errorMessage;
};

export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para validar el email
    let errorMessage = '';

    if (email.trim() === '') {
      errorMessage = 'Debes ingresar un correo electrónico.';
    } else if (!regex.test(email)) {
      errorMessage = 'Correo electrónico no válido.';
    };

    return errorMessage;
  };

export const validateBoolean = (boolean: boolean) => {

    let errorMessage = '';

    if(!boolean){
        errorMessage = 'Se debe aceptar el tratamiento de datos para poder registrarse en el sorteo.'
    } else {
        errorMessage = '';
    };
    return errorMessage;
};
















// export const validateBoolean = (value: boolean, _field: string) =>
//     value
//       ? 'Se debe aceptar el tratamiento de datos para poder registrarse en el sorteo.'
//       : '';

//   const validateForm = (error: { [key: string]: string }) => {
//     // Validación de presencia de errores en el estado local
//     for (const value of Object.values(error)) {
//       if (!!value) {
//         return false;
//       }
//     }
//     return true;
// };