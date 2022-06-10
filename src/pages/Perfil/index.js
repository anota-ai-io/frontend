/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef} from 'react';
import { LogoutIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import { Link, useParams } from 'react-router-dom';
import { parseCookies } from 'nookies';
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form';
import Image from '../../assets/image.svg';

const postsTest = [
    {
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        img: 'http://localhost:8080',
    },
    {
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        img: 'http://localhost:8080',
    },
    {
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        img: 'http://localhost:8080',
    },
    {
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        img: 'http://localhost:8080',
    },
    {
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        img: 'http://localhost:8080',
    },
    {
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        img: 'http://localhost:8080',
    },
];

export default function Perfil() {
    const { username } = useParams();

    const cookies = parseCookies();

    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState();
    const [posts, setPosts] = useState();
    const [showModal, setShowModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [image, setImage] = useState([]);

    const handleSubmitPosts = async data => {
        const cookies = parseCookies();
        const formData = new FormData();
        formData.append('bio', data.bio);
        formData.append('profilePicture', image);
        console.log(JSON.stringify(formData))
        
        console.log(formData)
        
        await fetch('https://anotaifsp.herokuapp.com/api/user', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${cookies['anotaai.token']}`,
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setShowModal(false);
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const hiddenFileInput = useRef(null);

    function chooseImage(event) {
        hiddenFileInput.current.click();
    }

    const handleChange = event => {
        const formData = new FormData();
        const filesXmlArray = Array.from(event.target.files);
        filesXmlArray.forEach(file => formData.append('files', file[0]));
        setImage(filesXmlArray);
    };

    function closeModal() {
        setShowModal(false);
    }

    useEffect(() => {
        fetch(
            `https://anotaifsp.herokuapp.com/api/profile?username=${username}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies['anotaai.token']}`,
                },
            },
        )
            .then(response => response.json())
            .then(response => {
                console.log(response.response.user);
                setUser(response.response.user);
                // setPosts(response.response.posts);
                setPosts(postsTest);
            })
            .finally(() => {
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {loaded && (
                <div className="h-screen w-screen overflow-x-hidden">
                    
                    <div className="w-screen h-1/4 flex justify-between items-center p-4">
                        <div>
                            <Link to="/feed">
                                <ArrowLeftIcon className="w-11 h-11 ml-4" />
                            </Link>
                        </div>
                        <div className="w-96 border-b flex justify-between items-center border-black p-3">
                            <div className="border-2 rounded-full mr-12">
                                <img
                                    src={user.profilePicture}
                                    className="rounded-full w-24"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg">{user.name}</h1>
                                <h3 className="text-sm text-gray-600">
                                    {user.occupation}
                                </h3>
                                <p className="text-xs text-gray-600 text-justify">
                                    {user.bio}
                                </p>
                            </div>
                        </div>
                        <button
                            className="bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 md:px-3 md:py-1  lg:px-6 lg:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animacao-padrao"
                            type="button"
                            onClick={() => setShowModal(true)}
                        >
                            Editar Perfil
                        </button>
                    </div>
                    {showModal ? (
                            <Modal closeModal={closeModal}>
                                <form
                                    onSubmit={handleSubmit(handleSubmitPosts)}
                                    className="justify-center text-center"
                                >
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Editar Perfil do Usuário
                                        </h3>
                                        <button
                                            className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={closeModal}
                                        >
                                            <span className="text-black opacity-5 h-6 w-6 text-4xl block outline-none focus:outline-none">
                                                X
                                            </span>
                                        </button>
                                    </div>
                                    <div className="relative flex-auto">
                                        <textarea
                                            placeholder="  Escreva sua bio..."
                                            {...register('bio', {})}
                                            className="w-full h-96 m-0 md:h-64"
                                        />

                                        <div className="flex flex-row justify-center md:justify-start mt-5">
                                            <img
                                                className="mr-5"
                                                src={Image}
                                                onClick={chooseImage}
                                            />
                                            <input
                                                type="file"
                                                ref={hiddenFileInput}
                                                onChange={handleChange}
                                                id="file-upload"
                                                className="hidden"
                                            />
                                            <span>
                                                {image.length > 1
                                                    ? image.length + ' imagens'
                                                    : image.length +
                                                        ' imagem'}{' '}
                                            </span>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={closeModal}
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
                            </Modal>
                    ) : null}
                    <div className="w-screen grid gap-4 grid-cols-1 md:grid-cols-3 p-6">
                        {posts.map(post => (
                            <div className="border border-gray-200 p-7 shadow-xl rounded-lg">
                                <p className="text-sm text-gray-600 font-sans">
                                    {post.content}
                                </p>
                                {post.img}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
