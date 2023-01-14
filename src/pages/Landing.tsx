import Layout from "../components/Layout";
import Hero from "../components/Hero";
import RoomListing from "../components/RoomListing";
const Landing = () => {
  return (
    <Layout>
      <Hero />
      <RoomListing
        key={1}
        name={"Sede Colegiales"}
        address={"Giribone 1041"}
        gmapsUrl={"https://goo.gl/maps/8rAhhVvYJG6EsD9r7"}
        numberOfRooms={6} venue={"COLEGIALES"}      />
      <RoomListing
        key={2}
        name={"Sede Palermo"}
        address={"Avenida Córdoba 4265"}
        gmapsUrl={"https://goo.gl/maps/9fcr7QMHdqiDwkow9"}
        numberOfRooms={5} venue={"PALERMO"}      />
    </Layout>
  );
};

export default Landing;
