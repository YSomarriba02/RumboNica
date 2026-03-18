import { Link } from "react-router-dom";

import type { Ave } from "../interface/Ave";
import { EstadoAve } from "./EstadoAve";

interface Props {
  ave: Ave;
}

export const AvesCard = ({ ave }: Props) => {
  console.log(ave);
  return (
    <div className=" bg-lightGreen animacion-reveal flex flex-col gap-5 rounded-2xl p-2 shadow-lg hover:scale-105 transition-transform duration-400 ease-in-out ">
      <div className="flex justify-center items-center w-full h-[250px] ">
        <img
          className="w-full h-full object-cover object-top-left rounded-2xl  "
          src={ave.url_img}
          alt={ave.nombre_comun}
        />
      </div>
      <h2 className="w-full text-center p-2 rounded-2xl  text-[20px] bg-white font-bold font-nunito">
        {ave.nombre_comun}
      </h2>

      <div className="flex justify-between items-center gap-3 w-full">
        <p className="  px-2 py-3 rounded-2xl bg-white font-nunito font-bold w-[80%] ">
          {" "}
          Estado:{" "}
          <EstadoAve estado={ave.estados_conservacion.nombre}></EstadoAve>
        </p>

        <Link
          to={`/Aves-Detalles/${ave.ave_id}`}
          // state={ave}
          className=" px-2 py-3  rounded-2xl bg-black font-nunito font-bold w-[20%] desktop:w-[30%] text-center text-white hover:bg-white hover:text-black transition-colors"
        >
          +INFO
        </Link>
      </div>
    </div>
  );
};
