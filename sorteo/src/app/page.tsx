'use client';
import SuccessResult from './ui/SuccessResult';
import EmptyResult from './ui/EmptyResult';
import { useState } from 'react';
import { getCities, getDepartments } from './actions/getCities';
import { generateCode } from './actions/generateCode';
import { Errors, Parameters, Results } from './types';
import { validateBoolean, validateEmail, validateNumber, validateString } from './actions/validations';

export default function Home() {

  const [formInteraction, setFormInteraction] = useState<boolean>(false)

  const [results, setResults] = useState<Results>({
    solved: false,
    code: '',
  });

  const [parameters, setParameters] = useState<Parameters>({
    firstName: '',
    lastName: '',
    nationalID: '',
    department: '',
    city: '',
    phone: '',
    email: '',
    habeasData: false,
  });

  const [error, setError] = useState<Errors>({
    firstName: '',
    lastName: '',
    nationalID: '',
    department: '',
    city: '',
    phone: '',
    email: '',
    habeasData: '',
  });

  const resetResults = () => {
    setResults({
      solved: false,
      code: '',
    });
  };

  const resetErrors = () => {
    setError({
      firstName: '',
      lastName: '',
      nationalID: '',
      department: '',
      city: '',
      phone: '',
      email: '',
      habeasData: '',
    });
  };

  const resetFields = () => {
    setParameters({
      firstName: '',
      lastName: '',
      nationalID: '',
      department: '',
      city: '',
      phone: '',
      email: '',
      habeasData: false,
    });
  };

  const resetAll = () => {
    setFormInteraction(false);
    resetFields();
    resetResults();
    resetErrors();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const property = event.target.name;
    let value = event.target.value;

    // Actualizamos el estado sin convertir inmediatamente a número
    setParameters((prevParameters) => ({
      ...prevParameters,
      [property]: value,
    }));

    // Validamos inmediatamente si es un campo numérico
    if (property === 'phone' || property === 'nationalID') {
      validateNumber(value, property === 'phone' ? 'phone' : 'nationalID'); // PENDIENTE DE REVISAR. POSIBLEMENTE REMOVIBLE
    }
  };


  const executeValidations = () => {
    // Verificamos si hay errores después de las validaciones y se registran en un objeto.
    return {
      firstName: validateString(parameters.firstName, 'firstName'),
      lastName: validateString(parameters.lastName, 'lastName'),
      department: validateString(parameters.department, 'department'),
      city: validateString(parameters.city, 'city'),
      nationalID: validateNumber(parameters.nationalID, 'nationalID'),
      phone: validateNumber(parameters.phone, 'phone'),
      email: validateEmail(parameters.email),
      habeasData: validateBoolean(parameters.habeasData)
    };
  };

  const updateErrors = () => {
    const newErrors = executeValidations();
    setError(newErrors);
    return
  };
  

  const errorOnChange = (
      event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
      key: keyof Parameters
    ) => {

    let error: string = "";
    let value: string | boolean = event.target.value;

    // Asignamos el tipo de validación dependiendo de el campo en el que se ejecute.

    if (key === "firstName" || key === "lastName" || key === "department" || key === "city") {
      error = validateString(value, key);
    } else if (key === "nationalID" || key === "phone") {
      error = validateNumber(value, key);
    } else if (key === "email") {
      error = validateEmail(value);
    } else if (key === "habeasData" && event.target.type === "checkbox") {  // Se hace una validación adicional para prevenir errores de tipado.
        value = event.target.checked
        error = validateBoolean(value); 
    };
 
    // Actualizamos el estado los errores en tiempo real ejecutando la función en el onChange.
    setError((prev) => ({
      ...prev,
      [key]: error,
    }));
  };


  const validateForm = () => {
    // Validación de presencia de errores en el estado local
    for (const value of Object.values(error)) {
      if (typeof value === "string" && value.length > 1){
        return false;
      };
    };
    return true;
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('ejecutando submit');
    e.preventDefault();

    updateErrors();
    const isValidForm = validateForm();

    if (!formInteraction || !isValidForm) {
      console.log('ERRORS REGISTERED:', error);
      alert(
        'Por favor complete y verifique la totalidad de los campos para poder registrarse.'
      );
      return;
    }

    // Si no hay errores, sigue con el flujo de generación de código
    try {
      resetResults();
      const res = generateCode();
      setResults({
        solved: true,
        code: res,
      });
      // resetFields();
    } catch (err) {
      window.alert(error);
    }
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
                <h2 className="text-lg font-extrabold text-slate-900">
                  {' '}
                  Regístrate para participar{' '}
                </h2>
                <button
                  className="text-gray-400 font-semibold underline text-xs"
                  type="button"
                  onClick={resetAll}
                >
                  {' '}
                  Limpiar Datos
                </button>
              </div>

              <div>
                <div className="flex flex-col text-black">
                  <label className="font-semibold">Nombre</label>
                  <input
                    // required
                    className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={parameters.firstName}
                    onChange={(event) => {
                      errorOnChange(event, "firstName");
                      handleChange(event);
                    }}
                  />
                  <span
                    className={
                      error.firstName ? 'text-xs text-red-700' : 'hidden'
                    }
                  >
                    {error.firstName}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-black">Apellido</label>
                  <input
                    // required
                    className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={parameters.lastName}
                    onChange={(event) => {
                      errorOnChange(event, "lastName");
                      handleChange(event);
                      setFormInteraction(true);
                    }}
                  />
                  <span
                    className={
                      error.lastName ? 'text-xs text-red-700' : 'hidden'
                    }
                  >
                    {error.lastName}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-black">
                    Cédula de ciudadanía
                  </label>
                  <input
                    // required
                    className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                    id="nationalID"
                    type="text"
                    name="nationalID"
                    value={parameters.nationalID}
                    onChange={(event) => {
                      errorOnChange(event, "nationalID");
                      handleChange(event);
                      setFormInteraction(true);
                    }}
                  />
                  <span
                    className={
                      error.nationalID ? 'text-xs text-red-700' : 'hidden'
                    }
                  >
                    {error.nationalID}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-black">
                    Departamento
                  </label>
                  <select
                    // required
                    className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                    id="department"
                    name="department"
                    value={parameters.department}
                    onChange={(event) => {
                      errorOnChange(event, "department")
                      handleChange(event);
                      setFormInteraction(true);
                    }}
                  >
                    <option value="">Seleccione un departamento</option>
                    <option>Cundinamarca</option>
                    <option>Antioquia</option>
                  </select>
                  <span
                    className={
                      error.department ? 'text-xs text-red-700' : 'hidden'
                    }
                  >
                    {error.department}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-black">Ciudad</label>
                  <select
                    // required
                    className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                    id="city"
                    name="city"
                    value={parameters.city}
                    onChange={(event) => {
                      errorOnChange(event, "city");
                      handleChange(event);
                      setFormInteraction(true);
                    }}
                  >
                    <option value="">Seleccione una ciudad</option>
                    <option>Bogotá D.C.</option>
                    <option>Medellín</option>
                  </select>
                  <span
                    className={error.city ? 'text-xs text-red-700' : 'hidden'}
                  >
                    {error.city}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-black">Teléfono</label>
                  <input
                    // required
                    className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                    id="phone"
                    type="text"
                    name="phone"
                    value={parameters.phone}
                    onChange={(event) => {
                      errorOnChange(event, "phone");
                      handleChange(event);
                      setFormInteraction(true);
                    }}
                  />
                  <span
                    className={error.phone ? 'text-xs text-red-700' : 'hidden'}
                  >
                    {error.phone}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-black">e-mail</label>
                  <input
                    // required
                    className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                    id="email"
                    type="email"
                    name="email"
                    value={parameters.email}
                    onChange={(event) => {
                      errorOnChange(event, "email");
                      handleChange(event);
                    }}
                  />
                  <span
                    className={error.email ? 'text-xs text-red-700' : 'hidden'}
                  >
                    {error.email}
                  </span>
                </div>

                <div className="flex flex-row">
                  <input
                    // required
                    className="px-2 pb-1 mt-1 rounded-md border border-slate-400"
                    id="habeasData"
                    type="checkbox"
                    name="habeasData"
                    checked={parameters.habeasData} // Aquí usamos 'checked' en lugar de 'value'
                    onChange={(event) => {
                      errorOnChange(event, "habeasData");
                      setParameters({
                        ...parameters,
                        habeasData: event.target.checked,
                      });
                      setFormInteraction(true);
                    }}
                  />
                  <p className="ml-4 mt-4 w-full text-xs">
                    Autorizo el tratamiento de mis datos de acuerdo con la
                    finalidad establecida en la política de protección de datos
                    personales
                  </p>
                  <span
                    className={
                      error.habeasData ? 'text-xs text-red-700' : 'hidden'
                    }
                  >
                    {error.habeasData}
                  </span>
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  className="bg-slate-300 lg:w-60 md:w-64 mt-8 flex font-bold text-sm bg-lime py-2 pl-12 pr-6 sm:place-content-center sm:px-0 rounded-3xl hover:bg-ligthlime sm:w-full"
                >
                  {' '}
                  Recibir Código{' '}
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
