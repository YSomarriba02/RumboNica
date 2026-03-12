import {
  createContext,
  useContext,
  useEffect,
  useState,
  type JSX,
} from "react";
import { type Sesion, type SesionContextType } from "../Auth/interface/iAuth";
import { turismoAPiFecth } from "../apis/turismo.api";

interface prop {
  children: JSX.Element | JSX.Element[];
}

const SesionContext = createContext<SesionContextType>({} as SesionContextType);

export function SesionProvider({ children }: prop) {
  const [sesion, setSesion] = useState<Sesion | undefined>(undefined);
  useEffect(() => {
    async function verificarSesion() {
      try {
        const fetching = await fetch(`${turismoAPiFecth}auth/verificarsesion`, {
          credentials: "include",
        });
        if (fetching.ok) {
          const data: Sesion = await fetching.json();
          setSesion({
            name: data.name,
            email: data.email,
            picture: data.picture,
            id_usuario: data.id_usuario,
          });

          return;
        }
      } catch (error) {
        setSesion(undefined);
      }
    }
    verificarSesion();
  }, []);

  return (
    <SesionContext.Provider value={{ sesion, setSesion }}>
      {children}
    </SesionContext.Provider>
  );
}

export function useSesionContex() {
  return useContext(SesionContext);
}
