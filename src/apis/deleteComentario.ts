import { turismoAPiFecth } from "./turismo.api";

export default async function deleteComentario({ id_comentario }: { id_comentario: number }) {
    try {
        const fetching = await fetch(
            `${turismoAPiFecth}comentarios/deleteComentario/${id_comentario}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        if (!fetching.ok) throw new Error("Error al eliminar comentario");
        const data = await fetching.json();
        return data;
    } catch (error) {
        throw new Error("Error al eliminar comentario");
    }
}