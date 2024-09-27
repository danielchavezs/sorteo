// import { EmptyImage } from "../assets/images";

import { RegistrationImage } from "../asstes/images";

export default function EmptyResult(){
    return (
      <div className="flex flex-col justify-center w-full lg:w-96 min-h-full bg-slate-900 p-8 lg:rounded-r-2xl md:rounded-b-2xl md:rounded-t-none sm:rounded-none rounded-bl-5xl">
        <div className="flex lg:flex-col md:flex-row sm:flex-col h-full lg:space-y-20 lg:space-x-0 md:space-x-8 md:min-h-52 md:place-content-between items-center">
          <div className="flex justify-center w-28 h-fit border-0">
            <RegistrationImage/>
          </div>
          <div className="flex flex-col space-y-4 lg:w-full md:w-3/4 border-0">
            <h2 className="text-white text-2xl text-center font-bold">
              {" "}
              Acá se mostrará su código una vez complete su registro.
            </h2>
            <p className="text-gray-400 text-center md:text-sm sm:text-xs mb-6">
              Complete su formulario y dé click en "Recibir Código" para poder realizar
              su registro y recibir su código para participar en el sorteo.
            </p>
          </div>
        </div>
      </div>
    );
};