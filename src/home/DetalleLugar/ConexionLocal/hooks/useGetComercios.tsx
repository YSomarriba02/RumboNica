import { useEffect, useState } from "react";
import { type comercio } from "../interfaces/iComercio";
import { turismoAPiFecth } from "../../../../apis/turismo.api";

interface prop {
  idlugar: number;
}

export default function useGetComercios({ idlugar }: prop) {
  const [comercios, setComercios] = useState<comercio[]>([]);

  useEffect(() => {
    async function getComercios() {
      try {
        const fetching = await fetch(
          `${turismoAPiFecth}comercios/getcomercios/${idlugar}`,
        );

        if (!fetching.ok) throw new Error("Error al obetener data");

        const arrdata = await fetching.json();

        setComercios(arrdata.data);
      } catch (error) {
        setComercios([]);
      }
    }
    getComercios();
  }, []);

  return comercios;
}
