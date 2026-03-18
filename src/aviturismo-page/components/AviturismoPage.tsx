import { useEffect, useState, useMemo } from "react";
import { useAve } from "../hooks/useAve";
import { AvesFiltro } from "./AvesFiltro";
import { AvesGrid } from "./AvesGrid";
import { Carrucel } from "../../Components/Carrucel";
import { useQueryClient } from "@tanstack/react-query";

const preloadCard = 10;

const filtros = [
  { id: 0, nombre: "Todas" },
  { id: 1, nombre: "Pacífico" },
  { id: 2, nombre: "Centro" },
  { id: 3, nombre: "Caribe Norte" },
  { id: 4, nombre: "Caribe Sur" },
  { id: 5, nombre: "Lagos y lagunas" },
];

export const AviturismoPage = () => {
  const { isLoading, aves, obtenerAveZona } = useAve();
  const [zona, setZona] = useState<number>(0);
  const [cardsToShow, setCardsToShow] = useState<number>(preloadCard);
  const queryClient = useQueryClient();

  useEffect(() => {
    aves.forEach((ave) => {
      const existing = queryClient.getQueryData([`ave`, ave.ave_id]);

      if (!existing) {
        queryClient.setQueryData([`ave`, ave.ave_id], ave);
      }
    });
  }, [aves]);

  useEffect(() => {
    setCardsToShow(preloadCard);
  }, [aves]);

  // Calcula el subconjunto de aves a mostrar ---
  const visibleAves = useMemo(() => {
    return aves.slice(0, cardsToShow);
  }, [aves, cardsToShow]);

  const handleLoadMore = () => {
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 5);
  };

  const handleFiltroClick = (zonaId: number) => {
    if (zonaId === zona) return;

    setZona(zonaId);

    if (zonaId === 0) return;
    else {
      obtenerAveZona(zonaId);
    }
  };

  // Determina si el botón "Ver Más" debe ser visible
  const showLoadMoreButton =
    visibleAves.length > 0 && cardsToShow < aves.length;

  return (
    <div className="flex flex-col justify-center items-center bg-regularGreen">
      <div className="w-full flex flex-col gap-6 desktop:flex-row  justify-between items-center py-4 px-6 ">
        <p className="font-nunito font-bold w-full text-md  desktop:w-[50%] desktop:text-3xl text-justify">
          ¿Estás listo para la aventura? El aviturismo es más que una actividad,
          es una inmersión profunda en la naturaleza salvaje. En{" "}
          <span className="text-lightGreen">Rumbo Nica</span>, te llevamos a los
          mejores hotspots para observar especies raras y migratorias. Prepara
          tus binoculares, la biodiversidad te espera.
        </p>
        <Carrucel></Carrucel>
      </div>

      <div className="w-full  flex flex-col justify-center items-center py-4">
        <h2 className="w-screen h-[90px] text-center text-5xl font-nunito font-bold p-2 bg-gradient-to-r from-darkGreen  to-lightGreen bg-clip-text text-transparent">
          Biblioteca de Aves
        </h2>
      </div>

      {/* <AvesFiltro
        filtros={filtros}
        onFiltroClick={handleFiltroClick}
      ></AvesFiltro> */}

      {isLoading ? (
        <div className="text-center py-10">
          <span className="animate-pulse text-4xl text-darkGreen">
            Cargando aves...
          </span>
        </div>
      ) : (
        <>
          <AvesGrid aves={visibleAves}></AvesGrid>

          {showLoadMoreButton && (
            <button
              onClick={handleLoadMore}
              className="my-8 px-6 py-3 text-lg  bg-darkGreen text-white font-bold font-nunito rounded-lg shadow-md hover:opacity-85 transition duration-300 cursor-pointer"
            >
              Ver más aves ({aves.length - visibleAves.length} restantes)
            </button>
          )}

          {!showLoadMoreButton && visibleAves.length > 0 && (
            <p className="my-8  text-darkGreen bg-beige p-2 text-2xl font-nunito font-bold">
              Has llegado al final. ¡Estas son todas las aves!
            </p>
          )}

          {visibleAves.length === 0 && !isLoading && (
            <p className="my-8 text-xl text-gray-600">
              No se encontraron aves para esta zona.
            </p>
          )}
        </>
      )}
    </div>
  );
};
