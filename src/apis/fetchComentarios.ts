import type { iComentarioPublicacion } from "../home/DetalleLugar/Comentarios/interfaces/Comentarios";
import { turismoAPiFecth } from "./turismo.api";

export default async function fetchComentarios({ id_lugar }: { id_lugar: number }) {
    try {
        const fetching = await fetch(
            `${turismoAPiFecth}comentarios/getcomentarios/${id_lugar}`,
            {
                credentials: "include",
            },
        );
        if (!fetching.ok) throw new Error("Error al obtener comentarios");
        const data: iComentarioPublicacion[] = await fetching.json();
        return data
    } catch (error) {
        throw new Error("Error al obtener comentarios");
    }
}