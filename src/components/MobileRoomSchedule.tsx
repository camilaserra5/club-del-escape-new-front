import slots from "../data/slots.json";
import Moment from "moment";
import BookModal from "./BookModal";

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

const MobileRoomSchedule = (props: Game) => {
  return (
    <>
      <h4 className="text-white text-left text-xl font-bold align-left mt-5 ml-2">
        {props.title}
      </h4>
      <div className="grid grid-cols-5 gap-2">
        {slots.json.data
          .filter((slot) => slot.productId === props.productId)
          .map((slot) => (
            <>
              {slot.numSeatsAvailable > 0 && (
                <button className="m-2 bg-orange-600 text-white rounded">
                  <BookModal
                    text={Moment(slot.startTime).format("HH:mm")}
                    slotId={slot.eventId}
                  />
                </button>
              )}
            </>
          ))}
      </div>
    </>
  );
};
export default MobileRoomSchedule;
