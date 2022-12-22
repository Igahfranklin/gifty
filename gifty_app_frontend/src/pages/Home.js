import React from "react";

import PrimaryButton from "../components/PrimaryButton";

import CenteredLayout from "../layouts/CenteredLayout";
import Leading from "../components/Leading";
import GiftBox from "../assets/svg-components/GiftBox";
import { urls } from "../utils/urls";

export default function Home() {
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
    </CenteredLayout>
  );
}
