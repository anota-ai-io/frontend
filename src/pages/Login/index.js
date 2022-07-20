import { React } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from 'nookies';
import { showNotification } from '../../utils/notification';

const loginSchema = yup
    .object({
        email: yup
            .string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
        password: yup
            .string()
            .min(6, 'Minimo de 6 caracteres')
            .required('Senha obrigatória'),
    })
    .required();

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const signIn = async data => {
    await fetch("https://anotaifsp.herokuapp.com/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("=====================")
        console.log(response.status)
        if (response.status == 'error') {
          showNotification({
            message: response.message,
            type: 'error',
            position: 'top-right',
          });
          return
        }

        setCookie(undefined, 'anotaai.token', response.response.accessToken, {
          maxAge: 60 * 60 * 12 * 1, // 1 hour
        });
        setCookie(undefined, 'anotaai.refreshToken', response.response.refreshToken, {
          maxAge: 60 * 60 * 12 * 1, // 1 hour
        });

        navigate("/feed");
      })
      .catch(err => {
        console.log(err)
        showNotification({
          message: err,
          type: 'error',
          position: 'top-right',
        });
      })

  }

  return (
    <>
      <div className="grid bg-blue-900 h-screen justify-items-center content-center">
        <div className="w-full max-w-sm mt-12">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(signIn)}>
            <div className="my-4">
              <h3 className="text-base font-medium text-gray-500 hover:text-gray-900">
                Realizar Login
              </h3>
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
                {...register("email")}
              />
              {formState.errors.email?.message ? (
                <span className="text-red-500 text-sm">{formState.errors.email.message}</span>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Senha"
                {...register("password")}
              />
              {formState.errors.password?.message ? (
                <span className="text-red-500 text-sm">{formState.errors.password.message}</span>
              ) : null}
              {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 flex items-center justify-between hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {formState.isSubmitting ? (
                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 mr-1 rounded-full text-gray-300" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                ) : null}
                Entrar
              </button>
              <div className="grid">
                <Link
                  to="/register"
                  className="mb-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Criar nova conta
                </Link>
                <Link
                  to="/register"
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">&copy;2022 Anota Aí.</p>
        </div>
      </div>
    </>
  );
}
