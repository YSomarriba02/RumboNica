import { turismoAPiFecth } from "./turismo.api";

export default async function patchComentario({ id_comentario, contenidoNuevo }: { id_comentario: number, contenidoNuevo: string }) {
    try {
        const fetching = await fetch(
            `${turismoAPiFecth}comentarios/editarcomentario`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                method: "PATCH",
                body: JSON.stringify({ id_comentario, contenidoNuevo }),
            },
        );

        if (!fetching.ok) throw new Error("Error al editar el comentario");
        const data = await fetching.json();
        return data;
    } catch (error) {
        throw new Error("Error al editar el comentario");
    }
}