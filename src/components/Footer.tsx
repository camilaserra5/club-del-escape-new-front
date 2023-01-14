import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 bg-stone-800">
      <span className="text-sm sm:text-center text-gray-400">
        © 2023{" "}
        <a href="/#" className="hover:underline">
          Club del Escape Buenos Aires
        </a>
      </span>
      <div className="flex flex-wrap items-center mt-3 text-sm text-gray-400 sm:mt-0">
        <div className="mr-4">
          <div className="block">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="text-amber-600" />
            <span className="ml-2">Sede Palermo: Av Cordoba 4265</span>
          </div>
          <div className="block">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="text-amber-600" />
            <span className="ml-2">Sede Colegiales: Giribone 1041</span>
          </div>
        </div>
        <div className="mr-4">
          <FontAwesomeIcon icon={faPhoneAlt} className="text-amber-600" />
          <span className="ml-2">011-2255-4004</span>
        </div>
        <div className="mr-4">
          <FontAwesomeIcon icon={faEnvelope} className="text-amber-600" />
          <span className="ml-2">buenosaires@clubdelescape.com</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
