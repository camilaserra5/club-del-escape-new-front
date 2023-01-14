import { useState, useEffect } from "react";

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
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-amber-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{props.title}</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto flex items-center">
                  <img
                    src={"/juegos/" + props.img}
                    className="my-4 h-36 m-2"
                    alt="juegos"
                  />
                  <p className="my-4 m-2 text-amber-100 text-lg leading-relaxed">
                    {props.description}
                  </p>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
