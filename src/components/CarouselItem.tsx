import BookModal from "./BookModal";
import Moment from "moment";

type Slot = {
  productId: string;
  eventId: string;
  startTime: string;
  endTime: string;
  numSeatsAvailable: number;
};

type ScheduleProps = {
  slot: Slot;
  difficulty: number;
};

const CarouselItem = (props: ScheduleProps) => {
  return (
    <div className="carousel-item bg-stone-900 border-orange-400 rounded-md m-3 flex items-center justify-center">
      <div className="w-48 h-48 justify-center flex items-center">
        <div className="text-center mt-6 m-4 divide-y ">
          <div className=" p-2">
            <p className="text-lg font-medium text-white ">
              {Moment(props.slot.startTime).format("HH:mm")}
            </p>
          </div>
          {props.slot.numSeatsAvailable === 0 && (
            <div className="text-white p-2">
              <p>OCUPADO</p>
            </div>
          )}
          {props.slot.numSeatsAvailable > 0 && (
            <div className="p-2">
              <BookModal text={"Reservar sala"} slot={props.slot} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CarouselItem;
