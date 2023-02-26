import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data/data.json";
import React from "react";
import MercadoPago from "../components/MercadoPago";
import axios from "axios";
import validator from "validator";
import Moment from "moment";
import { translateToSpanish } from "../utils/translate";

const mercadoPagoButton = {
  padding: "0 1.7142857142857142em",
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  fontSize: "0.875em",
  lineHeight: "2.7142857142857144",
  background: "#009ee3",
  borderRadius: "0.2857142857142857em",
  color: "#fff",
  cursor: "pointer",
  border: "0",
};

type Slot = {
  productId: string;
  eventId: string;
  startTime: string;
  endTime: string;
  numSeatsAvailable: number;
  quantity: number;
};

const FinishBooking = () => {
  const location = useLocation();
  const slot: Slot = location.state;

  const prod = data.find((p) => p.productId === slot?.productId);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);
  const [english, setEnglish] = useState(false);
  const [pagar, setpagar] = useState(true);
  const [prefId, setPrefId] = useState("");

  const [price, setPrice] = useState(0);
  const [slotId, setSlotId] = useState("");

  useEffect(() => {
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("terms", JSON.stringify(terms));
    localStorage.setItem("english", JSON.stringify(english));
  }, [firstname, lastname, email, phone, terms, english]);

  useEffect(() => {
    const savedSlotId = localStorage.getItem("slotId");
    if (savedSlotId) setSlotId(savedSlotId);
    const savedPrice = localStorage.getItem("price");
    if (savedPrice) setPrice(parseFloat(savedPrice));
  }, []);
  
  useEffect(() => {
    const hold = async () => {
      if (localStorage.getItem("slotId")) return;
      const url = `https://club-del-escape-new-back.vercel.app/hold-slot`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: slot.eventId,
          participants: slot.quantity,
          productId: slot.productId,
        }),
      });

      const { slotId, price } = await res.json();
      console.log(slotId);
      setPrice(price);
      setSlotId(slotId);
      localStorage.setItem("eventId", slot.eventId);
      localStorage.setItem("participants", slot.quantity.toString());
      localStorage.setItem("productId", slot.productId);
      localStorage.setItem("slotId", slotId);
      localStorage.setItem("price", price);
    };

    hold();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [slot]);

  useEffect(() => {
    axios
      .post("https://club-del-escape-new-back.vercel.app/mercadopago", {
        title: "Seña: " + prod?.title,
        price: 1000,
        description: "Seña para club del escape",
      })
      .then((response) => {
        setPrefId(response.data.preferenceId);
      });
  }, [prod]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setpagar(true);
  };

  useEffect(() => {
    if (
      firstname &&
      lastname &&
      validator.isEmail(email) &&
      validator.isMobilePhone(phone)
    ) {
      setpagar(false);
    } else {
      setpagar(true);
    }
  }, [firstname, lastname, email, phone]);

  return (
    <Layout>
      <div className="mt-28 mx-4 bg-stone-900">
        <section>
          <div className="grid grid-cols-1 mx-auto max-w-screen-2xl md:grid-cols-2">
            <div className="py-12 bg-slate-800 md:py-24 mb-7">
              <div className="max-w-lg px-4 mx-auto space-y-8 lg:px-8">
                <div className="flex items-center">
                  <h2 className="text-3xl font-bold text-gray-100">
                    {prod?.title}
                  </h2>
                </div>
                <div>
                  <p className="text-2xl font-medium tracking-tight text-gray-100">
                    ${price} ARS
                  </p>
                </div>
                <div>
                  <div className="flow-root">
                    <ul className="-my-4 divide-y divide-gray-100">
                      <li className="flex items-center py-4">
                        <img
                          src="/juegos/fuga.jpeg"
                          alt=""
                          className="object-cover w-36 h-36 rounded"
                        />

                        <div className="ml-4">
                          <dl className="mt-0.5 space-y-px text-lg  text-gray-100">
                            <div>
                              <dt className="inline">
                                Sede {prod?.localFriendlyName}
                              </dt>
                            </div>
                            <div>
                              <dt className="inline">{prod?.address}</dt>
                            </div>
                            <div>
                              <dt className="inline">
                                {translateToSpanish(
                                  Moment(slot.startTime).format("dddd")
                                )}
                                , {Moment(slot.startTime).format("DD")} de{" "}
                                {translateToSpanish(
                                  Moment(slot.startTime).format("MMMM")
                                )}{" "}
                                {Moment(slot.startTime).format("YYYY")}
                              </dt>
                            </div>
                            <div>
                              <dt className="inline">
                                {Moment(slot.startTime).format("HH:mm")}
                              </dt>
                            </div>
                            <div>
                              <dt className="inline">
                                {slot.quantity} jugadores
                              </dt>
                            </div>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    {prod?.local === "PALERMO" && (
                      <iframe
                        className="mt-9 invert w-full contrast-75"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.2725695075255!2d-58.42743848427838!3d-34.59726848046116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca7baf4da67b%3A0xad6e1d86c5c260e5!2sAv.%20C%C3%B3rdoba%204122%2C%20C1188AAU%20CABA!5e0!3m2!1ses-419!2sar!4v1674141441169!5m2!1ses-419!2sar"
                        width="500"
                        height="250"
                        loading="lazy"
                        title="mapa"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    )}

                    {prod?.local === "COLEGIALES" && (
                      <iframe
                        className="mt-9 invert w-full contrast-75"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.960038039108!2d-58.456995000000006!3d-34.5798777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5e74df67c99%3A0xb33c3407624da4db!2sGiribone%201041%2C%20C1427CAM%20CABA!5e0!3m2!1ses-419!2sar!4v1677199649300!5m2!1ses-419!2sar"
                        width="500"
                        height="250"
                        loading="lazy"
                        title="mapa"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-12 bg-zinc-800 md:py-24 mb-7">
              <div className="max-w-lg px-4 mx-auto lg:px-8">
                <form className="grid grid-cols-6 gap-4" onSubmit={onSubmit}>
                  <div className="col-span-3 mb-6">
                    <label className="block mb-2 text-sm font-medium text-white">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="border text-sm rounded-lg block w-full p-2.5 bg-zinc-700 border-gray-500 text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-3 mb-6">
                    <label className="block mb-2 text-sm font-medium text-white">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="border text-sm rounded-lg block w-full p-2.5 bg-zinc-700 border-gray-500 text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-6 mb-6">
                    <label className="block mb-2 text-sm font-medium text-white">
                      Email
                    </label>{" "}
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border text-sm rounded-lg block w-full p-2.5 bg-zinc-700 border-gray-500 text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-6 mb-6">
                    <label className="block mb-2 text-sm font-medium text-white">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border text-sm rounded-lg block w-full p-2.5 bg-zinc-700 border-gray-500 text-white focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-6 flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                        className="w-4 h-4 border rounded focus:ring-3 bg-zinc-700 border-gray-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                      />
                    </div>
                    <label className="ml-2 text-sm font-medium text-gray-300">
                      Seleccione esta opción si quiere el juego adaptado para
                      niños (9 a 12 años).
                    </label>
                  </div>
                  <div className="col-span-6 flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="english"
                        type="checkbox"
                        checked={english}
                        onChange={(e) => setEnglish(e.target.checked)}
                        className="w-4 h-4 border rounded focus:ring-3 bg-zinc-700 border-gray-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                      />
                    </div>
                    <label className="ml-2 text-sm font-medium text-gray-300">
                      Check this box if you want the game in english.
                    </label>
                  </div>
                  <div className="col-span-6 flex items-start text-white">
                    <div
                      className="flex items-center text-white text-xs font-bold px-2 py-3 bg-[#3d5685]"
                      role="alert"
                    >
                      <svg
                        className="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                      </svg>
                      <p>
                        Te redireccionaremos al sitio seguro de MercadoPago para
                        que abones una seña de $1.000
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6 flex items-start">
                    {pagar ? (
                      <button
                        type="button"
                        className="focus:outline-none disabled:opacity-25"
                        style={mercadoPagoButton}
                        disabled
                      >
                        Ir a pagar
                      </button>
                    ) : (
                      <>
                        <MercadoPago id={prefId} />
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FinishBooking;
