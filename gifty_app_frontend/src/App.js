import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/Home";
import { SendForm, GiftSent, InitiateSend } from "./pages/send";
import {
  ReceiveGift,
  VerifyAccount,
  EnterBankInfo,
  ConfirmReceive,
  IgAuth,
} from "./pages/receive";
import { TermsConditions, PrivacyPolicy } from "./pages/legal";
import Error404 from "./pages/error/Error404";
import { urls } from "./utils/urls";
import { RefundGift, VerifyAccountForRefund } from "./pages/refund";
import SmoothScrollToTop from "./components/SmoothScrollToTop";

function App() {
  return (
    <Router>
      <BaseLayout>
        <SmoothScrollToTop>
          <Routes>
            <Route path={urls.home} element={<Home />} />
            <Route path={urls.initiateSend} element={<InitiateSend />} />
            <Route path={urls.sendForm() + ":type"} element={<SendForm />} />
            <Route path={urls.giftSent} element={<GiftSent />} />

            <Route
              path={urls.receiveGift() + ":slug"}
              element={<ReceiveGift />}
            />
            <Route
              path={urls.verifyAccount() + ":slug"}
              element={<VerifyAccount />}
            />
            <Route path={urls.igAuth} element={<IgAuth />} />
            <Route
              path={urls.enterBankInfo() + ":slug"}
              element={<EnterBankInfo />}
            />
            <Route
              path={urls.confirmReceive() + ":slug"}
              element={<ConfirmReceive />}
            />

            <Route path={urls.refundGift() + ":slug"} element={<RefundGift />} />
            <Route
              path={urls.verifyAccountForRefund() + ":slug"}
              element={<VerifyAccountForRefund />}
            />

            <Route path={urls.terms} element={<TermsConditions />} />
            <Route path={urls.privacy} element={<PrivacyPolicy />} />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </SmoothScrollToTop>
      </BaseLayout>
    </Router>
  );
}

export default App;
