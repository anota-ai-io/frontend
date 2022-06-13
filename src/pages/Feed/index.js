/* eslint-disable jsx-a11y/alt-text */
import React, {
    useDebugValue,
    useEffect,
    useState,
    useContext,
    useRef,
} from 'react';

// import ComponentSkeleton from '../../components/Skeleton/index.js';
import { parseCookies, destroyCookie } from 'nookies';
import Modal from '../../components/Modal';

import LogoIcon from '../../assets/logo_icon.svg';
import Logo from '../../assets/logo.png';
import Home from '../../assets/home.svg';

import Menu from '../../assets/menu.svg';

import Comments from '../../assets/message-circle.svg';
import Downloads from '../../assets/download.svg';
import Hearts from '../../assets/heart.svg';
import HeartSelected from '../../assets/heart_selected.svg';
import Share2 from '../../assets/share-2.svg';
import xClose from '../../assets/x.svg';
import { LogoutIcon } from '@heroicons/react/outline';

import { Link, useNavigate } from 'react-router-dom';

import Image from '../../assets/image.svg';

import { useForm } from 'react-hook-form';

import AuthContext from '../../contexts/auth';

export default function Feed() {
    const navigate = useNavigate();
    const UserContext = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

    const [posts, setPosts] = useState([]);
    const [menuMobileState, setMenuMobileState] = useState(false);
    const [loadPostsState, setLoadPotsState] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [images, setImages] = useState([]);

    const handleSubmitPosts = async data => {
        const cookies = parseCookies();
        const formData = new FormData();
        formData.append('content', data.content);
        formData.append('hashtags', JSON.stringify(['hastagh1', 'hasshtag2']));
        images.forEach(img => formData.append('images', img));

        await fetch('https://anotaifsp.herokuapp.com/api/post', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${cookies['anotaai.token']}`,
            },
            body: formData,
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
        filesXmlArray.forEach(file => formData.append('files', file));
        console.log(filesXmlArray);
        setImages(filesXmlArray);
    };

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
                console.log(response.response.posts);
                setPosts(response.response.posts);
            })
            .then(response => {
                setLoadPotsState(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, [loadPostsState]);

    function setMenuMobile() {
        setMenuMobileState(!menuMobileState);
    }

    function closeModal() {
        setShowModal(false);
    }

    function logOut() {
        destroyCookie(undefined, 'anotaai.token');
        navigate('/login');
    }

    const computeLikePost = async post => {
        const cookies = parseCookies();
        const id = post.id;
        let method = 'POST';

        if (post.liked) {
            method = 'DELETE';
        }
        // console.log(cookies['anotaai.token']);
        const response = await fetch(
            'https://anotaifsp.herokuapp.com/api/like',
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies['anotaai.token']}`,
                },
                body: JSON.stringify({
                    postId: id,
                }),
            },
        );

        const postData = await response.json();
        if (postData.status === 'ok') {
            const postIndex = posts.findIndex(post => post.id === id);

            if (postIndex >= 0) {
                const allPosts = [...posts];

                allPosts[postIndex] = {
                    ...allPosts[postIndex],
                    likesCounter: !allPosts[postIndex].liked
                        ? allPosts[postIndex].likesCounter + 1
                        : allPosts[postIndex].likesCounter - 1,
                    liked: !allPosts[postIndex].liked,
                };

                setPosts(allPosts);
            }
        }
    };

    function formatDate(date) {
        const data = new Date(date).toLocaleString();
        return data;
    }

    function renderPublications() {
        return posts.map(post => (
            <div key={post.id} className="row-span-1 border grid grid-cols-12">
                <div className="ml-2 md:ml-0 col-span-2 row-span-6">
                    <div
                        className="flex items-center justify-center mt-5 cursor-pointer"
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
                                className="text-sm text-gray-400 whitespace-pre-line break-all mr-2"
                            >
                                {hashtag.name}
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
                                : 'flex items-center justify-center m-6'
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
                            {post.liked ? (
                                <img
                                    src={HeartSelected}
                                    className="mr-2 cursor-pointer"
                                    onClick={() => computeLikePost(post)}
                                />
                            ) : (
                                <img
                                    src={Hearts}
                                    className="mr-2 cursor-pointer"
                                    onClick={() => computeLikePost(post)}
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
            </div>
        ));
    }

    return (
        <>
            <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-10 overflow-hidden">
                {/* ESQUERDA - MENU E USUÁRIO */}
                <div
                    className={
                        menuMobileState
                            ? 'col-span-2 animacao-padrao'
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

                    <div className="flex justify-between items-center">
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
                        <div className="cursor-pointer" onClick={logOut}>
                            <LogoutIcon className="w-11 h-11 mr-4" />
                        </div>
                    </div>

                    <div className="p-6">
                        <button
                            className="bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 md:px-3 md:py-1  lg:px-6 lg:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animacao-padrao"
                            type="button"
                            onClick={() => setShowModal(true)}
                        >
                            Publicação
                        </button>
                        {showModal ? (
                            <Modal closeModal={closeModal}>
                                <form
                                    onSubmit={handleSubmit(handleSubmitPosts)}
                                    className="justify-center text-center"
                                >
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Nova Publicação
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
                                            placeholder="  Escreva sua públicação..."
                                            {...register('content', {})}
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
                                                multiple
                                            />
                                            <span>
                                                {images.length > 1
                                                    ? images.length + ' imagens'
                                                    : images.length +
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
                <div className="hidden md:grid col-span-2 border-t-4 gap-5">
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
