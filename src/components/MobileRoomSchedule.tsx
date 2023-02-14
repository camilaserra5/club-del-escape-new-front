import Moment from "moment";
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
  return (
    <>
      <h4 className="text-white text-left text-xl font-bold align-left mt-5 ml-2">
        {props.title}
      </h4>
      <div className="flex items-center justify-between ml-1 mr-1">
        <div className="box-content items-center	flex-none snap-start w-16 border-solid border-2 mr-4">
          <img src={"/juegos/" + props.img} alt="Burger" />
        </div>
        <div className="carousel rounded-box bg-stone-800">
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
      </div>
    </>
  );
};
export default MobileRoomSchedule;
