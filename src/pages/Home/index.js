/* eslint-disable jsx-a11y/alt-text */
import React from "react";

// import HomeHeader from "../../components/Header/HomeHeader";
import NuvemFormas from "../../assets/nuvem-formas.svg";
import Logo from "../../assets/logo.png";
import HomeOffice from "../../assets/home_office.png";
import { Link } from "react-router-dom";



export default function Home() {
  return (
    <>
      <div className="h-screen w-screen">
        <img src={NuvemFormas} className="w-screen md:h-1/4" />
        <div className="h-1/2 md:flex justify-center p-11">
          <div className="md:w-1/3">
            <img src={Logo} />
            <p className="mt-3 text-justify">Uma plataforma aberta para que você possa discutir os assuntos do seu interesse. Cadastre-se e conheça seus recursos.</p>
            <Link
                to="/register"
                className="mt-6 whitespace-nowrap inline-flex items-center justify-center px-10 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Criar Usuário
              </Link>
              <Link
                to="/login"
                className="mt-6 ml-1 whitespace-nowrap inline-flex items-center justify-center px-10 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Já tenho uma conta
              </Link>
            <button className=""></button>
          </div>
          <div className="overflow-hidden mt-16 md:mt-0">
            <img src={HomeOffice} className="h-full"  />
          </div>
        </div>
        <img src={NuvemFormas} className="w-screen fixed bottom-0 h-20 md:absolute md:h-1/4" />
      </div>
    </>
  );
}
