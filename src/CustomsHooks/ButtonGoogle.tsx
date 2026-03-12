import { useEffect, useRef } from "react";
import type { typeActionQuery } from "../Auth/Auth";
import { useNavigate } from "react-router-dom";
import { useSesionContex } from "../Context/AuthContex";
import { turismoAPiFecth } from "../apis/turismo.api";

declare global {
  interface Window {
    google: any;
  }
}

type props = {
  accionquery: typeActionQuery;
  setNotification: React.Dispatch<
    React.SetStateAction<{ mensaje: string; isValido: boolean } | null>
  >;
  onSuccess?: (credential: string) => void;
};

export default function ButtonGoogle({ accionquery, setNotification }: props) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { setSesion } = useSesionContex();
  const nav = useNavigate();

  useEffect(() => {
    const renderButton = () => {
      if (window.google && buttonRef.current) {
        window.google.accounts.id.initialize({
          client_id:
            "133667901696-9ild5j9lv59i1r07t2pdglsh1em56s8m.apps.googleusercontent.com",
          callback: async (response: any) => {
            try {
              const res = await fetch(
                `${turismoAPiFecth}auth/google/callback?accion=${accionquery}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ credential: response.credential }),
                  credentials: "include",
                },
              );

              const data = await res.json();
              if (res.ok) {
                console.log("Login exitoso");
                console.log(data);
                setSesion(data);
                nav("/", { replace: true });
              } else {
                setSesion(undefined);
                setNotification({ mensaje: data.mensaje, isValido: false });
                console.error("Token inválido o error en backend");
              }
            } catch (error) {
              setSesion(undefined);
              setNotification({
                mensaje: "Upps ocurrio un error",
                isValido: false,
              });
            }
          },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          text: "continue_with",
          logo_alignment: "center",
        });
        window.google.accounts.id.disableAutoSelect();
      }
    };

    const scriptExists = document.getElementById("google-client-script");

    if (!scriptExists) {
      const script = document.createElement("script");
      script.id = "google-client-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = renderButton;
      document.body.appendChild(script);
    } else {
      renderButton();
    }
  }, [accionquery, nav]);

  return <div ref={buttonRef} className="w-full [&>div]:w-full"></div>;
}
