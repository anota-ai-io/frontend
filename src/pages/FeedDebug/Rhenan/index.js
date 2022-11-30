/* eslint-disable jsx-a11y/alt-text */
import React, { useDebugValue, useEffect, useState, useContext } from 'react';

// import ComponentSkeleton from '../../components/Skeleton/index.js';
import { parseCookies } from 'nookies';
import Modal from '../../../components/Modal';

import LogoIcon from '../../../assets/logo_icon.svg';
import Logo from '../../../assets/logo.png';
import User1 from '../../../assets/user1.svg';
import Bell from '../../../assets/bell.svg';
import Globe from '../../../assets/globe.svg';
import Home from '../../../assets/home.svg';
import Mail from '../../../assets/mail.svg';
import PlusSquare from '../../../assets/plus-square.svg';

import Menu from '../../../assets/menu.svg';

import Comments from '../../../assets/message-circle.svg';
import Downloads from '../../../assets/download.svg';
import Hearts from '../../../assets/heart.svg';
import HeartSelected from '../../../assets/heart_selected.svg';
import Share2 from '../../../assets/share-2.svg';
import xClose from '../../../assets/x.svg';

import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../../../contexts/auth';

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16),
    );
}

export default function Feed() {
    const navigate = useNavigate();
    const UserContext = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [menuMobileState, setMenuMobileState] = useState(false);
    const [loadPostsState, setLoadPotsState] = useState(true);

    const [computedLikeState, setComputedLikeState] = useState({});
    const [likes, setLikes] = useState({});

    useEffect(() => {
        const cookies = parseCookies();
        // console.log(cookies['anotaai.token'])
        fetch(`${rocess.env.REACT_APP_API_URL}/api/debug/feed?amount=1000`, {
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
        let likeHold = likes;
        for (const post of posts) {
            likeHold[post.id] = {
                counter: post.likesCounter,
                liked: post.liked,
            };
            setLikes(likeHold);
        }
    }, [posts]);

    function setMenuMobile() {
        setMenuMobileState(!menuMobileState);
    }

    const computeLikePost = async id => {
        const cookies = parseCookies();
        let method = 'POST';

        if (likes[id] && likes[id].liked) {
            method = 'DELETE';
        }
        // console.log(cookies['anotaai.token']);
        await fetch(`${process.env.REACT_APP_API_URL}/api/like`, {
            method: method,
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

                likesHold[response.response.post.postId] = {
                    counter: response.response.post.likesCounter,
                    liked: method === 'POST' ? true : false,
                };

                setLikes({ ...likesHold });
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
            <div key={uuidv4()} className="row-span-1 border grid grid-cols-12">
                <div className="ml-2 md:ml-0 col-span-2 row-span-6">
                    <div
                        className="flex items-center justify-center mt-5"
                        onClick={() =>
                            navigate(`/perfil/${post.user.username}`)
                        }
                    >
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

                <div
                    className="cursor-pointer col-span-10 row-span-2 flex justify-self-start md:mt-5 md:mr-5"
                    onClick={() => navigate(`/perfil/${post.user.username}`)}
                >
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

                <div
                    className="col-span-9 row-span-1"
                    onClick={() => navigate(`/post/${post.id}`)}
                >
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

                <div
                    className="col-span-10 row-span-1"
                    onClick={() => navigate(`/post/${post.id}`)}
                >
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
                            {likes[post.id] && likes[post.id].liked ? (
                                <img
                                    src={HeartSelected}
                                    className="mr-2 cursor-pointer"
                                    onClick={() => computeLikePost(post.id)}
                                />
                            ) : (
                                <img
                                    src={Hearts}
                                    className="mr-2 cursor-pointer"
                                    onClick={() => computeLikePost(post.id)}
                                />
                            )}{' '}
                            {likes[post.id] && likes[post.id].counter}{' '}
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
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <Link
                        to={`/perfil/${UserContext.username}`}
                        className="flex flex-col sm:items-start md:items-center lg:items-start align-bottom "
                    >
                        <div className="row-span-1 flex flex-row  p-2 items-center">
                            <div className="md:ml-0 col-span-2 row-span-6 mr-4 m">
                                <div className="flex items-center justify-center">
                                    <div className="border-2 rounded-full">
                                        <img
                                            src={UserContext.profilePicture}
                                            className="rounded-full w-16"
                                        ></img>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-extrabold text-lg">
                                    {UserContext.name}
                                </h2>
                                <h3 className="text-base">
                                    {UserContext.username}
                                </h3>
                            </div>
                        </div>
                    </Link>

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
