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
          {props.slots
            .filter((slot) => slot.productId === props.productId)
            .map((slot) => (
              <CarouselItem slot={slot} difficulty={props.difficulty} />
            ))}
        </div>
      </div>
    </>
  );
};
export default RoomSchedule;
