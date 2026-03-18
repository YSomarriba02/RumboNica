import { useState } from "react";
import type { Ave } from "../interface/Ave";
import { obtenerAve, obtenerAvesPorZona, obtenerReservasPorAve, obtenerImgPorAve } from "../service";
import type { ReservaNatural } from "../interface/ReservaNatural";

export const useAve = () => {
  const [aves, setAves] = useState<Ave[]>([]);
  const [reservas, setReservas] = useState<ReservaNatural[]>([]);
  const [listUrl, setListUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //obtener todas las aves
  const obtenerAves = async () => {
    setIsLoading(true);
    try {
      const listAves = await obtenerAve();
      setAves(listAves);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //obtener aves filtradas por zona
  const filtrarAvesPorZona = async (zonaId: number) => {
    setIsLoading(true);
    try {
      const listAves = await obtenerAvesPorZona(zonaId);
      setAves(listAves);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerImgs = async (aveId: number) => {
    setIsLoading(true);
    try {
      const urls = await obtenerImgPorAve(aveId);
      setListUrl(urls);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //obtener reservas  por ave
  const obtenerReservas = async (aveId: number) => {
    setIsLoading(true);
    try {
      const listReservas = await obtenerReservasPorAve(aveId);
      setReservas(listReservas);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    //propiedades
    aves,
    isLoading,
    reservas,
    listUrl,

    //metodos
    obtenerAves,
    filtrarAvesPorZona,
    obtenerReservas,
    obtenerImgs,
  };
};
