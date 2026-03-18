import { useRef, useState } from "react";
import enviar from "../../assets/icons/enviar.png";
import TarjetaLugar from "./TarjetaLugar";

// interface Tarjeta {
//   img: string;
//   nombre: string;
//   descripcion: string;
// }

export default function DescubreIA() {
  const [mostrarTarjeta, setMostrarTarjeta] = useState<boolean>(false);
  // const [tarjeta, setTarjeta] = useState<Tarjeta | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const repuestaRef = useRef<HTMLDivElement | null>(null);

  // async function hacerPreguntaIA() {
  //   if (!inputRef.current?.value) {
  //     console.log("se sale");
  //     return;
  //   }
  //   const pregunta = inputRef.current?.value;
  //   const repuesta = await preguntarIA(pregunta);
  //   console.log(repuesta);
  //   if (repuestaRef.current) {
  //     repuestaRef.current.textContent = "";
  //     repuestaRef.current.textContent = repuesta.respuesta;
  //     setMostrarTarjeta(true);
  //     setTarjeta({
  //       img: repuesta.img,
  //       nombre: repuesta.nombre,
  //       descripcion: repuesta.descripcion,
  //     });
  //     return;
  //   }
  // }

  function responderPregunta() {
    setTimeout(() => {
      setMostrarTarjeta(true);
    }, 400);
  }

  return (
    <div className="w-full bg-[#e2e2e2] flex flex-col gap-2 p-4 rounded-2xl [box-shadow:1px_1px_2px_1px_black] desktop:flex-row desktop:gap-4 animacion-reveal">
      <div className="flex flex-col gap-2 w-full desktop:w-[60%]">
        <div>
          <h1 className="p-2 font-nunito text-[18px] font-semibold tablet:text-2xl">
            Descubre con IA
          </h1>

          <div className="p-1 flex gap-1 w-full h-10 bg-white rounded-[6px]">
            <input
              type="text"
              className="w-full text-[12px] h-full"
              ref={inputRef}
            />

            <button
              className="w-[10%] flex justify-end"
              //  onClick={responderPregunta}
            >
              <figure className="flex items-center">
                <img src={enviar} alt="" className="h-[70%]" />
              </figure>
            </button>
          </div>
        </div>
        <div
          ref={repuestaRef}
          className="min-h-14 p-2 bg-white rounded-[6px] [border:solid_black_1px]"
        >
          {mostrarTarjeta
            ? "Te recomiendo Salto La Estanzuela, en Estelí: un lugar perfecto para hacer senderismo entre bosques y miradores, terminando con un chapuzón bajo su impresionante cascada de 40 metros. El acceso es fácil, ideal para un día de naturaleza, aventura y relax."
            : ""}
        </div>
      </div>
      <div className="w-full">
        {mostrarTarjeta ? (
          <TarjetaLugar
            imgurl="https://njdfgyfdqnmxhevgeoai.supabase.co/storage/v1/object/public/imagenes_lugares/la%20estanzuela%202.webp"
            nombre="Salto la Estanzuela"
            descripcion=""
          ></TarjetaLugar>
        ) : (
          <div className="w-full h-full bg-gray-300 rounded-2xl"></div>
        )}
      </div>
    </div>
  );
}
