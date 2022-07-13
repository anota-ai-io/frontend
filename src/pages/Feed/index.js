/* eslint-disable jsx-a11y/alt-text */
import React, {
    useDebugValue,
    useEffect,
    useState,
    useContext,
    useRef,
} from 'react';

import "./style.css"

// import async ComponentSkeleton from '../../components/Skeleton/index.js';
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
import moreHorizontal from '../../assets/more-horizontal.svg'
import { LogoutIcon } from '@heroicons/react/outline';

import { Link, useNavigate } from 'react-router-dom';

import Image from '../../assets/image.svg';

import { useForm } from 'react-hook-form';

import AuthContext from '../../contexts/auth';

export default function Feed() {
    const navigate = useNavigate();
    const UserContext = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false); 
    const [showDeletePostModal, setShowDeletePostModal] = useState(false); 

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
                setLoadPotsState(true);
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const handleDeletePosts = async postId => {
        const cookies = parseCookies();
        await fetch(`https://anotaifsp.herokuapp.com/api/post/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${cookies['anotaai.token']}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setShowDeletePostModal(false);
                setLoadPotsState(true);
            })
            .catch(err => {
                console.log(err.message);
            });

    }

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
        console.log(loadPostsState)
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

    async function logOut() {
        await destroyCookie(undefined, 'anotaai.token');
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
                        className="flex items-center justify-center mt-3 md:mt-6 cursor-pointer"
                        onClick={() =>
                            navigate(`/perfil/${post.user.username}`)
                        }
                    >
                        {' '}
                        <div className="rounded-full">
                            {' '}
                            <img
                                src={post.user.profilePicture}
                                className="rounded-full w-14"
                            ></img>{' '}
                        </div>{' '}
                    </div>

                </div>

                <div
                    className="cursor-pointer col-span-9 row-span-2 flex justify-self-start md:mt-5 md:mr-5"
                    onClick={() => navigate(`/perfil/${post.user.username}`)}
                >
                    <div className="flex items-center justify-start mt-5 ml-2">
                        <span className="font-bold text-sm md:text-base">
                            {' '}
                            {post.user.name}{' '}
                        </span>
                    </div>
                    <div className="flex items-center justify-start mt-5 ml-2">
                        <span className="text-xs md:text-sm">
                            {' '}
                            @{post.user.username}{' '}
                        </span>
                    </div>
                    <div className="hidden md:flex items-center justify-start mt-5 ml-2">
                        <span className="font-extralight text-gray-400 text-xs md:text-sm">
                            {formatDate(post.createdAt)}
                        </span>
                    </div>
                    
                </div>

                <div onClick={() => setShowDeletePostModal(true)} className='flex justify-self-start col-span-1 row-span-2 mt-5 md:mr-5'>
                    <img src={moreHorizontal} />
                </div>

                {showDeletePostModal ? (
                    <Modal closeModal={closeModal} >    
                        <div className='flex flex-col border justify-evenly items-center h-96'>
                            
                            <div>
                                <button className='bg-blue-500 p-2 w-64 h-12 text-white font-bold'>EDITAR</button>
                            </div>
                            <div>
                                <button className='bg-yellow-500 p-2 w-64 h-12 text-white font-bold'>DENUNCIAR</button>
                            </div>
                            <div>
                                <button onClick={() => handleDeletePosts(post.id)} className='bg-red-500 p-2 w-64 h-12 text-white font-bold'>EXCLUIR</button>
                            </div>
                            <div>
                                <button onClick={() => setShowDeletePostModal(false)} className='bg-green-500 p-2 w-64 h-12 text-white font-bold'>CANCELAR</button>
                            </div>
                        </div>
                    </Modal>
                ) : null}

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
                    <div className={ 
                            loadPostsState
                                ? 'animate-pulse flex space-x-4'
                                : 'flex items-center justify-center ml-2 mt-6 mr-6 mb-6'
                        }
                    >
                        {loadPostsState ? (
                            <div className="h-96 w-full mr-8 bg-slate-200"></div>
                        ) : (
                            <img
                                className="mt-2 w-full"
                                src={post.images[0]}
                            />
                        )}
                    </div>
                </div>

                <div className="col-span-8 row-span-1 mb-5">
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
            <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                {/* ESQUERDA - MENU E USUÁRIO */}
                <div
                    className={
                        menuMobileState
                            ? 'grid col-span-2 animacao-padrao'
                            : 'hidden md:grid col-span-2'
                    }
                >
                    <div className="flex flex-row ml-2 mt-2 justify-between md:ml-0 md:row-span-1 md:block md:p-14 lg:p-5">
                        <img
                            src={Logo}
                            className="hidden md:block lg:block"
                        />
                        <img
                            src={LogoIcon}
                            className="block md:hidden lg:hidden"
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
                                <ul className="flex flex-col justify-around pl-2 md:pl-16 lg:pl-5 ">
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


                    <div className="mt-5 p-2 md:p-6">
                        
                        <button
                            className="bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 md:px-3 md:py-1  lg:px-6 lg:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animacao-padrao"
                            type="button"
                            onClick={() => setShowModal(true)}
                        >
                            Publicação
                        </button>

                        {showModal ? (
                            <Modal closeModal={closeModal} >
                                
                                <form
                                    onSubmit={handleSubmit(handleSubmitPosts)}
                                    className="justify-center text-center"
                                >
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                       
                                        <button
                                            className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={closeModal}
                                        >
                                            <span className="text-black opacity-50">
                                                <img src={xClose}/>
                                            </span>
                                        </button>
                                    
                                    </div>

                                    <div className="relative flex-auto p-5 border-b">
                                        
                                        <textarea
                                            placeholder="  Escreva sua públicação..."
                                            {...register('content', {})}
                                            className="w-full h-64 m-0 md:h-32"
                                        />

                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-between p-6 border-solid border-slate-200 rounded-b">
                                        

                                        <div className="flex flex-row justify-center md:justify-start m-5">
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

                                        <button
                                            className="bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none m-5 md:mr-1 md:mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Publicar
                                        </button>
                                    </div>
                                </form>

                            </Modal>
                        ) : null}
                    </div>

                    <div className="flex justify-between items-center">
                        <Link
                            to={`/perfil/${UserContext.username}`}
                            className="flex flex-col sm:items-start md:items-center lg:items-start align-bottom "
                        >
                            <div className="row-span-1 flex flex-row  p-2 items-center">
                                <div className="md:ml-0 col-span-2 row-span-6 mr-2 m">
                                    <div className="flex items-center justify-center">
                                        <div className="rounded-full">
                                            <img
                                                src={UserContext.profilePicture}
                                                className="rounded-full w-16"
                                            ></img>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg md:text-xs">
                                        {UserContext.name}
                                    </h2>
                                    <h3 className="text-base md:text-xs">
                                        {UserContext.username}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                        <div className="cursor-pointer" onClick={logOut}>
                            <LogoutIcon className="w-8 h-8 mr-2 md:w-4 md:h-4 md:mr-2" />
                        </div>
                    </div>

                    
                </div>

                {/* CENTRO - PUBLICAÇÕES E POSTS */}
                <div
                    className={
                        menuMobileState
                            ? 'hidden'
                            : 'col-span-1 md:col-span-6 h-screen overflow-y-scroll classe-complementar-feed animacao-padrao'
                    }
                >
                    {/* MENU MOBILE */}
                    <div
                        className="md:hidden row-span-1 border-b-2 p-5 mt-5 "
                        onClick={setMenuMobile}
                    >
                        <img src={Menu} className=""></img>
                    </div>

                    {/* LISTA DE PUBLICACOES */}
                    {renderPublications()}
                </div>

                {/* DIREITA -  PESQUISA DE ASSUNTOS E EM ALTA */}
                <div className="hidden md:grid col-span-4 gap-5">
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
