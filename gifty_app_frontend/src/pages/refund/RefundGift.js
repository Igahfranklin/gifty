import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SendMoreGiftIconWhite } from "../../assets/svg-components";
import CenteredLayout from "../../layouts/CenteredLayout";
import PrimaryButton from "../../components/PrimaryButton";
import { urls, apiUrls } from "../../utils/urls";
import { baseConfig as config } from "../../utils/apiCalls";
import ErrorPage from "../../components/ErrorPage";

import Header from "../../components/Header";

export default function RefundGift() {
  const { slug } = useParams();
  const [payment, setPayment] = useState();
  const [err, setErr] = useState();

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          await axios
            .get(apiUrls.getGiftDetails(slug), config)
            .then((res) => setPayment(res.data.data))
            .catch((err) => {
              if (err.response.status === 400) {
                console.log(err);
              } else if (err.response.status === 404) {
                setErr("Payment not found");
              } else {
                console.log(err);
              }
            });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [slug]);

  if (err) return <ErrorPage text={err} />;

  if (!payment) return <></>;

  return (
    <>
      <Header>Refund Gift</Header>
      <CenteredLayout>
        <div className="w-full bg-lavenderBlush rounded-[10px] my-24 p-5 grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-1 gap-y-1 text-center">
            <p>
              <b>{payment.receiver_type_value}</b> did not claim your
            </p>
            <h1 className="font-bold text-[36px]">
              ₦{payment.amount.toLocaleString()}
            </h1>
            <p>gift within 7 days</p>
          </div>
          <hr className="border-primary_faded" />
          <div className="grid grid-cols-1 gap-y-1">
            <PrimaryButton
              to={urls.verifyAccountForRefund(slug)}
              additionalClassNames="flex justify-center items-center gap-2 bg-primary text-white font-bold text-[18px]"
            >
              <SendMoreGiftIconWhite />
              <span>Get Refund</span>
            </PrimaryButton>
          </div>
        </div>
      </CenteredLayout>
    </>
  );
}
