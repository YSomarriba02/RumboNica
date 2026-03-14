import { useQuery } from "@tanstack/react-query";
import fetchComentarios from "../../../../apis/fetchComentarios";

interface prop {
  id_lugar: number;
}

export default function useGetComentarios({ id_lugar }: prop) {
  const { data, error, isPending } = useQuery({
    queryKey: [`comentarios_lugar${id_lugar}`],
    queryFn: async () => {
      const comentarios = await fetchComentarios({ id_lugar });
      return comentarios;
    },
    staleTime: 15 * 1000 * 60,
  });

  if (error || isPending) {
    return { comentariosPublicados: [] };
  }
  return { comentariosPublicados: data };
}
