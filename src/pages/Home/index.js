/* eslint-disable jsx-a11y/alt-text */
import React from "react";

// import HomeHeader from "../../components/Header/HomeHeader";
import NuvemFormas from "../../assets/nuvem-formas.svg";
import Logo from "../../assets/logo.png";
import HomeOffice from "../../assets/home_office.png";


export default function Home() {
  return (
    <>
      <div className="h-screen w-screen">
        <img src={NuvemFormas} className="w-screen h-1/4" />
        <div className="h-1/2 flex p-11">
          <div className="">
            <img src={Logo} />
            <p>Uma plataforma aberta para que você possa discutir os assuntos do seu interesse. Cadastre-se e conheça seus recursos.</p>
          </div>
          <div className="overflow-hidden">
            <img src={HomeOffice} className="h-full"  />
          </div>
        </div>
        <img src={NuvemFormas} className="w-screen h-1/4" />
      </div>
    </>
  );
}
