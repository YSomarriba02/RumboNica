import Comentario from "./Components/Comentario";
import AgregarComentario from "./Components/AgregarComentario";
import useGetComentarios from "./hooks/useGetComentarios";
import { useSesionContex } from "../../../Context/AuthContex";

interface props {
  idLugar: number;
}

export default function Comentarios({ idLugar }: props) {
  const { sesion } = useSesionContex();
  const { comentariosPublicados } = useGetComentarios({ id_lugar: idLugar });

  return (
    <div
      id="Box_Comentarios"
      className="w-full p-3 flex flex-col justify-center gap-4 items-center [box-shadow:1px_2px_3px_1px_black] rounded-[12px] tablet:p-6 tablet:w-[80%] desktop:w-[60%]"
    >
      {sesion ? <AgregarComentario idLugar={idLugar} /> : null}
      <div id="Comentarios" className="w-full h-[80%] flex flex-col gap-6">
        {comentariosPublicados.length == 0 ? (
          <h1 className="">No hay Comentarios</h1>
        ) : (
          comentariosPublicados.map((comentario) => {
            console.log(comentario);
            // if (!comentario.usuarios) return;

            return (
              <Comentario
                key={comentario.id_comentario}
                id_lugar={idLugar}
                id_comentario={comentario.id_comentario}
                fecha={comentario.fecha_creacion}
                puntuacion={comentario.puntuacion}
                contenido={comentario.contenido}
                usuarioNombre={comentario.usuarios.nombre}
                picture={comentario.usuarios.imagenurl}
                esComentarioUsuario={
                  sesion?.id_usuario === comentario.usuarios.id_usuario
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
}
