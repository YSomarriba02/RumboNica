// import useImagenesLugar from "../hooks/useImagenesLugar";
import { useEffect, useRef } from "react";

interface prop {
  titulo?: string;
  imgDefault: string;
  imagenes: string[];
}

export default function Slider({ titulo, imgDefault, imagenes }: prop) {
  const $content_imagenes = useRef<HTMLDivElement | null>(null);
  const $content_subimagenes = useRef<HTMLDivElement | null>(null);
  const tiempo = 4000;

  useEffect(() => {
    if (!imagenes || imagenes.length == 0) return;
    const interval = setInterval(() => {
      const $imagenes = $content_imagenes.current?.querySelectorAll(".imagen");
      const $subimagenes =
        $content_subimagenes.current?.querySelectorAll(".subimagen");
      if (!$imagenes) return;
      if (!$subimagenes) return;

      const $primerImagen = $imagenes[0];
      const $primerSubimagen = $subimagenes[0];

      $primerSubimagen.remove();
      $content_subimagenes.current?.appendChild($primerSubimagen);
      $primerImagen.classList.add("animacion-slider-entrada");
      $primerImagen.addEventListener(
        "animationend",
        () => {
          $primerImagen.classList.remove("animacion-slider-entrada");
          $primerImagen.remove();
          $content_imagenes.current?.appendChild($primerImagen);
        },
        { once: true },
      );
    }, tiempo);
    return () => clearInterval(interval);
  }, [imagenes]);

  return (
    <div className="w-full h-[80vh] relative left-[50%] transform-[translateX(-50%)] overflow-hidden  rounded-[34px] [box-shadow:2px_3px_6px_2px_#292929]">
      <div className="w-full p-6 bg-[#2e2e2e8c] [backdrop-filter:blur(3px)] text-center font-nunito text-3xl font-bold text-white absolute z-50 top-0 tablet:text-5xl">
        {titulo}
      </div>
      <div
        ref={$content_imagenes}
        id="content-imagenes"
        className="w-[100%] h-full  absolute overflow-hidden"
      >
        {imagenes ? (
          imagenes.map((imagen, i) => {
            return (
              <div
                key={i}
                className="imagen absolute w-full h-full [filter:brightness(110%)]"
              >
                <img
                  src={imagen}
                  alt={imagen}
                  className="w-full h-full  object-cover"
                />
              </div>
            );
          })
        ) : (
          <img src={imgDefault} alt="" />
        )}
      </div>
      <div
        ref={$content_subimagenes}
        id="content-subimagenes"
        className="absolute left-[50%] bottom-[8%] z-40 w-[140%] h-[35%] flex gap-4
        desktop:left-[60%]"
      >
        {imagenes
          ? imagenes.map((imagen, i) => {
              return (
                <div
                  key={i}
                  className="subimagen w-[35%] h-full rounded-[14px] overflow-hidden [box-shadow:2px_3px_10px_2px_black] [filter:grayscale(40%)]
                desktop:w-[12%]"
                >
                  <img
                    src={imagen}
                    alt={imagen}
                    className="w-full h-full  object-cover"
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
