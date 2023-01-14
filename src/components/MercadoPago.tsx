import React, { useEffect, useState } from "react";

const FORM_ID = "payment-form";

interface PrefId {
  id: string;
}

const MercadoPago = (props: PrefId) => {
  const [preferenceId, setPreferenceId] = useState("");

  useEffect(() => {
    setPreferenceId(props.id);
  }, [props.id]);

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-modal", "true");
      script.setAttribute("data-width", "700");
      script.setAttribute("data-height", "600");
      script.setAttribute("data-iframe", "false");
      script.setAttribute("data-iframe_label", "Pay with Mercado Pago");
      script.setAttribute("data-preference-id", preferenceId);
      const form = document.getElementById(FORM_ID);
      form?.appendChild(script);
    }
  }, [preferenceId]);

  return <form id={FORM_ID} method="GET" />;
};
export default MercadoPago;
