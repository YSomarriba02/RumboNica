import type { Lugar } from "../Explora/interfaces/Lugar";
import { turismoAPiFecth } from "./turismo.api";

export default async function fetcLugares(): Promise<Lugar[]> {
    try {
        const fetching = await fetch(`${turismoAPiFecth}lugares/getlugares`);

        if (!fetching.ok) throw new Error("Error al obtener lugares");
        const data: Lugar[] = await fetching.json();
        return data
    } catch (error) {
        throw new Error("Error al obtener lugares")
    }
}