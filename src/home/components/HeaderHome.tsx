import { Link } from "react-router-dom";
import { obtenerAve } from "../../aviturismo-page/service/obtener-aves";
import { NavLinks } from "./NavLinks";
import { useSesionContex } from "../../Context/AuthContex";

import { MenuDesplegable } from "./MenuDesplegable";
import logo from "../../assets/img/LogoRumboNica.svg";
import perfil from "../../assets/icons/perfil.png";

const links = ["Inicio", "Rumbos", "Juegos", "Contacto"];

export const HeaderHome = () => {
  obtenerAve();
  const { sesion } = useSesionContex();
  const picture = sesion?.picture ?? perfil;

  return (
    <header className="relative z-50 w-full flex justify-between gap-4  bg-black text-white p-3 ">
      <Link to={"/"} className="flex justify-start items-center w-[40%]">
        <img src={logo} className="w-[100px]  h-[50px] object-cover "></img>
      </Link>
      <nav className="hidden desktop:flex justify-center items-center gap-2   px-5 py-2 w-[50%] ">
        <NavLinks links={links}></NavLinks>
      </nav>
      <MenuDesplegable links={links}></MenuDesplegable>

      {sesion ? (
        <Link
          to={"/Perfil"}
          className="w-[5%] hidden desktop:block mr-1 p-1 rounded-full bg-lightGreen text-white font-bold font-nunito active:scale-98  transition-transform overflow-hidden"
        >
          <img src={picture} alt="" className="w-full rounded-full" />
        </Link>
      ) : (
        <Link
          to={"/Inicio-sesion"}
          className=" hidden desktop:flex items-center mr-10  font-nunito font-bold px-4 rounded-full bg-lightGreen text-white active:scale-98  transition-transform "
        >
          Inicie sesion
        </Link>
      )}
    </header>
  );
};
