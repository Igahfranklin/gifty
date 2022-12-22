import React from "react";
import { useLocation } from "react-router-dom";

import CenteredLayout from "../../layouts/CenteredLayout";
import Sad from "../../assets/svg-components/Sad";
import PrimaryButton from "../../components/PrimaryButton";
import { urls } from "../../utils/urls";

export default function Error404() {
  const { state } = useLocation();
  return (
    <>
      <CenteredLayout>
        <div className="w-full text-white rounded-[10px] my-24 p-5 grid grid-cols-1 gap-y-4 place-items-center">
          <Sad />
          <h1 className="text-lg font-bold">404 Error</h1>
          <p className="text-center">
            {state?.text ? state.text : "Sorry, page not found."}
          </p>
          <PrimaryButton
            to={urls.home}
            additionalClassNames="flex justify-center items-center gap-2 border-2 border-white text-[16px] font-bold px-12 text-white"
          >
            <span>Go To Home</span>
          </PrimaryButton>
        </div>
      </CenteredLayout>
    </>
  );
}
