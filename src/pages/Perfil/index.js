/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  LogoutIcon,
  ArrowLeftIcon
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";


const posts = [
  {
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    img:  "http://localhost:8080"
  },
  {
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    img:  "http://localhost:8080"
  },
  {
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    img:  "http://localhost:8080"
  },  
  {
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    img:  "http://localhost:8080"
  },
  {
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    img:  "http://localhost:8080"
  },
  {
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    img:  "http://localhost:8080"
  }
]

export default function Perfil() {
  return (
    <>
      <div className="h-screen w-screen overflow-x-hidden">
        <div className="w-screen h-1/3 flex justify-between p-8">
          <div>
            <Link
              to="/feed"
            >
              <ArrowLeftIcon className='w-11 h-11' />
            </Link>
          </div>
          <div className="w-72 border-b flex flex-col justify-between items-center border-black">
            <h1 className="text-lg">Luan Rodrigues Petruitis</h1>
            <h3 className="text-sm text-gray-600">Desenvolvedor Back-End</h3>
            <p className="text-xs text-gray-600 mx-8 text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
          </div>
          <div>
            <LogoutIcon className='w-11 h-11' />
          </div>
        </div>
        <div className="w-screen grid gap-4 grid-cols-1 md:grid-cols-3 p-6">
          {posts.map(post => (
            <div className="border border-gray-200 p-7 shadow-xl rounded-lg">
              <p className="text-sm text-gray-600 font-sans">{post.content}</p>
              {post.img}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
