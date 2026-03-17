import type { iComentarioPublicacion } from "../home/DetalleLugar/Comentarios/interfaces/Comentarios";
import { turismoAPiFecth } from "./turismo.api";

export interface parametros {
    id_lugar: number;
    puntuacion: number;
    contenido: string;
}

export default async function postComentario(parametros: parametros) {
    try {
        const fetching = await fetch(`${turismoAPiFecth}comentarios/comentar`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parametros),
        });
        if (!fetching.ok) throw new Error("Error al realizar comentario");
        const data: iComentarioPublicacion = await fetching.json();
        return data;
    } catch (error) {
        throw new Error("Error al realizar comentario");
    }
}