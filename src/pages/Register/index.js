import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { showNotification } from '../../utils/notification';

const registerUserSchema = yup
    .object({
        email: yup
            .string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
        password: yup
            .string()
            .min(9, 'Minimo de 9 caracteres')
            .required('Senha obrigatória'),
    })
    .required();

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(registerUserSchema),
    });

    const signUp = async data => {
        console.log(data);
        if (data.password === data.confirmPassword) {
            await fetch('https://anotaifsp.herokuapp.com/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 'ok') {
                        navigate('/login');
                    } else {
                        console.log(data.message);
                        showNotification({
                            message: data.message,
                            type: 'error',
                            position: 'top-right',
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            alert('A senha de confirmação está diferente da senha.');
        }
    };

    return (
        <>
            <div className="grid h-screen bg-blue-900 justify-items-center content-center">
                <div className="w-full max-w-sm mt-10">
                    <form
                        className="bg-white shadow-md rounded px-8 pt-3 pb-8 mb-4"
                        onSubmit={handleSubmit(signUp)}
                    >
                        <div className="my-4">
                            <h3 className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Realizar Cadastro
                            </h3>
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Nome
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Nome"
                                {...register('name')}
                            />
                            {formState.errors.email?.message ? (
                                <span className="text-red-500 text-sm">
                                    {formState.errors.email.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Usuário
                            </label>
                            <div className="flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    @
                                </span>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="Usuário"
                                    {...register('username')}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="email"
                                placeholder="Email"
                                {...register('email')}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Senha
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Senha"
                                {...register('password')}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="confirm-password"
                            >
                                Confirmar Senha
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirm-password"
                                type="password"
                                placeholder="Confirmar Senha"
                                {...register('confirmPassword')}
                            />
                            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                {formState.isSubmitting ? (
                                    <div
                                        className="spinner-border animate-spin inline-block w-4 h-4 border-4 mr-1 rounded-full text-gray-300"
                                        role="status"
                                    >
                                        <span className="visually-hidden"></span>
                                    </div>
                                ) : null}
                                Cadastrar
                            </button>
                            <Link
                                to="/login"
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            >
                                Ir para o Login
                            </Link>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2022 Anota Aí.
                    </p>
                </div>
            </div>
        </>
    );
}
