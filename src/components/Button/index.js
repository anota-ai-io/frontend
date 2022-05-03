import React from 'react';
import * as FontAwesome from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';
import styles from './Button.module.css';



export function Button({
    children,
    iconName,
    isLoading,
    className = `
        h-8
        md:h-12
        w-12
        md:w-32
        shadow-md
        flex
        flex-row
        space-x-3
        items-center
        justify-center
        font-light
        px-4
        py-2
        text-gray-50
        rounded-md
        tracking-wide
    `,
    colorClass = `
        bg-green-800
        hover:bg-green-900
    `,
    iconClass,
    ...rest
}) {
    return (
        <button
            className={`${className} ${colorClass} ${
                isLoading
                    ? `
                        text-black
                        hover:bg-gray-400
                        bg-gray-400
                        border
                        border-black
                        font-bold
                    `
                    : null
            }`}
            {...rest}
            disabled={isLoading}
        >
            {isLoading ? (
                <ImSpinner9 className={`${styles.spinner} h-3 w-3 mx-2`} />
            ) : null}

            {iconName && (
                <div className="flex justify-center items-center">
                    {React.createElement(FontAwesome[iconName], {
                        className: iconClass,
                    })}
                </div>
            )}
            {children && <span className="hidden md:block">{children}</span>}
        </button>
    );
}
