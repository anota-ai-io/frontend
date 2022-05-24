import React, { useState } from "react";

import Image from '../../assets/image.svg'
import Smile from '../../assets/smile.svg'
import Vector from '../../assets/Vector.svg'

import { useForm } from "react-hook-form";
import { parseCookies } from 'nookies';


export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);

  const handleSubmitPosts = async data => {
    const cookies = parseCookies();
    console.log(images)
    console.log(JSON.stringify({
      "content": data.content, 
      "hashtags": ["teste"],
      "images": images
    }))
    let formData = new FormData();
    formData.append('content', data.content);
    formData.append('hashtags', ['John123']);
    // formData.append('images', ['John123']);

    await fetch("https://anotaifsp.herokuapp.com/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${cookies['anotaai.token']}`
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          setShowModal(false)
        })
        .catch(err => {
          console.log(err.message)
        })
  };

  const hiddenFileInput = React.useRef(null);

  function chooseImage(event) {
    hiddenFileInput.current.click()
  }

  const handleChange = event => {
    const formData = new FormData();
    const filesXmlArray = Array.from(event.target.files);
    filesXmlArray.forEach(file => formData.append('files', file));
    console.log(filesXmlArray)
    setImages(filesXmlArray)
  };

  return (
    <>
      <button
        className="bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 md:px-3 md:py-1  lg:px-6 lg:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animacao-padrao"
        type="button"
        onClick={() => setShowModal(true)}
      >

        Publicação
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animacao-padrao"
          >
            <div className="relative w-full h-full md:w-6/12 md:h-3/6 ">
              {/*content*/}
              <div className="border-0 p-4 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Nova Publicação
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit(handleSubmitPosts)} className="justify-center text-center">
                  <div className="relative flex-auto">
                      
                    <textarea placeholder="  Escreva sua públicação..." {...register("content", {})} className="w-full h-96 m-0 md:h-64"/>

                    <div className="flex flex-row justify-center md:justify-start mt-5">
                        <img className="mr-5" src={Image} onClick={chooseImage} />
                        <input type="file" ref={hiddenFileInput} onChange={handleChange} id="file-upload" class="hidden" multiple />
                        <img className="mr-5" src={Smile} />
                        <img className="mr-5" src={Vector} />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Publicar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}