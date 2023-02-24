import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/Layout";
import RoomSchedule from "../components/RoomSchedule";
import data from "../data/data.json";
import Moment from "moment";
import React from "react";
import MobileRoomSchedule from "../components/MobileRoomSchedule";
import Loader from "../components/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { translateToSpanish } from "../utils/translate";

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
      <div className="mt-28 mb-28   ">
        <div className="">
          <div className="mx-auto flex flex-col items-start justify-center ">
            <div className="mx-auto space-x-5 flex flex-row items-center justify-center md:mr-auto  mr-5">
              <h1
                id="1"
                className="my-2 md:text-xl text-lg text-white m-2 text-center justify-center mx-auto items-center"
              >
                Estás reservando en {local}
              </h1>
              <div
                id="2"
                className="my-2 ml-auto justify-center mx-auto text-white bg-black ring-2 ring-orange-600 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center"
              >
                {local === "colegiales" && (
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
              </div>
            </div>
            <div
              className="my-2 md:space-x-4 space-x-2 inline-flex rounded-md shadow-sm text-xl text-white m-2  md:mx-auto  mx-2 text-center justify-center "
              role="group"
            >
              <button
                onClick={() => document.getElementById("datePicker")?.click()}
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-orange-700 rounded-lg text-white"
              >
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="ml-2 mr-3 text-amber-300"
                />
                Elegir fecha
                <div className="w-0">
                  <DatePicker
                    id="datePicker"
                    showPopperArrow={false}
                    selected={currentDay}
                    className="hidden w-2"
                    onChange={(date: Date) => {
                      setCurrentDay(date);
                      document.getElementById("datePicker")?.click();
                    }}
                  />
                </div>
              </button>
              <button
                onClick={() => {
                  setCurrentDay(
                    new Date(Moment(currentDay).subtract(1, "d").format())
                  );
                }}
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-orange-600 rounded-lg text-white"
              >
                <FontAwesomeIcon
                  icon={faBackward}
                  className="ml-2 mr-3 text-amber-300"
                />
                Día anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentDay(
                    new Date(Moment(currentDay).add(1, "d").format())
                  );
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-orange-600 rounded-lg text-white"
              >
                <FontAwesomeIcon
                  icon={faForward}
                  className="ml-2 mr-3 text-amber-300"
                />
                Día siguiente
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-orange-400 text-left text-2xl font-bold align-left mt-5 ml-4">
          {translateToSpanish(Moment(currentDay).format("dddd"))},{" "}
          {Moment(currentDay).format("DD")} de{" "}
          {translateToSpanish(Moment(currentDay).format("MMMM"))}{" "}
          {Moment(currentDay).format("YYYY")}
        </h3>
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
