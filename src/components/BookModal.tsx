import { useState, useEffect } from "react";
import data from "../data/data.json";
import { Link } from "react-router-dom";
import Moment from "moment";
import { translateToSpanish } from "../utils/translate";

type Slot = {
  productId: string;
  eventId: string;
  startTime: string;
  endTime: string;
  numSeatsAvailable: number;
  quantity?: number;
};

type TextBooking = {
  text: string;
  slot: Slot;
};

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

const BookModal = (props: TextBooking) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [prod, setProd] = useState<Game | undefined>(undefined);

  useEffect(() => {
    switch (quantity) {
      case 2:
        setPrice(6000);
        break;
      case 3:
        setPrice(8100);
        break;
      case 4:
        setPrice(10000);
        break;
      case 5:
        setPrice(11500);
        break;
      case 6:
        setPrice(126000);
        break;
    }
  }, [quantity]);

  const handleChange = (event: number) => {
    let min = 2;
    let max = 6;
    if (prod) {
      console.log(prod.participantsMin);
      min = prod.participantsMin;
      max = prod.participantsMax;
    }
    const value = Math.max(min, Math.min(max, event));
    props.slot.quantity = value;
    setQuantity(value);
  };

  // const prod = data.find((p) => p.productId === props.slot.productId);
  useEffect(() => {
    localStorage.clear();
    const product = data.find((p) => p.productId === props.slot.productId);
    setProd(product);
    if (product) {
      setQuantity(product.participantsMin);
      props.slot.quantity = product.participantsMin;
    }
  }, [props]);

  return (
    <>
      <button
        className="px-3 py-2 text-xs font-medium text-white bg-orange-600 rounded-lg"
        onClick={() => setShowModal(true)}
      >
        {props.text}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-sm shadow-gray-500 relative flex flex-col w-full bg-stone-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-orange-400">
                    {prod?.title + " - " + prod?.local}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-white text-lg leading-relaxed">
                    {translateToSpanish(
                      Moment(props.slot.startTime).format("dddd")
                    )}
                    , {Moment(props.slot.startTime).format("DD")} de{" "}
                    {translateToSpanish(
                      Moment(props.slot.startTime).format("MMMM")
                    )}{" "}
                    {Moment(props.slot.startTime).format("YYYY")}
                  </p>

                  <p className="my-4 text-white text-lg leading-relaxed">
                    {Moment(props.slot.startTime).format("HH:mm")}
                  </p>

                  <div className="relative flex-auto flex justify-start">
                    <div className="my-4 leading-relaxed">
                      <label className="text-white">Jugadores</label>
                    </div>
                    <div className="my-4 leading-relaxed ml-4">
                      <div className="flex items-center">
                        <button
                          className="bg-orange-400 text-black  px-2  focus:outline-none border border-orange-400"
                          onClick={() => handleChange(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="px-3 bg-black text-center w-12 text-white focus:outline-none border border-orange-400"
                          value={quantity}
                          onChange={(e) => handleChange(Number(e.target.value))}
                        />
                        <button
                          className="bg-orange-400 text-black  px-2  focus:outline-none border border-orange-400"
                          onClick={() => handleChange(quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex-auto flex justify-start">
                    <p className="text-white">
                      Precio:
                      <b className="text-white"> ${price} </b>
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
                    className="bg-orange-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <Link to="/finish-booking" state={props.slot}>
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
