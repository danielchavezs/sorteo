'use client'
import { useState } from "react";

export default function Home() {

  const [parameters, setParameters] = useState({
    firstName: "",
    lastName: "",
    nationalID: "",
    department: "",
    city: "",
    phone: 0,
    email: "",
    habeasData: false,
  });

  // const [results, setResults] = useState({
  //   months: 0,
  //   moNominal: 0,
  //   moInterestOnly: 0,
  //   toDisplay: "",
  //   totalPayment: "",
  //   solved: false,
  // });

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    nationalID: false,
    department: false,
    city: false,
    phone: false,
    email: false,
    habeasData: false,
    count: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name;
    let value = event.target.value;

    value = value.replace(/,/g, ''); // Remueve las comas para mantener la consistencia.
    setParameters({ ...parameters, [property]: (value) });
  };

  // const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
  //   const property = event.target.name;
  //   const value = event.target.value.replace(/,/g, ''); // Remueve las comas para mantener la consistencia
  //   const formattedValue = formatAmount(value);
  //   setParameters({ ...parameters, [property]: formattedValue });
  // };
  
  const resetErrors = () => {
    setError({
      firstName: false,
      lastName: false,
      nationalID: false,
      department: false,
      city: false,
      phone: false,
      email: false,
      habeasData: false,
      count: 0,
    });
  };
  
  const resetAll = () => {
    // setResults({
    //   months: 0,
    //   moNominal: 0,
    //   moInterestOnly: 0,
    //   toDisplay: "",
    //   totalPayment: "",
    //   solved: false,
    // });

    setParameters({
      firstName: "",
      lastName: "",
      nationalID: "",
      department: "",
      city: "",
      phone: 0,
      email: "",
      habeasData: false,
    });
    
    resetErrors();
  };
  
  // const validateForm = async () => {
  //   resetErrors();
  //   const requiredFields: (keyof Parameters)[] = ["amount", "term", "rate", "mortageType"];
  //   let fieldsCompleted = true;
    
  //   const newErrors = { amount: false, term: false, rate: false, mortageType: false, count: 0 };
  //   for (const key of requiredFields) {
  //     if (parameters[key] === "") {
  //       newErrors[key] = true;
  //       fieldsCompleted = false;
  //       newErrors.count++
  //     };
  //   };
  //   setError(newErrors)
  //   return fieldsCompleted;
  // };
  
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // const isValid = await validateForm();
  //   const isValid = true; //HARDCODEADO TEMPORALMENTE PARA MONTAR IMAGEN INICIAL DE APP

  //   console.log(isValid)
    
  //   if (!isValid) {
  //     console.log("ERRORS REGISTERED:", error);
  //     alert("Please complete all fields before submiting.");
  //     return;
  //   };
  //   try {
  //     const amount = deformatAmount(parameters.amount);
  //     const term = Number(parameters.term);
  //     const rate = Number(parameters.rate);
  //     const mortageType = parameters.mortageType;

  //     const res = await calculateMortage(amount, term, rate, mortageType);
  //     setResults(res);
  //   } catch (err) {
  //     window.alert(error);
  //   }
  // };


  return (
    <main className="bg-sky-100 flex min-h-screen flex-col items-center justify-between lg:p-32 md:p-12">

      <div className="bg-white flex lg:flex-row md:flex-col md:rounded-2xl sm:flex-col max-w-fit shadow-2xl lg:rounded-2xl">

      <div className="bg-white w-full lg:w-96 md:w-full sm:w-screen flex p-6 rounded-l-2xl md:rounded-t-2xl">
        <div className="w-full">

            <form onSubmit={resetAll}>
              <div className="flex justify-between mb-8">
                <h2 className="text-lg font-extrabold text-slate-900"> Ingresa tus datos </h2>
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
                      onChange={handleChange}
                    />
                    <span className={error.firstName ? "text-xs text-red-700" : "hidden"}>
                      Ingrese su nombre.
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Apellido</label>
                    <input
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={parameters.firstName}
                      onChange={handleChange}
                    />
                    <span className={error.lastName ? "text-xs text-red-700" : "hidden"}>
                      Ingrese su apellido.
                    </span>
                  </div>


                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Cédula de ciudadanía</label>
                    <input
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="nationalID"
                      type="number"
                      name="nationalID"
                      value={parameters.nationalID}
                      onChange={handleChange}
                    />
                    <span className={error.nationalID ? "text-xs text-red-700" : "hidden"}>
                      Ingrese su cédula de ciudadanía
                    </span>
                  </div>







                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Departamento</label>
                    <select
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="department"
                      name="department"
                      value={parameters.department}
                      // onChange={handleChange}
                    >
                      <option>Cundinamarca</option>
                      <option>Antioquia</option>
                    </select>
                    <span className={error.department ? "text-xs text-red-700" : "hidden"}>
                      Seleccione un departamento
                    </span>
                  </div>



                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Ciudad</label>
                    <select
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="city"
                      name="city"
                      value={parameters.city}
                      // onChange={handleChange}
                    >
                      <option>Bogotá D.C.</option>
                      <option>Medellín</option>
                    </select>
                    <span className={error.city ? "text-xs text-red-700" : "hidden"}>
                      Seleccione una ciudad
                    </span>
                  </div>


                  <div className="flex flex-col">
                    <label className="font-semibold text-black">Teléfono</label>
                    <input
                      className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                      id="phone"
                      type="number"
                      name="phone"
                      value={parameters.phone}
                      onChange={handleChange}
                    />
                    <span className={error.phone ? "text-xs text-red-700" : "hidden"}>
                      Ingrese un teléfono
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
                      onChange={handleChange}
                    />
                    <span className={error.email ? "text-xs text-red-700" : "hidden"}>
                      Ingrese un correo electrónico.
                    </span>
                  </div>


              </div>




              <div className="">
                <button
                  type="submit"
                  className="lg:w-60 md:w-64 mt-8 flex font-bold text-sm bg-lime py-2 pl-12 pr-6 sm:place-content-center sm:px-0 rounded-3xl hover:bg-ligthlime sm:w-full"
                >
                  {" "}
                  Calculate Repayments{" "}
                </button>
              </div>
            </form>
          
        </div>
      </div>

      {/* <div>
        {results.solved ? (
        <SuccessResult results={results} />
        ) : (
          <EmptyResult />
        )}
      </div> */}

      </div>




    </main>  
  );
}
