import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SendMoreGiftIconWhite } from "../../assets/svg-components";
import CenteredLayout from "../../layouts/CenteredLayout";
import PrimaryButton from "../../components/PrimaryButton";
import { urls, apiUrls } from "../../utils/urls";
import { baseConfig as config } from "../../utils/apiCalls";

import Header from "../../components/Header";
import ErrorPage from "../../components/ErrorPage";

export default function ReceiveGift() {
  const { slug } = useParams();
  const [payment, setPayment] = useState();
  const [err, setErr] = useState();

  // const navigate = useNavigate();

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
                setErr("Gift not found");
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
      <Header>Claim Gift</Header>
      <CenteredLayout>
        <div className="w-full bg-lavenderBlush rounded-[10px] my-24 p-5 grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-1 gap-y-1 text-center">
            <p>
              <b>{payment.sender_name ? payment.sender_name : "Anonymous"}</b>{" "}
              sent
            </p>
            <h1 className="font-bold text-[36px]">
              ₦{payment.amount.toLocaleString()}
            </h1>
            <p>
              to <b>{payment.receiver_type_value}</b> through{" "}
              <b className="lowercase">{payment.receiver_type}</b>
            </p>
            <small>{payment.message && "(with a message)"}</small>
          </div>
          <hr className="border-primary_faded" />
          <div className="grid grid-cols-1 gap-y-1">
            <PrimaryButton
              type="submit"
              to={urls.verifyAccount(slug)}
              additionalClassNames="flex justify-center items-center gap-2 bg-primary text-white font-bold text-[18px]"
            >
              <SendMoreGiftIconWhite />
              <span>Claim Gift</span>
            </PrimaryButton>
            <p className="text-center text-[0.8em]">
              Are you <b>{payment.receiver_type_value}</b>? Verify account to
              claim gift
            </p>
            <p className="text-center text-[0.8em]">
              If gift is not claimed within 7 days, it will be refunded to
              sender
            </p>
          </div>
        </div>
      </CenteredLayout>
    </>
  );
}
