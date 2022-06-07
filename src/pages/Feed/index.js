/* eslint-disable jsx-a11y/alt-text */
import React, { useDebugValue, useEffect, useState } from 'react';

// import ComponentSkeleton from '../../components/Skeleton/index.js';
import { parseCookies } from 'nookies';
import Modal from '../../components/Modal';

import LogoIcon from '../../assets/logo_icon.svg';
import Logo from '../../assets/logo.png';
import User1 from '../../assets/user1.svg';
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

import { Link, useNavigate } from 'react-router-dom';

export default function Feed() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [menuMobileState, setMenuMobileState] = useState(false);
    const [loadPostsState, setLoadPotsState] = useState(true);

    const [computedLikeState, setComputedLikeState] = useState({});
    const [likes, setLikes] = useState({});

    useEffect(() => {
        const cookies = parseCookies();
        // console.log(cookies['anotaai.token'])
        fetch('https://anotaifsp.herokuapp.com/api/feed', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies['anotaai.token']}`,
            },
        })
            .then(response => response.json())
            .then(response => {
                setPosts(response.response.posts);
            })
            .then(response => {
                setLoadPotsState(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [loadPostsState]);

    useEffect(() => {
        for (const post of posts) {
            let likeHold = likes;
            likeHold[post.id] = post.likesCounter;
            setLikes(likeHold);
        }
    }, [posts]);

    function setMenuMobile() {
        setMenuMobileState(!menuMobileState);
    }

    const computeLikePost = async id => {
        const cookies = parseCookies();
        // console.log(cookies['anotaai.token']);
        await fetch('https://anotaifsp.herokuapp.com/api/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies['anotaai.token']}`,
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then(response => response.json())
            .then(response => {
                let likesHold = likes;
                likesHold[response.response.post.id] =
                    response.response.post.likesCounter;
                setLikes(likesHold);
            })
            .catch(err => {
                console.log(err);
            });
    };

    function formatDate(date) {
        const data = new Date(date).toLocaleString();
        return data;
    }

    function renderPublications() {
        return posts.map(post => (
            <div
                key={post.id}
                className="row-span-1 border grid grid-cols-12"
                onClick={() => navigate(`/post/${post.id}`)}
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

                <div className="col-span-10 row-span-1 ">
                    <div
                        className={
                            loadPostsState
                                ? 'animate-pulse flex space-x-4'
                                : 'flex items-center justify-center mt-5 ml-2'
                        }
                    >
                        {loadPostsState ? (
                            <div className="h-96 w-full mr-8 bg-slate-200"></div>
                        ) : (
                            <img
                                className="mt-2 w-full mr-8"
                                src={post.images[0]}
                            />
                        )}
                    </div>
                </div>

                <div className="col-span-8 row-span-1 mb-5">
                    <div className="flex flex-row items-center justify-between mt-5">
                        <span className="flex flex-row">
                            <img src={Comments} className="mr-2" />{' '}
                            {post.commentsCounter}{' '}
                        </span>
                        <span className="flex flex-row">
                            <img
                                src={Hearts}
                                className="mr-2"
                                onClick={() => computeLikePost(post.id)}
                            />{' '}
                            {likes[post.id]}{' '}
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
            </div>
        ));
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
                    {renderPublications()}
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
