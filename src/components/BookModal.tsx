import { useState, useEffect } from "react";
import slots from "../data/slots.json";
import data from "../data/data.json";
import { Link } from "react-router-dom";

type TextBooking = {
  text: string;
  slotId: string;
};

const BookModal = (props: TextBooking) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(quantity * 2);
  }, [quantity]);

  const handleChange = (event: number) => {
    console.log(slot);
    const value = Math.min(slot!.numSeatsAvailable, event);
    setQuantity(value);
  };

  const slot = slots.json.data.find((slot) => slot.eventId === props.slotId);
  const prod = data.find((p) => p.productId === slot?.productId);

  return (
    <>
      <button
        className="px-3 py-2 text-s font-medium text-white bg-orange-600 rounded-lg"
        onClick={() => setShowModal(true)}
      >
        {props.text}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {prod?.title + " - " + prod?.local}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-white text-lg leading-relaxed">
                    {slot?.startTime}
                  </p>
                  <p className="my-4 text-white text-lg leading-relaxed">
                    {slot?.startTime}
                  </p>

                  <div className="relative flex-auto flex justify-start">
                    <div className="my-4 leading-relaxed">
                      <label>Jugadores</label>
                    </div>
                    <div className="my-4 leading-relaxed ml-4">
                      <div className="flex items-center">
                        <button
                          className="bg-amber-300 text-gray-700  px-3 py-2 focus:outline-none border border-amber-300"
                          onClick={() => handleChange(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="px-3 bg-black py-2 text-center w-12 text-gray-100 focus:outline-none border border-amber-300"
                          value={quantity}
                          onChange={(e) => handleChange(Number(e.target.value))}
                        />
                        <button
                          className="bg-amber-300 text-gray-700  px-3 py-2 focus:outline-none border border-amber-300"
                          onClick={() => handleChange(quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex-auto flex justify-start">
                    <p>
                      Precio:
                      <b className="text-pink-500"> ${price} </b>
                    </p>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <Link to="/finish-booking" state={props.slotId}>
                      Ir a reservar
                    </Link>
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

export default BookModal;
