import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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

  return (
    <Layout>
      <h1>PAGO EXITOSO</h1>
      <h1>PAGO EXITOSO</h1>
      <h1>PAGO EXITOSO</h1>
      <h1>PAGO EXITOSO</h1>
      <h1>
        PAGO EXITOSO: {paymentId} - {status}
      </h1>
    </Layout>
  );
};
export default Success;
