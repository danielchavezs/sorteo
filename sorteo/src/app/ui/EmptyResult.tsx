// import { EmptyImage } from "../assets/images";

export default function EmptyResult(){
    return (
      <div className="flex flex-col justify-center w-full lg:w-96 min-h-full bg-slate-900 p-8 lg:rounded-r-2xl md:rounded-b-2xl md:rounded-t-none sm:rounded-none rounded-bl-5xl">
        <div className="flex flex-col h-full">
          <div className="mb-4 mt-14 flex justify-center">
            <span>SE PUEDE AGREGAR UNA IMAGEN PRE-RESULTADO ACÁ</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-white text-xl text-center font-bold mb-4">
              {" "}
              Acá se mostrará su código una vez complete su registro.
            </h2>
            <p className="text-gray-400 text-center text-xs mb-6">
              Complete su formulario y dé click en "Recibir Código" para poder realizar
              su registro y recibir su código para participar en el sorteo.
            </p>
          </div>
        </div>
      </div>
    );
};