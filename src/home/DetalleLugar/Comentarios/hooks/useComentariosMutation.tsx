import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchComentario from "../../../../apis/patchComentario";
import type { iComentarioPublicacion } from "../interfaces/Comentarios";
import deleteComentario from "../../../../apis/deleteComentario";

export default function useComentariosMutation({
  id_lugar,
}: {
  id_lugar: number;
}) {
  const queryClient = useQueryClient();

  const editar = useMutation({
    mutationFn: patchComentario,
    onMutate: ({ id_comentario, contenidoNuevo }) => {
      queryClient.cancelQueries({ queryKey: [`comentarios_lugar${id_lugar}`] });
      const previus = structuredClone(
        queryClient.getQueryData([`comentarios_lugar${id_lugar}`]),
      );
      queryClient.setQueryData(
        [`comentarios_lugar${id_lugar}`],
        (comentarios: iComentarioPublicacion[]) => {
          return comentarios.map((comentario): iComentarioPublicacion => {
            return comentario.id_comentario === id_comentario
              ? { ...comentario, contenido: contenidoNuevo }
              : comentario;
          });
        },
      );
      return { previus };
    },
    onError: (_error, _variables, onMutateResult) => {
      queryClient.setQueryData(
        [`comentarios_lugar${id_lugar}`],
        onMutateResult?.previus,
      );
    },
  });

  const eliminar = useMutation({
    mutationFn: deleteComentario,
    onMutate: ({ id_comentario }) => {
      console.log("se hizo onMutate");
      queryClient.cancelQueries({
        queryKey: [`comentarios_lugar${id_lugar}`],
      });
      const previus = structuredClone(
        queryClient.getQueryData([`comentarios_lugar${id_lugar}`]),
      );

      queryClient.setQueryData(
        [`comentarios_lugar${id_lugar}`],
        (comentarios: iComentarioPublicacion[]) => {
          return comentarios.filter(
            ({ id_comentario: id_c }) => id_comentario !== id_c,
          );
        },
      );

      return { previus };
    },

    onError: (_error, _variables, onMutateResult) => {
      console.log("se hizo onError");
      const previus = onMutateResult?.previus as iComentarioPublicacion[];
      queryClient.setQueryData([`comentarios_lugar${id_lugar}`], previus);

      console.log(`La restauracion de previus es: ${previus}`);
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: [`comentarios_lugar${id_lugar}`],
    //   });
    // },
  });

  return { editar: editar.mutateAsync, eliminar: eliminar.mutate };
}
