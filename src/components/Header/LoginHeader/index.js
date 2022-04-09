import { React } from "react";
import { Link } from "react-router-dom";

import { Popover } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";

import CompanyLogo from "../../../assets/icon.png";

export default function LoginHeader() {
  return (
    <>
      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img className="h-8 w-auto sm:h-10" src={CompanyLogo} alt="" />
              </a>
              <div className="flex justify-between items-center pl-6 md:justify-start md:space-x-10">
                <h1 className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Anota Aí
                </h1>
              </div>
            </div>

            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                <Link to="/">Página Inicial</Link>
              </a>
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a
                href="#"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Link to="/register">Criar nova Conta</Link>
              </a>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
}
