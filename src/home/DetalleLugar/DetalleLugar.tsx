import { useParams } from "react-router-dom";
import Slider from "../../Components/Slider";
import useImagenesLugar from "./hooks/useImagenesLugar";

import ConexionLocal from "./ConexionLocal/ConexionLocal";
import Comentarios from "./Comentarios/Comentarios";
import { useLugaresContext } from "../../Context/LugaresContext";
import Spinner from "../../Components/Spinner";

export default function DetalleLugar() {
  console.log("se monto DetalleLugar");
  const lugares = useLugaresContext();

  const params = useParams();
  const { lugar: id } = params;

  console.log(`El id del lugar es ${id}`);
  const lugar = lugares.find((l) => l.id == Number(id));
  const imagenesLugar = useImagenesLugar(Number(id)) as string[];

  if (!lugar) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 min-h-dvh flex flex-col items-center gap-8 tablet:p-10">
        <Slider
          titulo={lugar.nombre}
          imgDefault={lugar.img}
          imagenes={imagenesLugar}
        />
        <div className="w-full px-4 h-[100%] grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] tablet:px-8 desktop:px-30">
          <div className="card">
            <div className="card-divpath"></div>
            <p className="relative z-10 font-nunito text-[18px]">
              {lugar.descripcion}
            </p>
          </div>
        </div>
        <ConexionLocal idlugar={Number(id)} />
        <Comentarios idLugar={Number(id)} />
      </div>
    </>
  );
}
