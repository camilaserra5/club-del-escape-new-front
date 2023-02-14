import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const Success = () => {
  const location = useLocation();

  const [status, setStatus] = useState("");
  const [paymentId, setPaymentId] = useState("");

  function getParams(url: string) {
    var parser = document.createElement("a");
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === "collection_status") setStatus(pair[1]);
      if (pair[0] === "payment_id") setPaymentId(pair[1]);
    }
  }

  useEffect(() => {
    getParams(location.search);
  }, [location]);

  useEffect(() => {
    const book = async () => {
      const url = `https://club-del-escape-new-back.vercel.app/create-reservation`;
      console.log(localStorage.getItem("eventId"));
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          holdId: localStorage.getItem("slotId"),
          firstName: localStorage.getItem("firstname"),
          lastName: localStorage.getItem("lastname"),
          email: localStorage.getItem("email"),
          phoneNumber: localStorage.getItem("phone"),
          eventId: localStorage.getItem("eventId"),
          participants: localStorage.getItem("participants"),
          productId: localStorage.getItem("productId"),
          paymentId: paymentId,
        }),
      });

      const { hoa } = await res.json();
    };

    book();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [paymentId]);
  return (
    <Layout>
      <>
        {/* prints: Reed */}
        <h1>PAGO EXITOSO</h1>
        <h1>PAGO EXITOSO</h1>
        <h1>PAGO EXITOSO</h1>
        <h1>PAGO EXITOSO</h1>
        <h1>PAGO EXITOSO</h1>
        <h1>PAGO EXITOSO</h1>
        <h1>
          PAGO EXITOSO: {paymentId} - {status}
        </h1>
        <p>
          A{localStorage.getItem("slotId")}D{localStorage.getItem("firstname")}D
          {localStorage.getItem("lastname")}D{localStorage.getItem("email")}D{" "}
          {localStorage.getItem("phone")}D D{localStorage.getItem("terms")}d{" "}
          {localStorage.getItem("english")}
        </p>
      </>
    </Layout>
  );
};
export default Success;
