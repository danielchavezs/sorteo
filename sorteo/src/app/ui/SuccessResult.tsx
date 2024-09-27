// import { Results } from "@/app/types";

export default function SuccessResult ({ code }: { code: String}){
    return (
        <div className="flex flex-col w-full lg:w-96 lg:min-h-full md:min-h-52 md:f-full sm:min-h-full bg-slate-900 p-8 lg:pb-0 sm:pb-14 rounded-bl-5xl lg:rounded-r-2xl md:rounded-b-2xl md:rounded-t-none sm:rounded-none place-content-center">
          <div className="space-y-20">
            <div className="lg:text-center md:text-start sm:text-center">
              <h2 className="text-white text-3xl font-extrabold mb-4"> ¡FELICITACIONES!</h2>
              <p className="text-gray-400 text-xs mb-8">
                Te has registrado exitosamente en el sorteo. Por favor guarda 
                tu código para participar.
              </p>
            </div>

            <div className="border-b-0 border-x-0 border-2 border-customGreen shadow-2xl shadow-slate-800 p-6 rounded-md">
              <div className="text-center">
                <span className="text-white font-semibold">Tu Código:</span>
                <p className="font-semibold lg:mb-6 md:mb-6 sm:text-4xl sm:mb-3 mt-3 text-customGreen">
                  {code}
                </p>
              </div>
              
              {/* <hr className="border-gray-600"/> */}
              
            </div>
          </div>
        </div>
    )
};