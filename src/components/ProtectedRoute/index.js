import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../contexts/auth";

export default function AuthRoute({
  requireAuth,
  component: Component,
  redirect,
  ...rest
}) {
  const [authChecked, setAuthChecked] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);

  const [user, setUser] = useState(null);

  // Verifica se existe um usuário autenticado

  // Escreve rfunção para interpretar o Token JWT

  // useEffect(() => {
  //   Auth.currentAuthenticatedUser()
  //     .then((user) => {
  //       // console.log("Usuario autenticado:");
  //       // console.log(user);
  //       setUser(user);
  //       setAuthStatus(true);
  //       setAuthChecked(true);
  //     })
  //     .catch((err) => {
  //       setAuthStatus(false);
  //       setAuthChecked(true);
  //     });
  // }, []);

  return (
    <>
      {authChecked && (
        <AuthContext.Provider value={user}>
          <Route
            {...rest}
            render={(props) =>
              authStatus === requireAuth ? (
                <Component {...props} />
              ) : (
                <Redirect
                  exact
                  to={{ pathname: redirect, state: { from: props.location } }}
                />
              )
            }
          />
        </AuthContext.Provider>
      )}
    </>
  );
}
