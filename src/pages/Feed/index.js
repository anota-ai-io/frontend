/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

// import ComponentSkeleton from '../../components/Skeleton/index.js';
import { parseCookies } from 'nookies';

import Logo from '../../assets/logo.png'
import User1 from '../../assets/user1.svg'
import Bell from '../../assets/bell.svg'
import Globe from '../../assets/globe.svg'
import Home from '../../assets/home.svg'
import Mail from '../../assets/mail.svg'
import PlusSquare from '../../assets/plus-square.svg'

import Image from '../../assets/image.svg'
import Smile from '../../assets/smile.svg'
import Vector from '../../assets/Vector.svg'
import Menu from '../../assets/menu.svg'

import Comments from '../../assets/message-circle.svg'
import Downloads from '../../assets/download.svg'
import Hearts from '../../assets/heart.svg'
import Share2 from '../../assets/share-2.svg'
import xClose from '../../assets/x.svg'

import { Link } from "react-router-dom";


export default function Feed() {  
  const [posts, setPosts] = useState([])
  const [menuMobileState, setMenuMobileState] = useState(false)

  useEffect(() => {
    const cookies = parseCookies();
    console.log(cookies['anotaai.token'])
    fetch("https://anotaifsp.herokuapp.com/api/feed", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies['anotaai.token']}`
      } 
    })
      .then(response => response.json())
      .then(response => {
        setPosts(response.response.posts)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function setMenuMobile() {
    return
    setMenuMobileState(!menuMobileState)
  }

  function formatDate(date) {
    const data = new Date(date).toLocaleString() 
    return data
  }


  function renderPublications() {
    return posts.map(post => (
        <div className="row-span-1 border grid grid-cols-12">

          <div className="col-span-2 row-span-6">
            <div className="flex items-center justify-center mt-5"> <div className="border-2 rounded-full "> <img src={User1} className="p-6"></img> </div> </div>
          </div>

          {/* PRIMEIRA LINHA */}
          <div className="col-span-10 row-span-2 flex justify-self-start mt-5 mr-5">
            <div className="flex items-center justify-start mt-5 ml-2"><span className="text-xl"> { post.user.name } </span></div>
            <div className="flex items-center justify-start mt-5 ml-2"><span className="text-lg"> @{ post.user.username } </span></div>
            <div className="flex items-center justify-start mt-5 ml-2"><span className="text-lg">{ formatDate(post.createdAt) }</span></div>
          </div>

          {/* SEGUNDA LINHA */}

          <div className="col-span-9 row-span-1 ">
            <div className="flex items-center justify-start mt-5"><span className="text-sm whitespace-pre-line break-all">{ post.content }</span></div>
          </div>

          {/* TERCEIRA LINHA */}

          <div className="col-span-10 row-span-1 ">
            <div className="flex items-center justify-center mt-5"><img className="mt-2 w-full mr-8" src={post.images[0] ? post.images[0] : ''} /></div>
          </div>

          {/* QUINTA LINHA */}

          <div className="col-span-8 row-span-1 mb-5">
            <div className="flex flex-row items-center justify-between mt-5">
              <span className="flex flex-row"><img src={Comments} className="mr-2" /> {post.commentsCounter} </span>
              <span className="flex flex-row"><img src={Hearts} className="mr-2" /> {post.likesCounter} </span>
              <span className="flex flex-row"><img src={Share2} className="mr-2" /> {post.sharesCounter} </span>
              <span className="flex flex-row"><img src={Downloads} className="mr-2" /> {post.downloadsCounter} </span>
            </div>
          </div>

        </div>
      ))
  }


  return (
    <>
      <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-7 overflow-hidden">
        

        {/* ESQUERDA - MENU E USUÁRIO */}
        <div className={menuMobileState ? "col-span-1 animacao-padrao" : "hidden md:grid col-span-2 border-t-4"}>

          <div className="flex flex-row justify-between md:row-span-1 md:block md:p-5">
            <img src={Logo} className="" />
            <img src={xClose} className={menuMobileState ? "block mr-5" : "hidden " } width={25} height={25} onClick={setMenuMobile()}/>
          </div>

          <div className="row-span-6">
            <nav className="flex flex-col align-center justify-between mt-2">

              <div className="">
                <ul className="flex flex-col justify-around pl-5">
                  <li className="mt-5">
                    <Link
                        to="/feed"
                        className="text-xl flex flex-row"
                      >
                        <img src={Home} className="mr-5" />
                        INÍCIO
                    </Link>
                  </li>
                  <li className="mt-5">
                      <Link
                        to="/explore"
                        className="text-xl flex flex-row"
                      >
                        <img src={Globe} className="mr-5" />
                        EXPLORAR
                    </Link>
                  </li>
                  <li className="mt-5">
                      <Link
                        to="/notifications"
                        className="text-xl flex flex-row"
                      >
                        <img src={Bell} className="mr-5" />
                        NOTIFICAÇÕES
                    </Link>
                  </li>
                  <li className="mt-5">
                    <Link
                        to="/chat"
                        className="text-xl flex flex-row"
                      >
                        <img src={Mail} className="mr-5" />
                        MENSAGENS
                    </Link>
                  </li>
                  <li className="mt-5">
                      <Link
                        to="/more"
                        className="text-xl flex flex-row"
                      >
                      <img src={PlusSquare} className="mr-5" />
                      MAIS
                    </Link>
                  </li>
                </ul>
              </div>

            </nav>
          </div>

          <div className="row-span-1 flex flex-row">
              <Link
                    to="/perfil"
                    className="flex flex-col items-start align-bottom p-6"
                  >
                <h2 className="font-extrabold text-lg">Fulano</h2>
                <h3 className="text-base">@Fulano</h3>
              </Link>
          </div>

        </div>


        {/* CENTRO - PUBLICAÇÕES E POSTS */}
        <div  
          className={menuMobileState ? "hidden" : "col-span-1 md:col-span-3 border-t-4 border-2 h-screen overflow-y-scroll animacao-padrao"}>
          

          {/* MENU MOBILE */}
          <div className="md:hidden row-span-1 border-b-2 p-5 mt-5 " onClick={e => this.setMenuMobile()}>
            <img src={Menu} className=""></img>
          </div>

          {/* ADICIONAR PUBLICACAO */}
          <div className="row-span-1 grid grid-cols-1 md:grid-cols-12 gap-2 border-b-2 p-5 justify-center align-middle text-center ">
            

            <div className="col-span-1 md:col-span-2 row-span-1 justify-center align-middle text-center mb-5 md:mb-0  ">
              <div className="flex justify-center align-middle text-center"><div className="border-2 rounded-full"><img src={User1} className="p-6"></img></div></div>
            </div>

            <div className="col-span-1 md:col-span-10 row-span-1 justify-center align-middle text-center mt-5 mb-5">
              <div className="flex justify-center align-middle text-center "><textarea placeholder="O que está pensando?" className="w-96 h-32 md:h-16 focus:outline-none"></textarea></div>
            </div>

            <div className="col-span-1 md:col-span-10 flex flex-row justify-center md:justify-start mt-5 md:ml-32">
              <img className="mr-5" src={Image}></img>
              <img className="mr-5" src={Smile}></img>
              <img className="mr-5" src={Vector}></img>
            </div>


            {/* <div className=" flex flex-col md:flex-row items-center justify-center">
              <div className="border-2 rounded-full md:ml-10 md:mr-5"><img src={User1} className="p-6"></img></div>
              <textarea placeholder="O que está pensando?" className="md:mr-10 md:w-9/12 h-16 focus:outline-none"></textarea>
            </div>

            <div className="flex flex-row justify-center md:justify-start mt-5 md:ml-32">
              <img className="mr-5" src={Image}></img>
              <img className="mr-5" src={Smile}></img>
              <img className="mr-5" src={Vector}></img>
            </div> */}

          </div>

          
          <div className="row-span-1 border flex text-center justify-center">
            <a href="#" className="text-blue-600 font-bold">Visualizar mais publicações</a>
          </div>


          {/* LISTA DE PUBLICACOES */}
          {renderPublications()}
          

        </div>


        {/* DIREITA -  PESQUISA DE ASSUNTOS E EM ALTA */}
        <div className="hidden md:grid col-span-2 border-t-4 gap-5">

          <div className="row-auto flex justify-center items-center mt-2">
            <input type="text" placeholder="      Pesquisar no Anota Aí" className="input border-2 rounded-full w-11/12 h-16"></input>
          </div>

          <div className="row-auto flex justify-center items-start">
            <div className="border-2 rounded-3xl w-11/12 h-64"></div>
          </div>

          <div className="row-auto flex justify-center items-start text-center">
            
            <div className="border-2 rounded-3xl w-11/12 h-64">

            </div>
          </div>
          
        </div>



      </div>
    </>
  );  
}
