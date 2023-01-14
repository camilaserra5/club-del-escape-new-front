import BookModal from "./BookModal";
import Moment from "moment";

type ScheduleProps = {
  time: string;
  difficulty: number;
  slotId: string;
  numSeatsAvailable: number;
};

const CarouselItem = (props: ScheduleProps) => {
  return (
    <div className="carousel-item bg-stone-900 border-orange-400 rounded-md m-3 flex items-center justify-center">
      <div className="w-48 h-48 justify-center flex items-center">
        <div className="text-center mt-6 m-4 divide-y ">
          <div className=" p-2">
            <p className="text-lg font-medium text-white ">
              {Moment(props.time).format("HH:mm")}
            </p>
          </div>
          {props.numSeatsAvailable === 0 && (
            <div className="text-white p-2">
              <p>OCUPADO</p>
            </div>
          )}
          {props.numSeatsAvailable > 0 && (
            <div className="p-2">
              <BookModal text={"Reservar sala"} slotId={props.slotId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CarouselItem;
