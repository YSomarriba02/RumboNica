import flecha from "../../../../assets/icons/flecha.png";
import useGetGuias from "../hooks/useGetGuias";
import TarjetaGuia from "./TarjetaGuia";
import type guia from "../interfaces/iGuia";

interface props {
  idlugar: number;
  setVistaGuias: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GuiasLocales({ idlugar, setVistaGuias }: props) {
  const guias: guia[] = useGetGuias({ idlugar });
  function toogleVistaGuias() {
    setVistaGuias(false);
  }
  return (
    <div
      id="main-guias"
      className="w-full h-full [box-shadow:1px_2px_3px_1px_black] rounded-2xl"
    >
      <div className="flex  px-2 desktop:px-6 gap-6">
        <div
          onClick={toogleVistaGuias}
          className="w-[90px] flex items-center tablet:w-[20%] p-2"
        >
          <div className="w-[20px] h-[20px] flex justify-center items-center font-bold tablet:w-[30px] tablet:h-[30px]">
            <img src={flecha} alt="" className="h-full rotate-[180deg]" />
          </div>
          <h1 className="pl-4 flex w-[70%] items-center justify-center font-nunito text-[8px] tablet:text-[12px]">
            Emprendedores
          </h1>
        </div>
        <div className="w-[50%] flex justify-center items-center font-nunito font-semibold text-[16px] tablet:text-[18px] tablet:w-[70%]">
          <h1>Guias Locales</h1>
        </div>
        <div className="hidden tablet:flex w-[30%]"></div>
      </div>
      <div className="w-full p-2 grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-4  desktop:p-6">
        {guias.length == 0 ? (
          <h1>No hay guias</h1>
        ) : (
          guias.map(({ nombre, apodo, especialidad, contacto, id_guia }) => {
            return (
              <TarjetaGuia
                key={id_guia}
                nombre={nombre}
                apodo={apodo}
                especialidad={especialidad}
                contacto={contacto}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
