/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { LogoutIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import { Link, useParams } from 'react-router-dom';
import { parseCookies } from 'nookies';
import Modal from '../../components/Modal';
import { useForm } from 'react-hook-form';
import Image from '../../assets/image.svg';
import AuthContext from '../../contexts/auth';

import moreHorizontal from '../../assets/more-horizontal.svg';
import xClose from '../../assets/x.svg';
import Comments from '../../assets/message-circle.svg';
import Downloads from '../../assets/download.svg';
import Share2 from '../../assets/share-2.svg';
import Hearts from '../../assets/heart.svg';
import HeartSelected from '../../assets/heart_selected.svg';

import { useNavigate } from 'react-router-dom';

export default function Perfil() {
    const navigate = useNavigate();
    const { username } = useParams();
    const UserContext = useContext(AuthContext);

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
    const [image, setImage] = useState(false);

    const handleSubmitUser = async data => {
        const cookies = parseCookies();
        const formData = new FormData();
        if ('' !== data.bio) {
            formData.append('bio', data.bio);
        }

        if (image) {
            formData.append('profilePicture', image);
        }

        // console.log(JSON.stringify(formData))
        console.log(formData);

        fetch('https://anotaifsp.herokuapp.com/api/user', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${cookies['anotaai.token']}`,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setUser(data.response.user);
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
        setImage(event.target.files[0]);
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
                setUser(response.response.user);
                setPosts(response.response.posts);
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

                    <div className='w-screen'>
                        <div className='md:hidden mt-5'>
                            <Link to="/feed">
                                <ArrowLeftIcon className="w-8 h-8 ml-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="w-screen h-1/4 flex justify-between items-center p-4">
                        
                        <div className='hidden md:block'>
                            <Link to="/feed">
                                <ArrowLeftIcon className="w-8 h-8 ml-4" />
                            </Link>
                        </div>

                        <div className="w-96 border-b flex flex-col md:flex-row justify-evenly items-center border-black p-3">
                            <div className="rounded-full">
                                <img
                                    src={user.profilePicture}
                                    className="rounded-full w-24 mt-5 mb-5 md:mt-none md:mb-none"
                                />
                            </div>
                            <div className='text-center md:text-left'>
                                <h1 className="text-lg">{user.name}</h1>
                                <h3 className="text-sm text-gray-600">
                                    {user.occupation}
                                </h3>
                                <p className="text-xs text-gray-600 text-justify">
                                    {user.bio}
                                </p>
                            </div>

                           
                            {UserContext.username === username ? (
                                <div className='md:hidden mt-5' onClick={() => setShowModal(true)}>
                                    <img src={moreHorizontal}  className="w-11 h-11 "/>
                                </div>
                            ) : (
                                <div></div>
                            )}

                        </div>

                        {UserContext.username === username ? (
                            <button
                                className="bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 md:px-3 md:py-1  lg:px-6 lg:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animacao-padrao hidden md:block"
                                type="button"
                                onClick={() => setShowModal(true)}
                            >
                                Editar Perfil
                            </button>
                        ) : (
                            <div></div>
                        )}

                    </div>

                    {showModal ? (
                        <Modal closeModal={closeModal}>
                            <form
                                onSubmit={handleSubmit(handleSubmitUser)}
                                className="justify-center text-center"
                            >
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    
                                    <button
                                        className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="text-black opacity-50 h-6 w-6 text-4xl block outline-none focus:outline-none">
                                            <img src={xClose}/>
                                        </span>
                                    </button>

                                </div>
                                <div className="relative flex-auto">
                                    <textarea
                                        placeholder="  Escreva sua bio..."
                                        {...register('bio', {})}
                                        className="w-full h-40 m-0 md:h-40"
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
                                            {image
                                                ? 1 + ' imagem'
                                                : 'Adicionar imagem'}{' '}
                                        </span>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex mt-10 md:mt-none flex-col-reverse md:flex-row items-center justify-end border-solid border-slate-200 rounded-b">
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

                    <div className="w-screen grid gap-4 grid-cols-1 mt-10 md:grid-cols-3 p-6">
                        {posts.map(post => (
                            <div className="border border-gray-200 p-7 shadow-xl rounded-lg">
                                <p className="text-sm text-gray-600 font-sans">
                                    {post.content}
                                </p>
                                <img src={post.images[0]} alt="Imagem do post" className='mt-5'/>

                                <div className="flex flex-row items-center justify-between mt-5">
                                    
                                    <span
                                        className="flex flex-row"
                                        onClick={() => navigate(`/post/${post.id}`)}
                                    >
                                        <img src={Comments} className="mr-2" />{' '}
                                        {post.commentsCounter}{' '}
                                    </span>

                                    <span className="flex flex-row">
                                        {post.liked ? (
                                            <img
                                                src={HeartSelected}
                                                className="mr-2 cursor-pointer"
                                            />
                                        ) : (
                                            <img
                                                src={Hearts}
                                                className="mr-2 cursor-pointer"
                                            />
                                        )}{' '}
                                        {post.likesCounter}{' '}
                                    </span>

                                    <span className="flex flex-row">
                                        <img src={Share2} className="mr-2" />{' '}
                                        {post.sharesCounter}{' '}
                                    </span> 

                                    <span className="flex flex-row">
                                        <img src={Downloads} className="mr-2" />{' '}
                                        {post.downloadsCounter}{' '}
                                    </span>

                                </div>

                            </div>

                        ))}
                    </div>

                </div>
            )}
        </>
    );
}
