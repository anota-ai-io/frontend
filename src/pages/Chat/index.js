import React from "react";

import User from '../../assets/user.svg'
import User1 from '../../assets/user1.svg'
import Voltar from '../../assets/voltar.svg'

import { Link } from "react-router-dom";


export default function Chat() {
    return (
        <>
            <div className="h-screen w-screen overflow-hidden">
                <div className="grid grid-cols-12 border ">
                    
                    <div className="col-span-12 md:col-span-4 border h-screen overflow-y-scroll ">

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center justify-between">
                                <Link
                                    to="/feed"
                                >
                                    <img src={Voltar} className="p-2"></img>
                                </Link>
                                <span className=""><h1 className="font-semibold">CHAT</h1></span>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                        <div className="row-span-1 border">
                            <span className="flex p-1 m-2 items-center">
                                <div className="flex-none border-2 rounded-full"><img src={User1} className="p-4"></img></div>
                                <span className="flex-1 ml-2">Fulano</span>
                                <div className="flex-1 w-10/12 flex justify-end"><div className="rounded-full h-3 w-3 bg-green-500"></div></div>
                            </span>
                        </div>

                    </div>

                    <div className="hidden md:col-span-8 border">
                        teste
                    </div>

                </div>
            </div>
        
        </>
    )
}