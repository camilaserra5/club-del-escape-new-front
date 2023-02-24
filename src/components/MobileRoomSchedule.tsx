import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "moment";
import { useRef } from "react";
import BookModal from "./BookModal";

interface Slot {
  productId: string;
  eventId: string;
  startTime: string;
  endTime: string;
  numSeatsAvailable: number;
}

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
  slots: Slot[];
}

const MobileRoomSchedule = (props: Game) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 100;
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 100;
    }
  };

  return (
    <>
      <h4 className="text-white text-left text-xl font-bold align-left mt-5 ml-2">
        {props.title}
      </h4>
      <div className="flex items-center justify-between ml-1 mr-1">
        <div className="box-content items-center	flex-none snap-start w-16 border-solid border-2 mr-4">
          <img src={"/juegos/" + props.img} alt="Burger" />
        </div>
        <div className="relative w-10/12 mx-auto">
          <div
            ref={carouselRef}
            className="flex overflow-x-scroll scrollbar-hidden"
            style={{ scrollBehavior: "smooth" }}
          >
            {props.slots
              .filter((slot) => slot.productId === props.productId)
              .map((slot) => (
                <div
                  key={slot.eventId}
                  className="carousel-item bg-stone-900 border-orange-400 rounded-md m-1 flex items-center justify-center"
                >
                  <div className="h-24 justify-center flex items-center">
                    <div className="text-center mt-6 divide-y">
                      <div className="p-2">
                        <p className="text-xs text-white  font-medium">
                          {Moment(slot.startTime).format("HH:mm")}
                        </p>
                      </div>
                      {slot.numSeatsAvailable === 0 && (
                        <div className="p-2">
                          <p className="text-xs text-white  p-2">OCUPADO</p>
                        </div>
                      )}
                      {slot.numSeatsAvailable > 0 && (
                        <div className="p-2">
                          <BookModal text={"Reservar"} slot={slot} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {props.slots.filter((slot) => slot.productId === props.productId)
            .length > 5 && (
            <>
              <button
                className="absolute top-0 left-0 bottom-0 flex items-center justify-center z-10 w-12 text-gray-500 transition-colors duration-200 hover:text-gray-900"
                onClick={handlePrevClick}
              >
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="text-amber-400 text-xl md:text-3xl"
                />
              </button>
              <button
                className="absolute top-0 right-0 bottom-0 flex items-center justify-center z-10 w-12 text-gray-500 transition-colors duration-200 hover:text-gray-900"
                onClick={handleNextClick}
              >
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="text-amber-400 text-xl md:text-3xl"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default MobileRoomSchedule;
