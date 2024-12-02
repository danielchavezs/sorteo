// import { EmptyImage } from "../assets/images";

import { RegistrationImage } from "../assets/images";

export default function EmptyResult(){
    return (
      <div className="flex flex-col justify-center w-full lg:w-96 min-h-full bg-teal-900 p-8 lg:rounded-r-2xl md:rounded-b-2xl md:rounded-t-none sm:rounded-none rounded-bl-5xl">
        <div className="flex lg:flex-col md:flex-row sm:flex-col h-full lg:space-y-14 lg:space-x-0 md:space-y-0 sm:space-y-10 md:space-x-8 md:min-h-52 md:place-content-between items-center">
          <div className="flex justify-center w-28 h-fit">
            <RegistrationImage/>
          </div>
          <div className="flex flex-col space-y-5 lg:w-full md:w-3/4">
            <h2 className="text-white text-2xl text-center font-bold">
              {" "}
              Acá se mostrará tu código una vez completado el registro.
            </h2>
            <p className="text-gray-300 text-center md:text-sm sm:text-xs mb-6">
              Completa tu formulario y da click en "Recibir Código" para poder realizar
              el registro y recibir tu código para participar en el sorteo.
            </p>
          </div>
        </div>
      </div>
    );
};