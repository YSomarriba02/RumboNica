import fetcLugares from "../apis/fetchLugares";
import { createContext, useContext, type ReactNode } from "react";
import { type Lugar } from "../Explora/interfaces/Lugar";
import { useQuery } from "@tanstack/react-query";

const LugarContext = createContext<Lugar[]>([]);

interface props {
  children: ReactNode;
}

export function LugaresProvider({ children }: props) {
  const {
    data: lugares,
    error,
    isPending,
  } = useQuery({
    queryKey: ["lugares"],
    queryFn: fetcLugares,
    refetchOnWindowFocus: true,
  });

  if (isPending) {
    console.log("Se estan cargando");
    return <LugarContext.Provider value={[]} />;
  }
  if (error) {
    console.log("Error al cargarlos");
    return <LugarContext.Provider value={[]} />;
  }

  console.log("Se cargaron");
  return (
    <LugarContext.Provider value={lugares}>{children}</LugarContext.Provider>
  );
}

export function useLugaresContext() {
  const context = useContext(LugarContext);
  return context;
}
