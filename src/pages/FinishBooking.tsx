import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data/data.json";
import slots from "../data/slots.json";
import React from "react";
import MercadoPago from "../components/MercadoPago";
import axios from "axios";

const FinishBooking = () => {
  const location = useLocation();
  const slotId = location.state;

  const slot = slots.json.data.find((slot) => slot.eventId === slotId);
  const prod = data.find((p) => p.productId === slot?.productId);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState("");
  const [english, setEnglish] = useState("");
  const [pagar, setpagar] = useState(true);
  const [prefId, setPrefId] = useState("");

  useEffect(() => {
    console.log("holis");
    axios
      .post("https://club-del-escape-new-back.vercel.app/mercadopago", {
        title: "Seña: " + prod?.title,
        price: 1,
        description: "Seña para club del escape"
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
    if (firstname && lastname && email && phone) setpagar(false);
  }, [firstname, lastname, email, phone]);

  return (
    <Layout>
      <div className="mt-28 mx-4 bg-stone-900">
        <section>
          <div className="grid grid-cols-1 mx-auto max-w-screen-2xl md:grid-cols-2">
            <div className="py-12 bg-slate-800 md:py-24 mb-7">
              <div className="max-w-lg px-4 mx-auto space-y-8 lg:px-8">
                <div className="flex items-center">
                  <span className="w-10 h-10 bg-amber-700 rounded-full"></span>
                  <h2 className="ml-4 text-3xl font-bold text-gray-100">
                    {prod?.title}
                  </h2>
                </div>
                <div>
                  <p className="text-2xl font-medium tracking-tight text-gray-100">
                    $3999.99 ARS
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
                                Sede {prod?.local} - av cordoba 123
                              </dt>
                            </div>
                            <div>
                              <dt className="inline">
                                Miércoles 11 enero 2023
                              </dt>
                            </div>
                            <div>
                              <dt className="inline">{slot?.startTime}</dt>
                            </div>
                            <div>
                              <dt className="inline">5 jugadores</dt>
                            </div>
                          </dl>
                        </div>
                      </li>
                    </ul>
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
                    </label>
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
                        value={terms}
                        onChange={(e) => setTerms(e.target.value)}
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
                        value={english}
                        onChange={(e) => setEnglish(e.target.value)}
                        className="w-4 h-4 border rounded focus:ring-3 bg-zinc-700 border-gray-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
                      />
                    </div>
                    <label className="ml-2 text-sm font-medium text-gray-300">
                      Check this box if you want the game in english.
                    </label>
                  </div>

                  <div className="col-span-6 flex items-start mb-6">
                    {pagar ? null : <MercadoPago id={prefId} />}
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
