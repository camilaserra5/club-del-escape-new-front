import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-stone-800 border-orange-600 px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/#" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Club Del Escape Logo"
          />
          <span className="text-white self-center text-xl font-semibold whitespace-nowrap">
            Club del escape
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            type="button"
            className="focus:ring-orange-100 text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
          >
            Reservar
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-500 hover:bg-gray-700 focus:ring-gray-600 inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            !isOpen ? "hidden" : ""
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  border-gray-700">
            <li>
              <a
                href="/juegos"
                className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                Juegos
              </a>
            </li>
            <li>
              <a
                href="/eventos"
                className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                Eventos
              </a>
            </li>
            <li>
              <a
                href="/encontranos"
                className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                Encontranos
              </a>
            </li>
            <li>
              <a
                href="/gift-card"
                className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                Gift Card
              </a>
            </li>
            <li>
              <a
                href="/faqs"
                className="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
