import { Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { type Lugar } from "../../Explora/interfaces/Lugar";

interface propLugar {
  lugar: Lugar;
}

export default function LugarPopup({ lugar }: propLugar) {
  const navigate = useNavigate();
  const { id, img, nombre } = lugar;

  function irDetalles() {
    navigate(`/Detallelugar/${id}`);
  }
  return (
    <Popup className="w-[240px] h-[140px] m-h-[140px]">
      <h1 className="text-center pt-1.5 pb-1.5 text-[20px] font-bold text-[#f7f7f7]">
        {nombre}
      </h1>
      <div className="[border-radius:12px] overflow-hidden">
        <img className="h-[170px] w-full object-cover" src={img} alt="" />
      </div>
      {/* <p className="text-white text-[18px]">
        {descripcion.split(" ").slice(0, 12).join(" ").concat(" ...")}
      </p> */}
      <button
        onClick={irDetalles}
        className="bg-green-300 p-2.5 mt-4 w-full rounded-2xl font-semibold cursor-pointer hover:bg-green-400 hover:text-white transition-all duration-200 ease-initial"
      >
        Ver mas
      </button>
    </Popup>
  );
}
