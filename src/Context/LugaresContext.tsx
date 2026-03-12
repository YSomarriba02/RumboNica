import {
  createContext,
  useContext,
  useEffect,
  useState,
  type JSX,
  type ReactNode,
} from "react";
import { type Lugar } from "../Explora/interfaces/Lugar";

import { turismoAPiFecth } from "../apis/turismo.api";

const LugarContext = createContext<Lugar[]>([]);

interface props {
  children: ReactNode;
}

export function LugaresProvider({ children }: props) {
  const [lugares, setLugares] = useState<Lugar[]>([]);
  useEffect(() => {
    async function getLugares() {
      try {
        const fetching = await fetch(`${turismoAPiFecth}lugares/getlugares`);

        if (!fetching.ok) throw new Error("Error al obtener lugares");

        const data = await fetching.json();
        setLugares(data);
      } catch (error) {}
    }

    getLugares();
  }, []);

  return (
    <LugarContext.Provider value={lugares}>{children}</LugarContext.Provider>
  );
}

export function useLugaresContext() {
  const context = useContext(LugarContext);
  return context;
}
