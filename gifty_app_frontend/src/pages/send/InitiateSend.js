import PrimaryButton from "../../components/PrimaryButton";
import CenteredLayout from "../../layouts/CenteredLayout";
import Leading from "../../components/Leading";
import { PhoneIcon, SmsIcon, InstagramIcon } from "../../assets/svg-components";
import { urls } from "../../utils/urls";
import { paymentTypes } from "../../utils/paymentTypes";

const InitiateSend = () => {
  return (
    <CenteredLayout>
      <Leading />

      <div className="w-full bg-whiteSmoke p-5 rounded-[15px] grid grid-cols-1 gap-y-4">
        <PrimaryButton
          data-testid="emailBtn"
          to={urls.sendForm(paymentTypes.email)}
          additionalClassNames="flex justify-center items-center gap-2 bg-primary text-white font-bold text-[16px]"
        >
          <SmsIcon />
          <span>Send with Email</span>
        </PrimaryButton>
        <PrimaryButton
          to={urls.sendForm(paymentTypes.phone)}
          additionalClassNames="flex justify-center items-center gap-2 bg-white border-2 border-primary font-bold text-[16px] text-primary"
        >
          <PhoneIcon />
          <span>Send with Phone Number</span>
        </PrimaryButton>
        <PrimaryButton
          to={urls.sendForm(paymentTypes.instagram)}
          additionalClassNames="flex justify-center items-center gap-2 bg-white border-2 border-primary font-bold text-[16px] text-primary"
        >
          <InstagramIcon />
          <span>Send with Instagram</span>
        </PrimaryButton>
        {/* <PrimaryButton to={urls.sendForm(paymentTypes.twitter)} additionalClassNames="flex justify-center items-center gap-2 bg-white border-2 border-primary font-bold text-[16px] text-primary">
                    <TwitterIcon />
                    <span>Send with Twitter</span>
                </PrimaryButton> */}
        {/* <p className="my-5">
                    Already have an account?
                    <Link to="/login">
                        <span className="text-primary"> Login</span>
                    </Link>
                </p> */}
      </div>
    </CenteredLayout>
  );
};

export default InitiateSend;
