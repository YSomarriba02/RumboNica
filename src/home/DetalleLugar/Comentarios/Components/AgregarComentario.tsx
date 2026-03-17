import { useRef, useState } from "react";
import Perfil from "../../../../assets/icons/perfil.png";
import { useSesionContex } from "../../../../Context/AuthContex";
import useComentariosMutation from "../hooks/useComentariosMutation";

interface prop {
  idLugar: number;
}

export default function AgregarComentario({ idLugar }: prop) {
  const { agregar } = useComentariosMutation({ id_lugar: idLugar });
  const [comentario, setComentario] = useState<string>("");
  const refTextArea = useRef<HTMLTextAreaElement | null>(null);

  const [puntuacion, setPuntuacion] = useState<number>(0);
  const estrellasArr = [1, 2, 3, 4, 5];

  const session = useSesionContex();

  function actualizarPuntuacion(pt: number) {
    setPuntuacion(pt);
  }

  function cancelarComentario() {
    if (refTextArea.current) {
      refTextArea.current.style.height = "40px";
    }
    setComentario("");
    setPuntuacion(0);
  }

  function ajustarAltura() {
    if (refTextArea.current) {
      refTextArea.current.style.height = "auto";

      refTextArea.current.style.height =
        refTextArea.current.scrollHeight + "px";
      setComentario(refTextArea.current.value);
    }
  }

  async function Comentar() {
    if (!refTextArea.current) return;
    if (refTextArea.current.value == "") return;
    const nuevoComentario = {
      id_lugar: idLugar,
      contenido: refTextArea.current.value,
      puntuacion,
    };

    agregar(nuevoComentario);
    setPuntuacion(0);
    setComentario("");
    refTextArea.current.blur();
  }

  return (
    <div
      id="Agregar_comentario"
      className="w-full flex items-center gap-4 p-4 pt-2 pb-2 rounded-2xl bg-verdeGris [box-shadow:0px_0px_3px_1px_black] tablet:gap-3 tablet:p-8 tablet:pt-4 tablet:pb-4 tablet:w-[80%] desktop:w-[60%]"
    >
      <figure className="w-[18%] rounded-full overflow-hidden desktop:w-[8%]">
        <img
          src={session.sesion?.picture || Perfil}
          alt=""
          className="h-full"
        />
      </figure>
      <div className="w-full flex flex-col gap-3 items-end tablet:gap-2">
        <div className="flex gap-1 items-center text-2xl cursor-pointer">
          {estrellasArr.map((estrella) => {
            return (
              <span
                key={estrella}
                onClick={() => actualizarPuntuacion(estrella)}
                className={`${
                  estrella <= puntuacion ? "text-amber-500" : "text-gray-500"
                } transition-colors duration-300 ease-out animate-pulse`}
              >
                &#9733;
              </span>
            );
          })}
        </div>
        <textarea
          ref={refTextArea}
          onChange={ajustarAltura}
          placeholder="Agregar Comentario"
          value={comentario}
          className="bg-white w-full h-10 p-1 pt-2 text-[14px] text-gray-600 overflow-hidden"
        />
        <nav className="flex gap-2">
          <button
            onClick={cancelarComentario}
            className="p-1 pl-2 pr-2 rounded-2xl font-semibold hover:bg-gray-400 hover:text-white transition-colors duration-200 ease-out cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={Comentar}
            className="p-1 pl-2 pr-2 rounded-2xl bg-lightGreen text-white font-semibold hover:bg-regularGreen transition-colors duration-200 ease-out cursor-pointer"
          >
            Comentar
          </button>
        </nav>
      </div>
    </div>
  );
}
