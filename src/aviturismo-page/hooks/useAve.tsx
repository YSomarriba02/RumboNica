import {
  obtenerAve,
  obtenerAvesPorZona,
  obtenerReservasPorAve,
  obtenerImgPorAve,
} from "../service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CACHETIME = 15 * 60 * 10000;

export const useAve = () => {
  const queryClient = useQueryClient();

  //obtener todas las aves
  const avesQUery = useQuery({
    queryFn: obtenerAve,
    queryKey: [`aves`],
    staleTime: CACHETIME,
  });

  //obtener aves filtradas por zona
  function obtenerAveZona(zonaId: number) {
    const aves = useQuery({
      queryFn: () => obtenerAvesPorZona(zonaId),
      queryKey: [`aveszona`, zonaId],
      staleTime: CACHETIME,
    });
    return aves;
  }

  function obtenerImagenes(aveId: number) {
    const imagenes = useQuery({
      queryFn: () => obtenerImgPorAve(aveId),
      queryKey: [`aveImagenes`, aveId],
      staleTime: CACHETIME,
    });
    return imagenes;
  }

  //obtener reservas  por ave
  function obtenerReservas(aveId: number) {
    const reservas = useQuery({
      queryFn: () => obtenerReservasPorAve(aveId),
      queryKey: [`reservaAve`, aveId],
      staleTime: CACHETIME,
    });
    return reservas;
  }

  return {
    //propiedades
    isLoading: avesQUery.isLoading,
    obtenerReservas,
    obtenerImagenes,
    obtenerAveZona,
    aves: avesQUery.data || [],
  };
};
