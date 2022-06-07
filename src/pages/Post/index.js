/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
const { io } = require('socket.io-client');

import { parseCookies } from 'nookies';
import Modal from '../../components/Modal';
import { Carousel } from '../../components/Carousel/index';

import LogoIcon from '../../assets/logo_icon.svg';
import Logo from '../../assets/logo.png';
import Bell from '../../assets/bell.svg';
import Globe from '../../assets/globe.svg';
import Home from '../../assets/home.svg';
import Mail from '../../assets/mail.svg';
import PlusSquare from '../../assets/plus-square.svg';

import Menu from '../../assets/menu.svg';

import Comments from '../../assets/message-circle.svg';
import Downloads from '../../assets/download.svg';
import Hearts from '../../assets/heart.svg';
import Share2 from '../../assets/share-2.svg';
import xClose from '../../assets/x.svg';
import { Link, useParams } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/outline';

export default function Post() {
    const { id } = useParams();
    const cookies = parseCookies();
    const [post, setPost] = useState();
    const [menuMobileState, setMenuMobileState] = useState(false);
    const [loadPostsState, setLoadPotsState] = useState(true);
    const [comments, setComments] = useState([]);

    const { register, handleSubmit, reset } = useForm({});

    const comment = async data => {
        await fetch('https://anotaifsp.herokuapp.com/api/comment', {
            // await fetch('http://localhost:3000/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies['anotaai.token']}`,
            },
            body: JSON.stringify({
                postId: id,
                content: data.comment,
            }),
        })
            .then(response => {
                reset({
                    comment: '',
                });
                setLoadPotsState(true);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        let socket = null;

        fetch(`https://anotaifsp.herokuapp.com/api/post/${id}`, {
            // fetch(`http://localhost:3000/api/post/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies['anotaai.token']}`,
            },
        })
            .then(response => response.json())
            .then(response => {
                setPost(response.response.post);
                setComments(response.response.post.comments);
            })
            .then(() => {
                socket = io('https://anotaifsp.herokuapp.com');
                // socket = io('http://localhost:3000');
                console.log('Socket Aberto');

                socket.on('connect', () => {
                    socket.emit('register', {
                        socketId: socket.id,
                        postId: id,
                    });
                    
                    socket.on('new_comment', data => {
                        let commentsHold = comments;
                        setComments([...commentsHold, data]);
                    });
                });
            })
            .catch(err => {
                console.log(err);
            });

        return function cleanUp() {
            socket.emit('unregister', {
                socketId: socket.id,
                postId: id,
            });

            console.log('Socket fechado');
            socket.disconnect();
        };
    }, []);

    function setMenuMobile() {
        setMenuMobileState(!menuMobileState);
    }

    function formatDate(date) {
        const data = new Date(date).toLocaleString();
        return data;
    }

    return (
        <>
            <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                {/* ESQUERDA - MENU E USUÁRIO */}
                <div
                    className={
                        menuMobileState
                            ? 'col-span-1 animacao-padrao'
                            : 'hidden md:grid col-span-2 border-t-4'
                    }
                >
                    <div className="flex flex-row ml-2 mt-2 justify-between md:ml-0 md:row-span-1 md:block md:p-14 lg:p-5">
                        <img
                            src={Logo}
                            className="sm:block md:hidden lg:block"
                        />
                        <img
                            src={LogoIcon}
                            className="hidden md:block lg:hidden"
                        />
                        <img
                            src={xClose}
                            className={
                                menuMobileState ? 'block mr-5' : 'hidden '
                            }
                            width={25}
                            height={25}
                            onClick={setMenuMobile}
                        />
                    </div>

                    <div className="row-span-6">
                        <nav className="flex flex-col align-center justify-between mt-2">
                            <div className="">
                                <ul className="flex flex-col justify-around md:pl-16 lg:pl-5 ">
                                    <li className="mt-5">
                                        <Link
                                            to="/feed"
                                            className="text-xl flex flex-row"
                                        >
                                            <img src={Home} className="mr-5" />
                                            <span className="sm:block md:hidden lg:block">
                                                INÍCIO
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="mt-5">
                                        <Link
                                            to="/explore"
                                            className="text-xl flex flex-row"
                                        >
                                            <img src={Globe} className="mr-5" />
                                            <span className="sm:block md:hidden lg:block">
                                                EXPLORAR
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="mt-5">
                                        <Link
                                            to="/notifications"
                                            className="text-xl flex flex-row"
                                        >
                                            <img src={Bell} className="mr-5" />
                                            <span className="sm:block md:hidden lg:block">
                                                NOTIFICAÇÕES
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="mt-5">
                                        <Link
                                            to="/chat"
                                            className="text-xl flex flex-row"
                                        >
                                            <img src={Mail} className="mr-5" />
                                            <span className="sm:block md:hidden lg:block">
                                                MENSAGENS
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="mt-5">
                                        <Link
                                            to="/more"
                                            className="text-xl flex flex-row"
                                        >
                                            <img
                                                src={PlusSquare}
                                                className="mr-5"
                                            />
                                            <span className="sm:block md:hidden lg:block">
                                                MAIS
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <div className="row-span-1 flex flex-row justify-between">
                        <Link
                            to="/perfil"
                            className="flex flex-col sm:items-start md:items-center lg:items-start align-bottom p-6 md:p-12 lg:p-6 "
                        >
                            <h2 className="font-extrabold text-lg">Fulano</h2>
                            <h3 className="text-base">@Fulano</h3>
                        </Link>
                    </div>

                    <div className="p-6">
                        <Modal />
                    </div>
                </div>

                {/* CENTRO - PUBLICAÇÕES E POSTS */}
                <div
                    className={
                        menuMobileState
                            ? 'hidden'
                            : 'col-span-1 md:col-span-6 border-t-4 border-2 h-screen overflow-y-scroll animacao-padrao'
                    }
                >
                    {/* MENU MOBILE */}
                    <div
                        className="md:hidden row-span-1 border-b-2 p-5 mt-5 "
                        onClick={setMenuMobile}
                    >
                        <img src={Menu} className=""></img>
                    </div>

                    <div className="row-span-1 border flex text-center justify-center">
                        <Link to="/feed" className="text-blue-600 font-bold">
                            Visualizar mais publicações
                        </Link>
                    </div>

                    {/* LISTA DE PUBLICACOES */}
                    {/* {
            loadPostsState ? renderPublicationsAnimated() : renderPublications()
          } */}

                    {post && (
                        <>
                            <div
                                key={post.id}
                                className="row-span-1 border grid grid-cols-12"
                            >
                                <div className="ml-2 md:ml-0  col-span-2 row-span-6">
                                    <div className="flex items-center justify-center mt-5">
                                        {' '}
                                        <div className="border-2 rounded-full">
                                            {' '}
                                            <img
                                                src={post.user.profilePicture}
                                                className="rounded-full w-16"
                                            ></img>{' '}
                                        </div>{' '}
                                    </div>
                                </div>

                                <div className=" col-span-10 row-span-2 flex justify-self-start md:mt-5 md:mr-5">
                                    <div className="flex items-center justify-start mt-5 ml-2">
                                        <span className="text-base md:text-xl">
                                            {' '}
                                            {post.user.name}{' '}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-start mt-5 ml-2">
                                        <span className="text-sm md:text-lg">
                                            {' '}
                                            @{post.user.username}{' '}
                                        </span>
                                    </div>
                                    <div className="hidden md:flex items-center justify-start mt-5 ml-2">
                                        <span className="text-xs md:text-lg">
                                            {formatDate(post.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-span-9 row-span-1 ">
                                    <div className="flex md:hidden items-center justify-start ml-2">
                                        <span className="text-xs md:text-lg">
                                            {formatDate(post.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-start mt-5 ml-2">
                                        <span className="text-sm whitespace-pre-line break-all">
                                            {post.content}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-start mt-6 ml-2">
                                        {post.hashtags.map(hashtag => (
                                            <span
                                                key={hashtag.id}
                                                className="text-sm text-gray-400 whitespace-pre-line break-all"
                                            >
                                                #{hashtag.name}{' '}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CARROSSEL */}
                                <div className="col-span-10 row-span-1 ">
                                    <Carousel>
                                        {post.images.map((image, index) => (
                                            <img key={index} src={image} />
                                        ))}
                                    </Carousel>
                                </div>

                                <div className="col-span-8 row-span-1 mb-5">
                                    <div className="flex flex-row items-center justify-between mt-5">
                                        <span className="flex flex-row">
                                            <img
                                                src={Comments}
                                                className="mr-2"
                                            />{' '}
                                            {post.commentsCounter}{' '}
                                        </span>
                                        <span className="flex flex-row">
                                            <img
                                                src={Hearts}
                                                className="mr-2"
                                            />{' '}
                                            {post.likesCounter}{' '}
                                        </span>
                                        <span className="flex flex-row">
                                            <img
                                                src={Share2}
                                                className="mr-2"
                                            />{' '}
                                            {post.sharesCounter}{' '}
                                        </span>
                                        <span className="flex flex-row">
                                            <img
                                                src={Downloads}
                                                className="mr-2"
                                            />{' '}
                                            {post.downloadsCounter}{' '}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-9 row-span-1">
                                    <form onSubmit={handleSubmit(comment)}>
                                        <textarea
                                            placeholder="  Escreva seu comentário..."
                                            {...register('comment', {})}
                                            className="w-full h-72 m-0 md:h-36"
                                        />
                                        <button
                                            className="bg-blue-700 text-white font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-auto mb-5 ease-linear transition-all duration-150 mt-5"
                                            type="submit"
                                        >
                                            <span className="flex">
                                                <CheckIcon className="w-6 mr-2" />
                                                <span>Publicar</span>
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            {comments.map(comment => (
                                // {
                                //     "content": "Comentário pro post",
                                //     "createdAt": "2022-05-16T23:31:36.521Z",
                                //     "user": {
                                //       "id": 15,
                                //       "name": "Luan Rodrigues Petruitis",
                                //       "username": "luanpetruitis",
                                //       "email": "luanpetruitis@gmail.com",
                                //       "profilePicture": null
                                //     }
                                //   }
                                <div
                                    key={comment.id}
                                    className="row-span-1 border grid grid-cols-12"
                                >
                                    <div className="ml-2 md:ml-0  col-span-2 row-span-6">
                                        <div className="flex items-center justify-center mt-5">
                                            {' '}
                                            <div className="border-2 rounded-full">
                                                {' '}
                                                <img
                                                    src={
                                                        comment.user
                                                            .profilePicture
                                                    }
                                                    className="rounded-full w-16"
                                                ></img>{' '}
                                            </div>{' '}
                                        </div>
                                    </div>

                                    <div className=" col-span-10 row-span-2 flex justify-self-start md:mt-5 md:mr-5">
                                        <div className="flex items-center justify-start mt-5 ml-2">
                                            <span className="text-base md:text-xl">
                                                {' '}
                                                {comment.user.name}{' '}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-start mt-5 ml-2">
                                            <span className="text-sm md:text-lg">
                                                {' '}
                                                @{comment.user.username}{' '}
                                            </span>
                                        </div>
                                        <div className="hidden md:flex items-center justify-start mt-5 ml-2">
                                            <span className="text-xs md:text-lg">
                                                {formatDate(comment.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-9 row-span-1 ">
                                        <div className="flex items-center justify-start mt-5 ml-2">
                                            <span className="text-sm whitespace-pre-line break-all">
                                                {comment.content}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* DIREITA -  PESQUISA DE ASSUNTOS E EM ALTA */}
                <div className="hidden md:grid col-span-4 border-t-4 gap-5">
                    <div className="row-auto flex justify-center items-center mt-2">
                        <input
                            type="text"
                            placeholder="      Pesquisar no Anota Aí"
                            className="input border-2 rounded-full w-11/12 h-16"
                        ></input>
                    </div>

                    <div className="row-auto flex justify-center items-start">
                        <div className="border-2 rounded-3xl w-11/12 h-64"></div>
                    </div>

                    <div className="row-auto flex justify-center items-start text-center">
                        <div className="border-2 rounded-3xl w-11/12 h-64"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
