// import { Results } from "@/app/types";

export default function SuccessResult ({ code }: { code: String}){
    return (
        <div className="flex flex-col w-full sm:max-w- lg:w-96 min-h-full bg-slate-900 p-8 rounded-bl-5xl lg:rounded-r-2xl md:rounded-b-2xl md:rounded-t-none sm:rounded-none">
          <div>
            <h2 className="text-white text-xl font-bold mb-4"> Su código </h2>
            <p className="text-gray-400 text-xs mb-8">
              <strong>¡Felicitaciones!</strong>
              Se ha registrado exitosamente en el sorteo. Por favor guarde 
              su código para participar.
            </p>

            <div className="bg-slate-920 border-t-lime border-b-0 border-x-0 border-2 p-6 rounded-md">
              <div className="mb-2">
                {/* <h3 className="text-sm text-gray-400 font-semibold">
                  Your monthly repayments
                </h3> */}
                <p className="text-lime font-semibold lg:mb-6 md:mb-6 sm:text-4xl sm:mb-3 mt-3 text-white">
                  {code}
                </p>
              </div>
              
              {/* <hr className="border-gray-600"/> */}
              
            </div>
          </div>
        </div>
    )
};