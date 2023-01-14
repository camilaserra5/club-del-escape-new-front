import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import RoomDescriptionModal from "./RoomDescriptionModal";
import data from "../data/data.json";

type AppProps = {
  name: string;
  venue: string;
  address: string;
  gmapsUrl: string;
  numberOfRooms: number;
};

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

const RoomListing = (props: AppProps) => {
  const filteredData = data
    .filter((game: Game) => game.local === props.venue)
    .reduce((unique: Game[], game: Game) => {
      if (!unique.some((g: Game) => g.title === game.title)) {
        unique.push(game);
      }
      return unique;
    }, []);

  return (
    <section className="bg-stone-900 text-white">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold bg-gradient-to-r from-amber-700 via-orange-300 to-orange-700 bg-clip-text text-transparent sm:text-3xl">
            {props.name}
          </h2>
          <div className="flex items-center cami">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="ml-2 mr-3 text-blue-300"
            />

            <a target="_blank" href={props.gmapsUrl} rel="noreferrer">
              <p className="max-w-md italic text-l font-medium text-blue-500 underline hover:no-underline">
                {props.address}
              </p>
            </a>
          </div>
        </header>

        <ul className="grid gap-4 mt-8 grid-cols-3 lg:grid-cols-5">
          {filteredData.map((game) => (
            <li>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="block overflow-hidden group"
              >
                <img
                  src={"juegos/" + game.img}
                  alt=""
                  className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[350px]"
                />
              </a>

              <RoomDescriptionModal {...game} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default RoomListing;
