/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import Logo from '../../assets/logo.png'
import User1 from '../../assets/user1.svg'
import Bell from '../../assets/bell.svg'
import Globe from '../../assets/globe.svg'
import Home from '../../assets/home.svg'
import Mail from '../../assets/mail.svg'
import PlusSquare from '../../assets/plus-square.svg'
import User from '../../assets/user.svg'

import Image from '../../assets/image.svg'
import Smile from '../../assets/smile.svg'
import Vector from '../../assets/Vector.svg'


export default function Feed() {
  return (
    <>
      <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-7">
        
        {/* Bloco esquerdo */}
        <div className=" col-span-2 border-t-4">
          <img src={Logo} className="pl-6 mt-2" />

          <nav className="flex flex-col align-center mt-2">
            <div className="flex-grow-1">
              <ul className="flex flex-col justify-around pl-5">
                <li className="mt-3">
                  <a className="text-3xl flex flex-row" href="#">
                    <img src={Home} className="mr-5"/>
                    INÍCIO
                  </a>
                </li>
                <li className="mt-3">
                  <a className="text-3xl flex flex-row" href="#">
                    <img src={Globe} className="mr-5" />
                    EXPLORAR
                  </a>
                </li>
                <li className="mt-3">
                  <a className="text-3xl flex flex-row" href="#">
                    <img src={Bell} className="mr-5" />
                    NOTIFICAÇÕES
                  </a>
                </li>
                <li className="mt-3">
                  <a className="text-3xl flex flex-row" href="#">
                    <img src={Mail} className="mr-5" />
                    MENSAGENS
                  </a>
                </li>
                <li className="mt-3">
                  <a className="text-3xl flex flex-row" href="#">
                    <img src={PlusSquare} className="mr-5" />
                    MAIS
                  </a>
                </li>
              </ul>
            </div>
          </nav>

        </div>

        {/* Bloco do meio */}
        <div className="col-span-3 border-t-4 border-2 grid">
          
          {/* Pesquisa e foto */}
          <div className="row-span-1 border-b-2 p-5 mt-5">
            
            <div className=" flex items-center justify-center">
              <div className="border-2 rounded-full ml-10 mr-5"><img src={User1} className="p-6"></img></div>
              <input type="text" placeholder="O que está pensando?" className="mr-10 w-9/12 h-16 focus:outline-none"></input>
            </div>
            
            <div className="flex justify-center">
              <hr className=" w-7/12"></hr>
            </div>

            <div className="flex flex-row mt-2 ml-32">
              <img className="mr-5" src={Image}></img>
              <img className="mr-5" src={Smile}></img>
              <img className="mr-5" src={Vector}></img>
            </div>
          </div>

          <div className="row-span-1"></div>
          <div className="row-span-1"></div>
          <div className="row-span-1"></div>
          <div className="row-span-1"></div>
          <div className="row-span-1"></div>
          <div className="row-span-1"></div>
          <div className="row-span-1"></div>
          <div className="row-span-1"></div>

        </div>



        {/* Bloco direito */}
        <div className="col-span-2 grid border-t-4 gap-5">

          {/* Pesquisa */}
          <div className="row-auto flex justify-center items-center mt-2">
            <input type="text" className="input border-2 rounded-full w-11/12 h-16"></input>
          </div>

          <div className="row-auto flex justify-center items-start">
            <div className="border-2 rounded-3xl w-11/12 h-64"></div>
          </div>

          <div className="row-auto flex justify-center items-start">
            <div className="border-2 rounded-3xl w-11/12 h-64"></div>
          </div>
          
          {/* <div className="row-auto justify-center items-start">
            <div className="border-2 rounded-full flex flex-row justify-center items-center w-9/12 overflow-hidden">
              
              <div className="flex flex-row">
                <h1>#Teste</h1>
              </div>

              <div className="flex flex-row">
                <h1>#Teste</h1>
              </div>


            </div>
          </div> */}
          
          
        </div>



      </div>
    </>
  );
}
