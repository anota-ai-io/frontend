import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  const signUp = async data => {
    if (data.password === data.confirmPassword) {
      await fetch("https://anotaifsp.herokuapp.com/api/user", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "name": data.name,
          "email": data.email,
          "password": data.password
        })
      })
        .then(response => response.json())
        .then(data => {
          navigate("/login");
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      alert("A senha de confirmação está diferente da senha.")
    }

  }

  return (
    <>
      <div class="grid h-screen bg-blue-900 justify-items-center content-center">
        <div class="w-full max-w-sm mt-12">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(signUp)}>
            <div class="my-4">
              <h3 className="text-base font-medium text-gray-500 hover:text-gray-900">
                Realizar Cadastro
              </h3>
            </div>

            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Nome
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Nome"
                {...register("name")}
              />
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
                {...register("email")}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Senha
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Senha"
                {...register("password")}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="confirm-password"
              >
                Confirmar Senha
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type="password"
                placeholder="Confirmar Senha"
                {...register("confirmPassword")}
              />
              {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {formState.isSubmitting ? (
                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 mr-1 rounded-full text-gray-300" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                ) : null}
                Cadastrar
              </button>
              <Link
                to="/login"
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Ir para o Login
              </Link>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">&copy;2022 Anota Aí.</p>
        </div>
      </div>
    </>
  );
}
