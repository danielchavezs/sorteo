'use client';
import SuccessResult from './ui/SuccessResult';
import EmptyResult from './ui/EmptyResult';
import { useEffect, useState } from 'react';
import { getCities, getDepartments } from './actions/getCities';
import { generateCode } from './actions/generateCode';
import { Errors, Fields, List, Results } from './types';
import { validateBoolean, validateEmail, validateForm, validateNumber, validateString } from './actions/validations';

export default function Home() {

  const [formInteraction, setFormInteraction] = useState<boolean>(false)

  const [results, setResults] = useState<Results>({
    solved: false,
    code: '',
  });

  const [fields, setFields] = useState<Fields>({
    firstName: '',
    lastName: '',
    nationalID: '',
    department: '',
    departmentID: 0,
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
    setFields({
      firstName: '',
      lastName: '',
      nationalID: '',
      department: '',
      departmentID: 0,
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
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingCites, setLoadingCities] = useState(true);

  const [listsData, setListsData] = useState<List>({
    departmentsList: [],
    citiesList: [],
  });

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setListsData((prevData) => ({
        ...prevData,
        departmentsList: data,
      }));
      setLoadingDepartments(false);
    } catch (error) {
      console.error(error)
    };
  };

  const fetchCities = async (id: number) => {
    console.log("ejecutando fetch de ciudades");

    try {
      const data = await getCities(id);
      const cities = data as string[];  // Ajuste adicional necesario por tipo recibido desde la llamada a la API.

      setListsData({...listsData, citiesList: cities});
      setLoadingCities(false);
    } catch (error) {
      console.error(error)
    };
  };

  useEffect(() => {
    fetchDepartments();
  }, []); // Ejecutamos una única vez al cargar la página inicialmente.
  

  useEffect(() => {
    if (fields.departmentID > 0) {
      fetchCities(fields.departmentID);
    }
  }, [fields.departmentID]); // Se ejecuta cada vez que cambie el ID del departamento


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const property = event.target.name;
    let value = event.target.value;

    // Actualizamos el estado sin convertir inmediatamente a número
    setFields((prevParameters) => ({
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
      firstName: validateString(fields.firstName, 'firstName'),
      lastName: validateString(fields.lastName, 'lastName'),
      department: validateString(fields.department, 'department'),
      city: validateString(fields.city, 'city'),
      nationalID: validateNumber(fields.nationalID, 'nationalID'),
      phone: validateNumber(fields.phone, 'phone'),
      email: validateEmail(fields.email),
      habeasData: validateBoolean(fields.habeasData)
    };
  };

  const updateErrors = () => {
    const newErrors = executeValidations();
    setError(newErrors);
    return
  };
  

  const errorOnChange = (
      event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
      key: keyof Fields
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    updateErrors();
    const isValidForm = validateForm(error);

    if (!formInteraction || !isValidForm) {
      console.log('ERRORS REGISTERED:', error);
      alert(
        'Por favor complete y verifique la totalidad de los campos para poder registrarse.'
      );
      return;
    }

    // Si no hay errores, sigue con el flujo de generación del código.
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

  // console.log(fields)
  // console.error(error)
  // console.log("DATA FETCHED FRFOM SERVER:", listsData);
  // console.log("DEPARTAMENTO SELECCIONADO:", )

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
                    value={fields.firstName}
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
                    value={fields.lastName}
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
                    value={fields.nationalID}
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
                    className="px-2 pb-1 mt-1 min-w-36 w-full rounded-md border border-slate-400"
                    id="department"
                    name="department"
                    value={fields.department}
                    onChange={(event) => {
                      errorOnChange(event, "department");
                      handleChange(event);
                      setFormInteraction(true);
                      const selectedDep = listsData.departmentsList.find(dep => dep.name === event.target.value);
                      setFields((prevFields) => ({
                        ...prevFields,
                        department: event.target.value,
                        departmentID: selectedDep ? selectedDep.id : 0, // Guardamos el ID del departamento
                      }));
                    }}
                  >
                    <option value="">Seleccione un departamento</option>
                    {!loadingDepartments ? (
                      listsData.departmentsList.map((dep) => (
                        <option key={dep.id} value={dep.name}>
                          {dep.name}
                        </option>
                      ))
                    ) : (
                      <option>Cargando lista</option>
                    )}
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
                    value={fields.city}
                    onChange={(event) => {
                      errorOnChange(event, "city");
                      handleChange(event);
                      setFormInteraction(true);
                    }}
                  >
                    <option value="">Seleccione una ciudad</option>
                    {!loadingCites ? (
                      listsData.citiesList.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))
                    ) : (
                      <option value="">Seleccione departamento primero</option>
                    )}
                    {/* <option>Bogotá D.C.</option>
                    <option>Medellín</option> */}
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
                    value={fields.phone}
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
                    value={fields.email}
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
                    checked={fields.habeasData} // Aquí usamos 'checked' en lugar de 'value'
                    onChange={(event) => {
                      errorOnChange(event, "habeasData");
                      setFields({
                        ...fields,
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
};
