import { useEffect, useState } from "react";
import type guia from "../interfaces/iGuia";
import { turismoAPiFecth } from "../../../../apis/turismo.api";

interface prop {
  idlugar: number;
}

export default function useGetGuias({ idlugar }: prop) {
  const [guias, setGuias] = useState<guia[]>([]);

  useEffect(() => {
    async function getComercios() {
      try {
        const fetching = await fetch(
          `${turismoAPiFecth}guiaslocales/getguias/${idlugar}`,
        );

        if (!fetching.ok) throw new Error("Error al obetener data");

        const arrdata = await fetching.json();

        setGuias(arrdata.data);
      } catch (error) {
        setGuias([]);
      }
    }
    getComercios();
  }, []);

  return guias;
}
