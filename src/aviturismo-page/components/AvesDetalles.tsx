import { useParams } from "react-router-dom";
import type { Ave } from "../interface/Ave";
import { EstadoAve } from "./EstadoAve";
import AvesMapa from "./AvesMapa";
import { useAve } from "../hooks/useAve";
import { ReservasGrid } from "./ReservasGrid";
import Slider from "../../Components/Slider";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner";

export const AvesDetalles = () => {
  const { obtenerReservas, obtenerImagenes, aves, isLoading } = useAve();
  const { aveid: paramave } = useParams();
  const queryClient = useQueryClient();

  const aveid = Number(paramave);
  let ave: Ave;

  const cache = queryClient.getQueryData([`ave`, aveid]);

  if (isLoading || !cache) {
    console.warn("No hay cache");
    aves.forEach((ave) => {
      queryClient.setQueryData([`ave`, ave.ave_id], ave);
    });
    ave = aves.find((ave) => ave.ave_id == aveid)!;
  } else {
    ave = queryClient.getQueryData([`ave`, aveid])!;
  }

  const reservasQuery = obtenerReservas(aveid);
  const imagenesQuery = obtenerImagenes(aveid);

  if (reservasQuery.isLoading || imagenesQuery.isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  //Data Fake

  const conteoAvistamientos = {
    Boaco: 12,
    Carazo: 18,
    Chinandega: 15,
    Chontales: 14,
    Estelí: 22,
    Granada: 25,
    Jinotega: 30,
    León: 35,
    Madriz: 8,
    Managua: 50,
    Masaya: 10,
    Matagalpa: 28,
    "Nueva Segovia": 9,
    "Río San Juan": 20,
    Rivas: 27,
    "Costa Caribe Norte": 45,
    "Costa Caribe Sur": 42,
  };

  return (
    <div>
      <Slider imgDefault={ave.url_img} imagenes={imagenesQuery.data!}></Slider>

      <section className=" flex-col-reverse w-screen desktop:flex-row flex justify-around items-center p-2 bg-regularGreen  ">
        <div className="  w-full desktop:w-[65%]  flex flex-col gap-5 p-3 bg-linear-gradient  from-lightGray  to-darkGreen  ">
          <h1 className="  text-xl font-nunito font-bold desktop:text-3xl  p-2">
            <span className="text-lightGreen">Nombre Comun: </span>
            {ave.nombre_comun}
          </h1>
          <h2 className=" text-xl font-nunito font-bold desktop:text-3xl p-2">
            <span className="text-lightGreen">Nombre Cientifico: </span>
            {ave.nombre_cientifico}
          </h2>
          <h3 className="text-xl font-nunito font-bold  desktop:text-3xl p-2 ">
            <span className="text-lightGreen">Familia: </span>
            {ave.familias.nombre}
          </h3>

          <div className="flex flex-col-reverse desktop:flex-row justify-around items-center gap-6 p-3  bg-regularGreen rounded-2xl">
            <div className="w-full desktop:w-[25%] flex flex-col  p-3 bg-lightGreen rounded-2xl hover:scale-102 transition-transform ease-in-out duration-300">
              <p className="text-xl text-white desktop:text-3xl">
                {ave.tamano}
              </p>
              <p className="font-bold text-white">Tamaño</p>
            </div>
            <div className=" w-full desktop:w-[25%] flex flex-col gap-2  p-3 bg-lightGreen  rounded-2xl  hover:scale-102 transition-transform ease-in-out duration-300">
              <p className=" text-xl text-white desktop:text-3xl">
                {ave.dieta}
              </p>
              <p className="font-bold text-white">Dieta</p>
            </div>
            <div className="w-full desktop:w-[50%] flex flex-col gap-3 px-2 py-4 bg-lightGreen rounded-2xl hover:scale-102 transition-transform ease-in-out duration-300">
              <p className="text-xl  desktop:text-3xl">
                <EstadoAve estado={ave.estados_conservacion.nombre}></EstadoAve>
              </p>
              <p className="font-bold text-white">Estado de conservacion</p>
            </div>
          </div>
        </div>

        <div className=" w-full desktop:w-[40%] flex flex-col justify-start items-center gap-6  p-3">
          <p className=" w-full  font-nunito font-bold text-3xl p-2  text-white text-center bg-lightGreen rounded-2xl  ">
            Descripcion
          </p>
          <p className=" w-full  font-nunito font-bold p-2 text-white text-2xl bg-lightGreen rounded-2xl ">
            {ave.descripcion}
          </p>
        </div>
      </section>

      <section className="w-screen flex flex-col justify-center items-center bg-lightGreen p-4 ">
        <h1 className="w-full desktop:w-[50%] p-3 text-center text-3xl  text-black font-nunito font-bold bg-regularGreen rounded-2xl mb-5 ">
          MAPA DE DISTRIBUCION
        </h1>
        <div className=" w-full  desktop:w-[70%] flex justify-center items-center z-40 ">
          <AvesMapa conteoAvistamientos={conteoAvistamientos} />
        </div>
      </section>

      <section className="w-full">
        <h2 className="capitalize w-full text-center text-2xl text-lightGreen bg-regularGreen  p-3 font-nunito font-bold ">
          Lugares donde puedes encontrar a este especimen
        </h2>
        <ReservasGrid reservasNaturales={reservasQuery.data!}></ReservasGrid>
      </section>
    </div>
  );
};
