import CarouselItem from "./CarouselItem";
import slots from "../data/slots.json";

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

const RoomSchedule = (props: Game) => {
  return (
    <>
      <h4 className="text-white text-left text-xl font-bold align-left mt-5 ml-4">
        {props.title}
      </h4>
      <div className="flex items-center  ml-4 mr-2">
        <div className="box-content items-center	flex-none snap-start w-32 border-solid border-2 mr-4">
          <img src={"/juegos/" + props.img} alt="Burger" />
        </div>

        <div className="overflow-x-auto flex items-center">
        {slots.json.data
            .filter((slot) => slot.productId === props.productId)
            .map((slot) => (
              <CarouselItem
                time={slot.startTime}
                difficulty={props.difficulty}
                slotId={slot.eventId}
                numSeatsAvailable={slot.numSeatsAvailable}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default RoomSchedule;
