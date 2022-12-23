import React, { useState } from "react";

import PrimaryButton from "../components/PrimaryButton";

import CenteredLayout from "../layouts/CenteredLayout";
import Leading from "../components/Leading";
import GiftBox from "../assets/svg-components/GiftBox";
import { ProcessConnector } from "../assets/svg-components";

import { urls } from "../utils/urls";
import {
  FaPenFancy,
  FaCashRegister,
  FaShare,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";
import { faqs } from "../utils/faqs";

export default function Home() {
  const [toggleFaq, setToggleFaq] = useState(false);
  const toggleQuestionList = (index) => {
    if (toggleFaq === index) {
      return setToggleFaq(false);
    }
    return setToggleFaq(index);
  };
  const style = {
    color: "#D11149",
    height: "20px",
    width: "20px",
  };
  return (
    <CenteredLayout>
      <Leading />
      <div className="w-full">
        <PrimaryButton
          to={urls.initiateSend}
          additionalClassNames="flex justify-center items-center gap-2 bg-white text-primary font-bold text-[18px]"
        >
          <span>Send Gift</span> <GiftBox />
        </PrimaryButton>
        {/* <SeparatorText width={"100"} text="OR"/>
                <PrimaryButton to="/login" additionalClassNames="bg-white text-primary">Login</PrimaryButton> */}
      </div>
      <ProcessConnector />

      <div className="w-full bg-whiteSmoke p-5 rounded-[15px] grid grid-cols-1 gap-y-5">
        <h2 className="font-bold text-primary text-[1.3rem] px-5">
          How it works
        </h2>
        <hr className="border-1 border-primary" />
        <div className="flex items-center gap-10">
          <span className="border border-primary rounded-full p-3">
            <FaCashRegister style={style} />
          </span>
          <div>
            <h2 className="font-bold text-[1.2rem] text-primary">
              Chose method
            </h2>
            <p>
              choose your prefered method of sending(email, phone or instagram)
            </p>
          </div>
        </div>
        <hr className="border-1 border-primary" />
        <div className="flex items-center gap-10">
          <span className="border border-primary rounded-full p-3">
            <FaPenFancy style={style} />
          </span>
          <div>
            <h2 className="font-bold text-[1.2rem] text-primary">
              Enter Reciever's details
            </h2>
            <p>provide the required details in the form field</p>
          </div>
        </div>
        <hr className="border-1 border-primary" />
        <div className="flex items-center gap-10">
          <span className="border border-primary rounded-full p-3">
            <FaShare style={style} />
          </span>
          <div>
            <h2 className="font-bold text-[1.2rem] text-primary">
              Share Gift Link
            </h2>
            <p>
              copy or share/send the link generated to the reciever (optional)
            </p>
          </div>
        </div>
      </div>
      <ProcessConnector />
      <div className="w-full bg-whiteSmoke p-5 rounded-[15px] grid grid-cols-1 gap-y-5">
        <h2 className="font-bold text-primary text-sm px-5">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div key={index}>
            <h2
              onClick={() => toggleQuestionList(index)}
              className="flex items-center gap-2 justify-between bg-primary font-bold rounded-full text-white px-5 py-3"
            >
              {faq.question}
              <span>
                {toggleFaq === index ? <FaMinusCircle /> : <FaPlusCircle />}
              </span>
            </h2>
            <p
              className={`${
                toggleFaq === index ? "" : "hidden"
              } px-5 text-sm py-2`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </CenteredLayout>
  );
}
