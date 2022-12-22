import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { CopyIcon, SendMoreGiftIconWhite } from "../../assets/svg-components";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { urls, apiUrls, generateFullReceiveGiftUrl } from "../../utils/urls";
import Header from "../../components/Header";
import CenteredLayout from "../../layouts/CenteredLayout";
import { baseConfig as config } from "../../utils/apiCalls";
import { Colors } from "../../utils/colors";
import PrimaryButton from "../../components/PrimaryButton";
import QRCode from "react-qr-code";
import ErrorPage from "../../components/ErrorPage";

export default function GiftSent() {
  const [searchParams] = useSearchParams();
  const [payment, setPayment] = useState();
  const [linkIsCopying, setLinkIsCopying] = useState(false);
  const [err, setErr] = useState();

  const reference = searchParams.get("reference");

  const receiveGiftUrl = generateFullReceiveGiftUrl(payment?.slug);

  const copyToClipboard = (elemId) => {
    setLinkIsCopying(true);
    var copyText = document.getElementById(elemId);
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    setTimeout(() => {
      setLinkIsCopying(false);
    }, 2500);
  };

  useEffect(() => {
    if (reference) {
      (async () => {
        try {
          await axios
            .post(apiUrls.confirmPayment(reference), config)
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
  }, [reference]);

  if (err) return <ErrorPage text={err} />;

  if (!payment) return <></>;

  return (
    <>
      <Header>Gift Sent</Header>
      <CenteredLayout>
        <div className="w-full bg-whiteSmoke rounded-[10px] my-24 p-5 grid grid-cols-1 gap-y-4 relative">
          <div className="flex flex-col gap-y-4 justify-center items-center bg-primary_faded py-4 px-5 rounded-[10px]">
            <p className="font-light font-sm text-center">
              <b>₦{payment.amount.toLocaleString()}</b> has been gifted to
              <span className="block mt-2">
                <b>{payment.receiver_type_value}</b>
              </span>
            </p>
            <div className="w-[156px] p-2 bg-whiteSmoke">
              <QRCode
                size={156}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={receiveGiftUrl}
                viewBox={`0 0 156 156`}
                fgColor={Colors.navColor}
                bgColor={Colors.whiteSmoke}
              />
            </div>
            <div className="w-full flex items-center justify-between text-[#989093] text-sm font-light py-3 outline-0 rounded-[8px] border border-[#DDDADB] px-4 bg-white">
              <input
                id="receiveGiftUrlInput"
                type="text"
                value={receiveGiftUrl}
                className="hidden"
                readOnly
              />
              <p className="truncate">{receiveGiftUrl}</p>
              <button
                onClick={() => copyToClipboard("receiveGiftUrlInput")}
                className="flex items-center border border-primary text-primary text-[10px] rounded-lg p-2 font-bold"
              >
                {!linkIsCopying ? (
                  <>
                    <CopyIcon />
                    <span className="ml-2">Copy</span>
                  </>
                ) : (
                  <span>Copied</span>
                )}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>Share:</span>
              <WhatsappShareButton url={receiveGiftUrl}>
                <WhatsappIcon
                  size={32}
                  round={true}
                  iconFillColor="white"
                ></WhatsappIcon>
              </WhatsappShareButton>
              <TelegramShareButton url={receiveGiftUrl}>
                <TelegramIcon
                  size={32}
                  round={true}
                  iconFillColor="white"
                ></TelegramIcon>
              </TelegramShareButton>
              <FacebookMessengerShareButton url={receiveGiftUrl}>
                <FacebookMessengerIcon
                  size={32}
                  round={true}
                  iconFillColor="white"
                ></FacebookMessengerIcon>
              </FacebookMessengerShareButton>
              <FacebookShareButton url={receiveGiftUrl}>
                <FacebookIcon
                  size={32}
                  round={true}
                  iconFillColor="white"
                ></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton url={receiveGiftUrl}>
                <TwitterIcon
                  size={32}
                  round={true}
                  iconFillColor="white"
                ></TwitterIcon>
              </TwitterShareButton>
              <EmailShareButton url={receiveGiftUrl}>
                <EmailIcon
                  size={32}
                  round={true}
                  iconFillColor="white"
                ></EmailIcon>
              </EmailShareButton>
            </div>
          </div>

          <hr className="border-primary_faded" />

          <PrimaryButton
            to={urls.initiateSend}
            additionalClassNames="flex justify-center items-center gap-2 bg-primary text-white font-bold text-[18px]"
          >
            <span>Send More Gifts</span>
            <SendMoreGiftIconWhite />
          </PrimaryButton>
        </div>
      </CenteredLayout>
    </>
  );
}
