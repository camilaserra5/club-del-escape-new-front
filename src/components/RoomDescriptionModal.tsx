import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChild,
  faStar,
  faClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

interface Game {
  title: string;
  img: string;
  productId: string;
  local: string;
  participantsMin: number;
  participantsMax: number;
  difficulty: number;
  ageLimit: number;
  description: string;
}

const RoomDescriptionModal = (props: Game) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        (event.target as Element).closest(".relative") === null
      ) {
        setShowModal(false);
      }
    };

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showModal]);

  return (
    <>
      <button
        type="button"
        className="border-red-500 text-red-500 hover:text-white hover:bg-red-800 focus:ring-orange-800 border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        onClick={() => setShowModal(true)}
      >
        Más información
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-6 max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-stone-700 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-orange-500 rounded-t">
                  <h3 className="text-xl md:text-3xl font-semibold">
                    {props.title}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto flex items-center">
                  <img
                    src={"/juegos/" + props.img}
                    className="my-4 h-36 m-2"
                    alt="juegos"
                  />
                  <p className="my-4 m-2 text-white text-sm md:text-lg leading-relaxed">
                    {props.description}
                  </p>
                </div>
                <div className="flex flex-col align-center justify-center items-center mb-4">
                  <div>
                    <div className="flex flex-row flex-initial w-auto">
                      <div>
                        <FontAwesomeIcon
                          icon={faUsers}
                          className="ml-2 mr-3 text-amber-300"
                        />
                      </div>
                      <div> Participantes: 2 a 6</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row flex-initial w-auto">
                      <div className="">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="ml-2 mr-3 text-amber-300"
                        />
                      </div>
                      <div>Dificultad: 8/10</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row flex-initial w-auto">
                      <div className="">
                        <FontAwesomeIcon
                          icon={faChild}
                          className="ml-2 mr-3 text-amber-300"
                        />
                      </div>
                      <div>Edad: 9+</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row flex-initial w-auto">
                      <div >
                        <FontAwesomeIcon
                          icon={faClock}
                          className="ml-2 mr-3 text-amber-300"
                        />
                      </div>
                      <div> Tiempo de juego: 60 minutos</div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-orange-500 rounded-b">
                  <button
                    className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <a href={"/book/" + props.local.toLowerCase()}>Reservar</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default RoomDescriptionModal;
