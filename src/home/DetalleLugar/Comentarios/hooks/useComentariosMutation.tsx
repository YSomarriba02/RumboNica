import { useMutation, useQueryClient } from "@tanstack/react-query";
import patchComentario from "../../../../apis/patchComentario";
import type { iComentarioPublicacion } from "../interfaces/Comentarios";
import deleteComentario from "../../../../apis/deleteComentario";
import postComentario from "../../../../apis/postComentario";
import { useSesionContex } from "../../../../Context/AuthContex";

export default function useComentariosMutation({
  id_lugar,
}: {
  id_lugar: number;
}) {
  const queryClient = useQueryClient();
  const sesion = useSesionContex();
  const usuarioSession = sesion.sesion!;

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
  });

  const agregar = useMutation({
    mutationFn: postComentario,

    //Realizo una actualizacion optimista a la lista
    //de comentarios, dado que cada comentario necesita un id para
    //existir asigno temporalmente un id con el resto del comentario de forma inmediata,
    //cuando el server responde con el comentario real, seteo regresando
    // al valor real + comentarioNuevo, en caso de error roolback al estado original
    onMutate: (variables) => {
      queryClient.cancelQueries({ queryKey: [`comentarios_lugar${id_lugar}`] });
      const previus: iComentarioPublicacion[] =
        queryClient.getQueryData([`comentarios_lugar${id_lugar}`]) || [];
      queryClient.setQueryData(
        [`comentarios_lugar${id_lugar}`],
        (comentarios: iComentarioPublicacion[]) => {
          const id_usuario = usuarioSession.id_usuario;
          const imagenurl = usuarioSession.picture;
          const nombre = usuarioSession.name;
          return [
            {
              ...variables,
              fecha_creacion: String(new Date()),
              id_comentario: -1,
              usuarios: {
                id_usuario,
                imagenurl,
                nombre,
              },
            },
            ...comentarios,
          ];
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
    onSuccess: (data, _variables, onMutateResult) => {
      queryClient.setQueryData([`comentarios_lugar${id_lugar}`], () => {
        const previus = onMutateResult.previus;
        return [data, ...onMutateResult.previus];
      });
    },
  });

  return {
    editar: editar.mutateAsync,
    eliminar: eliminar.mutateAsync,
    agregar: agregar.mutateAsync,
  };
}
