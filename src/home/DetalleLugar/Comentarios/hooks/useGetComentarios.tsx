import { useEffect, useState } from "react";
import { type iComentarioPublicacion } from "../interfaces/Comentarios";
import { turismoAPiFecth } from "../../../../apis/turismo.api";

interface prop {
  id_lugar: number;
}

export default function useGetComentarios({ id_lugar }: prop) {
  const [comentariosPublicados, setComentariosPublicados] = useState<
    iComentarioPublicacion[]
  >([]);

  useEffect(() => {
    async function getComentariosPublicados() {
      try {
        const fetching = await fetch(
          `${turismoAPiFecth}comentarios/getcomentarios/${id_lugar}`,
          {
            credentials: "include",
          },
        );
        if (!fetching.ok) throw new Error("Error al obtener comentarios");
        const data = await fetching.json();
        setComentariosPublicados(data);
      } catch (error) {
        console.error(error);
      }
    }
    getComentariosPublicados();
  }, []);

  return { comentariosPublicados, setComentariosPublicados };
}
