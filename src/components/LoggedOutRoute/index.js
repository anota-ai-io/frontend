import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { parseCookies } from 'nookies';

import jwt_decode from 'jwt-decode';

import AuthContext from '../../contexts/auth';

export default function LoggedOutRoute({
    element: Component,
    redirect = '/feed',
}) {
    const [user, setUser] = useState(null);

    const [authenticated, setAuthenticated] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const cookies = parseCookies();

        const accessToken = cookies['anotaai.token'];

        try {
            if (accessToken !== '') {
                const decoded = jwt_decode(accessToken);
                setUser(decoded);
                setAuthenticated(true);
                setChecked(true);
            } else {
                setAuthenticated(false);
            }
        } catch (error) {
            setChecked(true);
            setAuthenticated(false);
            console.log('Token Inválido');
        }
    }, []);

    return (
        <>
            {checked &&
                (authenticated ? (
                    <Navigate to={redirect} />
                ) : (
                    <AuthContext.Provider value={user}>
                        <Component />
                    </AuthContext.Provider>
                ))}
        </>
    );
}
