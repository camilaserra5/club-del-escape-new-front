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
      <h4>{props.title}</h4>
      <div className="flex items-center justify-between">
        <div className="carousel-item pr-4 w-48 h-48 ">
          <img src={"/juegos/" + props.img} alt="Burger" />
        </div>
        <div className="carousel rounded-box bg-stone-800">
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
