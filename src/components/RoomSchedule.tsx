import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import CarouselItem from "./CarouselItem";
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
interface Slot {
  productId: string;
  eventId: string;
  startTime: string;
  endTime: string;
  numSeatsAvailable: number;
}

const RoomSchedule = (props: Game) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300;
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300;
    }
  };
  return (
    <>
      <h4 className="text-white text-left text-xl font-bold align-left mt-5 ml-4">
        {props.title}
      </h4>

      <div className="flex items-center  ml-4 mr-2">
        <div className="box-content items-center	flex-none snap-start w-1/12 border-solid border-2 mr-4">
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
                <CarouselItem
                  key={slot.eventId}
                  slot={slot}
                  difficulty={props.difficulty}
                />
              ))}
          </div>
          {props.slots.filter((slot) => slot.productId === props.productId)
            .length > 5 && (
            <>
              <button
                className="absolute  top-0 left-0 bottom-0 flex items-center justify-center z-10 w-12 text-gray-500 transition-colors duration-200 hover:text-gray-900"
                onClick={handlePrevClick}
              >
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className=" text-amber-400 text-xl md:text-3xl"
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
export default RoomSchedule;
