import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/Layout";
import RoomSchedule from "../components/RoomSchedule";
import data from "../data/data.json";
import Moment from "moment";
import React from "react";
import MobileRoomSchedule from "../components/MobileRoomSchedule";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Slot {
  productId: string;
  eventId: string;
  startTime: string;
  endTime: string;
  numSeatsAvailable: number;
}
const Booking = () => {
  let { location } = useParams();
  Moment.locale("en");
  const [local, setLocal] = useState(location);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(new Date());

  useEffect(() => {
    const getSlots = async () => {
      setLoading(true);
      const dateFrom = Moment(currentDay).format("YYYY-MM-DD");
      const dateTo = Moment(currentDay).add(1, "d").format("YYYY-MM-DD");
      const url = `https://club-del-escape-new-back.vercel.app/slots?dateFrom=${dateFrom}&dateTo=${dateTo}`;

      const res = await fetch(url);
      const { data }: { data: Slot[] } = await res.json();
      setSlots(data);
      setLoading(false);
    };

    getSlots();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [currentDay, local]);

  return (
    <Layout>
      <div className="mt-28 mb-28  relative ">
        <div className="flex justify-center">
          <div className="mx-auto flex flex-col items-center">
            <h1 className="my-2 text-xl text-white m-2 text-center">
              Estás reservando en {local}
            </h1>
            <button
              type="button"
              className="my-2  text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              {local === "colegiales" && (
                // <a href="/book/palermo" onClick={() => setLocal("palermo")}>
                //   Reservar en Palermo
                // </a>
                <button
                  type="button"
                  onClick={() => {
                    setLocal("palermo");
                  }}
                >
                  Reservar en Palermo
                </button>
              )}
              {local === "palermo" && (
                // <a
                //   href="/book/colegiales"
                //   onClick={() => setLocal("colegiales")}
                // >
                //   Reservar en Colegiales
                // </a>
                <button
                  type="button"
                  onClick={() => {
                    setLocal("colegiales");
                  }}
                >
                  Reservar en Colegiales
                </button>
              )}
              <svg
                aria-hidden="true"
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div className="my-2 inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => {
                  new Date(Moment(currentDay).subtract(1, "d").format());
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <FontAwesomeIcon
                  icon={faBackward}
                  className="ml-2 mr-3 text-amber-300"
                />
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium  focus:z-10 focus:ring-2 focus:ring-gray-500  focus:text-white text-white hover:text-white bg-transparent border  border-white  hover:bg-gray-700 focus:bg-gray-700"
              >
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  className=" bg-transparent items-center text-center focus:z-10 focus:ring-2 focus:ring-gray-500  focus:text-white text-white hover:text-white hover:bg-gray-700 focus:bg-gray-700"
                  selected={currentDay}
                  onChange={(date: Date) => setCurrentDay(date)}
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentDay(
                    new Date(Moment(currentDay).add(1, "d").format())
                  );
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <FontAwesomeIcon
                  icon={faForward}
                  className="ml-2 mr-3 text-amber-300"
                />
              </button>
            </div>
          </div>
        </div>

        {loading && <Loader />}
        <div
          className={
            "text-left hidden md:block" + (loading ? " opacity-20" : "")
          }
        >
          {data
            .filter((game) => game.local === local?.toUpperCase())
            .map((game) => (
              <RoomSchedule slots={slots} key={game.productId} {...game} />
            ))}
        </div>

        <div
          className={
            "text-center block md:hidden" + (loading ? " opacity-20" : "")
          }
        >
          {data
            .filter((game) => game.local === local?.toUpperCase())
            .map((game) => (
              <MobileRoomSchedule
                slots={slots}
                key={game.productId}
                {...game}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};
export default Booking;
