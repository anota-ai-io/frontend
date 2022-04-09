import { React } from "react";
import { Link } from "react-router-dom";

import LoginHeader from "../../components/Header/LoginHeader";

export default function Login() {
  return (
    <>
      <LoginHeader />

      <div class="grid justify-items-center content-center">
        <div class="w-full max-w-sm mt-12">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="my-4">
              <h3 className="text-base font-medium text-gray-500 hover:text-gray-900">
                Realizar Login
              </h3>
            </div>

            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Email"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Senha
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Senha"
              />
              {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Entrar
              </button>
              <div class="grid">
                <Link
                  to="/register"
                  class="mb-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Criar nova conta
                </Link>
                <Link
                  to="/register"
                  class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">&copy;2022 Anota Aí.</p>
        </div>
      </div>
    </>
  );
}
