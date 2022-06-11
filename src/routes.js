import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

const ProtectedRoute = React.lazy(() => import('./components/ProtectedRoute'));
const LoggedOutRoute = React.lazy(() => import('./components/LoggedOutRoute'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Feed = React.lazy(() => import('./pages/Feed'));
const Perfil = React.lazy(() => import('./pages/Perfil'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Post = React.lazy(() => import('./pages/Post'));

const FeedLuan = React.lazy(() => import('./pages/FeedDebug/Luan'));
const FeedRhenan = React.lazy(() => import('./pages/FeedDebug/Rhenan'));

export default function Routes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<></>}>
                <Switch>
                    <Route
                        path="/"
                        element={<LoggedOutRoute element={Home} />}
                    />
                    <Route
                        path="/register"
                        element={<LoggedOutRoute element={Register} />}
                    />
                    <Route
                        path="/login"
                        element={<LoggedOutRoute element={Login} />}
                    />

                    {/* Rotas Privadas */}
                    <Route
                        path="/feed"
                        element={
                            <ProtectedRoute
                                component={Feed}
                                redirect="/login"
                            />
                        }
                    />

                    <Route
                        path="/post/:id"
                        element={
                            <ProtectedRoute
                                component={Post}
                                redirect="/login"
                            />
                        }
                    />

                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoute
                                component={Chat}
                                redirect="/login"
                            />
                        }
                    />

                    <Route
                        path="/perfil/:username"
                        element={
                            <ProtectedRoute
                                component={Perfil}
                                redirect="/login"
                            />
                        }
                    />

                    {/* Debug de Feed */}
                    <Route
                        path="/feed/luan"
                        element={
                            <ProtectedRoute
                                component={FeedLuan}
                                redirect="/login"
                            />
                        }
                    />
                    <Route
                        path="/feed/rhenan"
                        element={
                            <ProtectedRoute
                                component={FeedRhenan}
                                redirect="/login"
                            />
                        }
                    />

                    {/* Página de Not Found - 404 */}
                    <Route path="/*" element={<NotFound />} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}
