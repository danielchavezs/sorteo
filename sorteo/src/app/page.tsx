'use client'
import { useState } from "react";
import { getCities, getDepartments } from "./actions/getCities";
import SuccessResult from "./ui/SuccessResult";
import EmptyResult from "./ui/EmptyResult";
import { generateCode } from "./actions/generateCode";
import { Parameters } from "./types";
import { count } from "console";

export default function Home() {

  // getDepartments();
  // getCities(8)

  const [results, setResults] = useState({
    solved: false, 
    code: ""
  });

  const [parameters, setParameters] = useState<Parameters>({
    firstName: "",
    lastName: "",
    nationalID: "",
    department: "",
    city: "",
    phone: "",
    email: "",
    habeasData: false,
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    nationalID: "",
    department: "",
    city: "",
    phone: "",
    email: "",
    habeasData: "",
  });

  
  const resetResults = () => {
    setResults({
      solved: false,
      code: "",
    })
  };

  const resetErrors = () => {
    setError({
      firstName: "",
      lastName: "",
      nationalID: "",
      department: "",
      city: "",
      phone: "",
      email: "",
      habeasData: "",
    });
  };
  
  const resetAll = () => {
    
    setParameters({
      firstName: "",
      lastName: "",
      nationalID: "",
      department: "",
      city: "",
      phone: "",
      email: "",
      habeasData: false,
    });
    
    resetResults();
    resetErrors();
  };
  
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const property = event.target.name;
  //   let value: string | number = event.target.value;

  //   setParameters(prevParameters => ({
  //     ...prevParameters,
  //     [property]: value,
  //   }));

  //   // Si el campo es de tipo número, convertimos el valor
  //   if (property === "phone" || property === "nationalID") {
  //     value = Number(value);
  //   };
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const property = event.target.name;
    let value = event.target.value;
  
    // Actualizamos el estado sin convertir inmediatamente a número
    setParameters(prevParameters => ({
      ...prevParameters,
      [property]: value,
    }));
  
    // Validamos inmediatamente si es un campo numérico
    if (property === "phone" || property === "nationalID") {
      validateNumber(value, property === "phone" ? "telefono" : "documento"); // PENDIENTE DE REVISAR. POSIBLEMENTE REMOVIBLE
    }
  };
  

  const validateString = (value: string, field: "nombre" | "apellido" | "departamento" | "municipio") => {

    const regex =
      field === "municipio"
        ? /^[a-zA-ZÀ-ÿ\s.]+$/ // Acepta letras, tildes, espacios y puntos (.)
        : /^[a-zA-ZÀ-ÿ\s]+$/; // Acepta letras, tildes y espacios, sin puntos

    let errorMessage = "";
  
    if (value.trim() === "") {
      errorMessage = `Debes ingresar un ${field}.`;
    } else if (!regex.test(value)) {
      errorMessage = `${field} no válido: no se aceptan números o caracteres especiales.`;
    }

    // Mapeo del campo con el estado del error correspondiente
    const fieldMap: Record<string, string> = {
      nombre: "firstName",
      apellido: "lastName",
      departamento: "department",
      municipio: "city",
    };

    const errorHandling = fieldMap[field];
  
    setError((prevError) => ({
      ...prevError,
      [errorHandling]: errorMessage,
    }));
  };


  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para validar el email
    let errorMessage = "";
  
    if (email.trim() === "") {
      errorMessage = "Debes ingresar un correo electrónico.";
    } else if (!regex.test(email)) {
      errorMessage = "Correo electrónico no válido.";
    }
  
    setError((prevError) => ({
      ...prevError,
      email: errorMessage,
    }));
  };


  const validateNumber = (
    value: string | number,
    field: "telefono" | "documento"
  ) => {
    const regex = /^\d+$/; // Acepta solo números
    let errorMessage = "";
    // const numb = Number(value);
  
    if (typeof value === "string" && value.trim() === "") {
      errorMessage = `Debes ingresar un ${field} válido.`;
    } else if (!regex.test(String(value))) {
      errorMessage = `El ${field} solo puede contener números.`;
    } else if (field === "telefono" && String(value).length !== 10) {
      errorMessage = "El número de teléfono debe tener exactamente 10 dígitos.";
    } else if (field === "documento" && String(value).length > 10) {
      errorMessage = "El número de documento no puede tener más de 10 dígitos.";
    }
  
    const fieldMap: Record<string, string> = {
      telefono: "phone",
      documento: "nationalID",
    };
  
    const errorHandling = fieldMap[field];
  
    setError((prevError) => ({
      ...prevError,
      [errorHandling]: errorMessage,
    }));
  };
  

  const validateHabeasData = () => {

    if (parameters.habeasData === true){
      setError((prevError) => ({
        ...prevError,
        habeasData: "",
      }));
      return true;
    } else if(parameters.habeasData === false){
      setError((prevError) => ({
        ...prevError,
        habeasData: "Se debe aceptar el tratamiento de datos para poder registrarse en el sorteo.",
      }));
    }
    return false;
  };
  

  const validateForm = () => {
    // resetErrors();
    validateHabeasData();

    // Validación de presencia de errores en el estado local
    for (const value of Object.values(error)) {
      if (typeof value === "string" && value.length > 1){
        return false;
      };
    };
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const isValid = validateForm();
    // console.log("VALIDACIÓN DEL FORMULARIO COMPLETO", isValid)
    
    // if (!isValid) {
    //   console.log("ERRORS REGISTERED:", error);
    //   alert("Por favor verifique y complete la totalidad de los campos para poder registrarse.");
    //   return;
    // };
    //  ACÁ SE PODRÍA HACER UNA VALIDACIÓN ADICIONAL SOBRE USUARIOS YA REGISTRADOS
    try {
      resetResults();
      const res = generateCode();
      setResults({
        solved: true,
        code: res
      });
      // console.log(code)
    } catch (err) {
      window.alert(error);
    };
  };

  // console.log(parameters)
  // console.error(error)

  return (
    <main className="bg-sky-100 flex min-h-screen flex-col items-center justify-between lg:p-32 md:p-12">

      <div className="bg-white flex lg:flex-row md:flex-col md:rounded-2xl sm:flex-col max-w-fit shadow-2xl lg:rounded-2xl">

      <div className="bg-white w-full lg:w-96 md:w-full sm:w-screen flex p-6 rounded-l-2xl md:rounded-t-2xl">
        <div className="w-full">

            <form onSubmit={handleSubmit}>
              <div className="flex justify-between mb-8">
                <h2 className="text-lg font-extrabold text-slate-900"> Regístrate para participar </h2>
                <button
                  className="text-gray-400 font-semibold underline text-xs"
                  type="button"
                  onClick={resetAll}
                >
                  {" "}
                  Limpiar Datos
                </button>
              </div>

              <div>
                  <div className="flex flex-col text-black">
                    <label className="font-semibold">Nombre</label>
                    <input
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={parameters.firstName}
                      onChange={(event) =>{
                        validateString(event.target.value, "nombre")
                        handleChange(event)
                      }}
                    />
                    <span className={error.firstName ? "text-xs text-red-700" : "hidden"}>
                      {error.firstName}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Apellido</label>
                    <input
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={parameters.lastName}
                      onChange={(event) =>{
                        validateString(event.target.value, "apellido")
                        handleChange(event)
                      }}
                    />
                    <span className={error.lastName ? "text-xs text-red-700" : "hidden"}>
                      {error.lastName}
                    </span>
                  </div>


                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Cédula de ciudadanía</label>
                    <input
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="nationalID"
                      type="text"
                      name="nationalID"
                      value={parameters.nationalID}
                      onChange={(event) =>{
                        validateNumber(event.target.value, "documento")
                        handleChange(event)
                      }}
                   
                    />
                    <span className={error.nationalID ? "text-xs text-red-700" : "hidden"}>
                      {error.nationalID}
                    </span>
                  </div>


                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Departamento</label>
                    <select
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="department"
                      name="department"
                      value={parameters.department}
                      onChange={(event) =>{
                        validateString(event.target.value, "departamento")
                        handleChange(event)
                      }}
                    >
                      <option value="">Seleccione un departamento</option>
                      <option>Cundinamarca</option>
                      <option>Antioquia</option>
                    </select>
                    <span className={error.department ? "text-xs text-red-700" : "hidden"}>
                      {error.department}
                    </span>
                  </div>




                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Ciudad</label>
                    <select
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="city"
                      name="city"
                      value={parameters.city}
                      onChange={(event) =>{
                        validateString(event.target.value, "municipio")
                        handleChange(event)
                      }}
                    >
                      <option value="">Seleccione una ciudad</option>
                      <option>Bogotá D.C.</option>
                      <option>Medellín</option>
                    </select>
                    <span className={error.city ? "text-xs text-red-700" : "hidden"}>
                      {error.city}
                    </span>
                  </div>


                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Teléfono</label>
                    <input
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="phone"
                      type="text"
                      name="phone"
                      value={parameters.phone}
                      onChange={(event) =>{
                        validateNumber(event.target.value, "telefono")
                        handleChange(event)
                      }}
                    />
                    <span className={error.phone ? "text-xs text-red-700" : "hidden"}>
                      {error.phone}
                    </span>
                  </div>
                

                  <div className="flex flex-col">
                    <label className="font-semibold text-black">e-mail</label>
                    <input
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="email"
                      type="email"
                      name="email"
                      value={parameters.email}
                      onChange={(event) =>{
                        validateEmail(event.target.value)
                        handleChange(event)
                      }}
                    />
                    <span className={error.email ? "text-xs text-red-700" : "hidden"}>
                      {error.email}
                    </span>
                  </div>

                  <div className="flex flex-row">
                    <input
                      className="px-2 pb-1 mt-1 rounded-md border border-slate-400"
                      id="habeasData"
                      type="checkbox"
                      name="habeasData"
                      checked={parameters.habeasData} // Aquí usamos 'checked' en lugar de 'value'
                      onChange={(event) =>{
                        setParameters({ ...parameters, habeasData: event.target.checked })
                        // validateHabeasData()
                      }}
                    />
                    <p className="ml-4 mt-4 w-full text-xs">
                      Autorizo el tratamiento de mis datos de acuerdo con la finalidad establecida en la política de protección de datos personales
                    </p>
                    <span className={error.habeasData ? "text-xs text-red-700" : "hidden"}>
                      {error.habeasData}
                    </span>
                  </div>



              </div>




              <div className="">
                <button
                  type="submit"
                  className="bg-slate-300 lg:w-60 md:w-64 mt-8 flex font-bold text-sm bg-lime py-2 pl-12 pr-6 sm:place-content-center sm:px-0 rounded-3xl hover:bg-ligthlime sm:w-full"
                >
                  {" "}
                  Recibir Código{" "}
                </button>
              </div>
            </form>
          
        </div>
      </div>



      <div>
        {results.solved ? (
        <SuccessResult code={results.code} />
        ) : (
          <EmptyResult />
        )}
      </div>

      </div>




    </main>  
  );
}
