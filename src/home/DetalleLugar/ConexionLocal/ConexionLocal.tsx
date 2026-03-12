import { useEffect, useRef, useState } from "react";
import Localidades from "./Components/Localidades";
import GuiasLocales from "./Components/GuiasLocales";

interface props {
  idlugar: number;
}

export default function ConexionLocal({ idlugar }: props) {
  const [vistaGuias, setVistaGuias] = useState<boolean>(false);
  const vistRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!vistRef.current) return;

    if (vistaGuias) {
      vistRef.current.classList.remove("animacion-salida-guias");
      vistRef.current.classList.add("animacion-entrada-guias");
    }
    if (!vistaGuias) {
      vistRef.current.classList.remove("animacion-entrada-guias");
      vistRef.current.classList.add("animacion-salida-guias");
    }
  }, [vistaGuias, vistRef.current?.scrollHeight]);

  return (
    <div className="relative overflow-hidden">
      <div
        id="vistaRef"
        ref={vistRef}
        className={`w-[200%] ${
          vistaGuias
            ? "max-h-166 tablet:max-h-200 desktop:max-h-180"
            : "max-h-380"
        } p-4 pt-4 pb-4 gap-8 flex bg-[#f2f3ee] tablet:gap-48 tablet:pr-24 tablet:pl-24 desktop:pr-34 desktop:pl-34 desktop:gap-68 transition-all duration-500 ease-in`}
      >
        <Localidades idlugar={idlugar} setVistaGuias={setVistaGuias} />
        <GuiasLocales idlugar={idlugar} setVistaGuias={setVistaGuias} />
      </div>
    </div>
  );
}
