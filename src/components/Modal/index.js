import React, { useState, useRef } from 'react';

import Image from '../../assets/image.svg';
import Smile from '../../assets/smile.svg';
import Vector from '../../assets/Vector.svg';

import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';

export default function Modal({closeModal, children}) {
    return (
        <>
            <div className="flex flex-col justify-center items-center overflow-hidden inset-0 z-50 outline-none focus:outline-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  md:h-4/6 md:w-3/5 w-full h-full">
                <div className="border-0 w-full rounded-lg shadow-lg bg-white p-2 flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={closeModal}></div>
        </>
    );
}
