import { turismoApi } from "../../apis/turismo.api";
import type { Ave } from "../interface/Ave";

export const obtenerAve = async (): Promise<Ave[]> => {

  try {
    const response = await turismoApi.get<Ave[]>("/aves");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener aves")
  }
};
