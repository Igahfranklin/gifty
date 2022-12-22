import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
  MoneySent,
  MessageText,
  SendMoreGiftIcon,
} from "../../assets/svg-components";
import CenteredLayout from "../../layouts/CenteredLayout";
import { urls, apiUrls } from "../../utils/urls";
import { baseConfig as config } from "../../utils/apiCalls";
import axios from "axios";
import { useParams } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import { paymentStatuses } from "../../utils/helper";
import ErrorPage from "../../components/ErrorPage";

export default function ConfirmReceive() {
  const { slug } = useParams();
  const [err, setErr] = useState();
  const [payment, setPayment] = useState();

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
      <Header>
        {payment.status === paymentStatuses.REFUNDED
          ? "Gift Refunded"
          : "Gift Received"}
      </Header>
      <CenteredLayout>
        <div className="w-full bg-lavenderBlush rounded-[10px] my-24 p-5 grid grid-cols-1 gap-y-4">
          <div className="flex flex-col items-center gap-y-4">
            <MoneySent />
            {payment.message && (
              <div className="bg-[#F4C6D3] px-5 py-5 flex flex-col items-center">
                <MessageText />
                <p className="text-center">{payment.message}</p>
                <b>
                  — {payment.sender_name ? payment.sender_name : "Anonymous"}
                </b>
              </div>
            )}
            {payment.status === paymentStatuses.REFUNDED ? (
              <p className=" text-center">
                <b>₦{payment.amount.toLocaleString()}</b> has been refunded to
                your bank account!
              </p>
            ) : (
              <p className=" text-center">
                <b>₦{payment.amount.toLocaleString()}</b> from{" "}
                <b>{payment.sender_name ? payment.sender_name : "Anonymous"}</b>{" "}
                is on it's way to your bank account!
              </p>
            )}
          </div>
          <div className="mx-auto w-full grid grid-cols-1 gap-y-4">
            <PrimaryButton
              to={urls.initiateSend}
              additionalClassNames="flex justify-center items-center gap-2 bg-white text-primary border-2 border-primary font-bold text-[18px]"
            >
              <span>Send Gift</span>
              <SendMoreGiftIcon />
            </PrimaryButton>
          </div>
        </div>
      </CenteredLayout>
    </>
  );
}
