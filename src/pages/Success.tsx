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
    localStorage.setItem("paymentId", paymentId);
  }, [paymentId]);

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
      console.log(hoa);
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
        <h1>Su reserva ha sido confirmada!</h1>
        <h1>SLOT ID: {localStorage.getItem("slotId")}</h1>
        <h1>Nombre: {localStorage.getItem("firstname")}</h1>
        <h1>Apellido: {localStorage.getItem("lastname")}</h1>
        <h1>Mail: {localStorage.getItem("email")}</h1>
        <h1>Telef: {localStorage.getItem("phone")}</h1>
        <h1>Mail: {localStorage.getItem("slotId")}</h1>
        <h1>ID pago: {paymentId}</h1>
      </>
    </Layout>
  );
};
export default Success;
