import Busqueda from "./Busqueda";
import DescubreIA from "./DescubreIA";
import letraLogo from "../../assets/img/letra.png";

export default function Home() {
  return (
    <div className="w-full flex flex-col mt-[-16px] gap-0">
      <figure className=" relative overflow-hidden tablet: desktop:h-[80vh] flex justify-center p-10">
        <div className=" absolute inset-0 overflow-hidden"></div>
        <img
          className=" h-full w-[90%] rounded-2xl"
          src="/img/chocoyero.webp"
          alt="Rumbo Nica"
        />
        <img
          src={letraLogo}
          alt=""
          className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-90 bg-[#0000006e] backdrop-blur-[2px] rounded-2xl"
        />
      </figure>
      <div className="w-full p-4 tablet:px-38 desktop:px-48">
        {/* <DescubreIA /> */}
      </div>
    </div>
  );
}
