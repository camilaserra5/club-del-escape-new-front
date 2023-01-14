import { useParams } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/Layout";
import RoomSchedule from "../components/RoomSchedule";
import data from "../data/data.json";
import Moment from "moment";
import React from "react";
import MobileRoomSchedule from "../components/MobileRoomSchedule";

const Booking = () => {
  let { location } = useParams();
  Moment.locale("en");
  const [currentDay, setCurrentDay] = useState<string>(Moment.utc().format());

  return (
    <Layout>
      <div className="mt-28 mb-28  relative">
        <div className="flex justify-center">
          <div className="mx-auto">
            <h1 className="text-xl text-white m-2 text-center">
              Estás reservando en {location}
            </h1>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => {
                  setCurrentDay(Moment(currentDay).subtract(1, "d").format());
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
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                {Moment(currentDay).format("DD/MM/YYYY")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentDay(Moment(currentDay).add(1, "d").format());
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

        <div className="text-left hidden md:block">
          {data
            .filter((game) => game.local === location?.toUpperCase())
            .map((game) => (
              <RoomSchedule {...game} />
            ))}
        </div>

        <div className="text-center block md:hidden">
          {data
            .filter((game) => game.local === location?.toUpperCase())
            .map((game) => (
              <MobileRoomSchedule {...game} />
            ))}
        </div>
      </div>
    </Layout>
  );
};
export default Booking;
