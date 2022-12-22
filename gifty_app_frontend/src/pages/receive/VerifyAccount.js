import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import CenteredLayout from "../../layouts/CenteredLayout";
import { Formik, Form } from "formik";
import PrimaryFormButton from "../../components/PrimaryFormButton";
import { urls, apiUrls } from "../../utils/urls";
import { OtpFormSchema } from "../../utils/yupSchemas";
import { baseConfig as config } from "../../utils/apiCalls";
import TextInput from "../../components/forms/inputs/TextInput";

import useTimer from "../../hooks/timer";
import { reload } from "../../utils/helper";
import { paymentTypes } from "../../utils/paymentTypes";
import { DAYS_FOR_REFUND } from "../../utils/helper";
import ErrorPage from "../../components/ErrorPage";

export default function VerifyAccount() {
  const [code, setCode] = useState();
  const [err, setErr] = useState();
  const [payment, setPayment] = useState();
  const { timer } = useTimer(5 * 60); // 5 minutes
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          await axios
            .post(apiUrls.claimGift(slug), config)
            .then((res) => setPayment(res.data.data))
            .catch((err) => {
              if (err.response.status === 400) {
                setErr(err.response.data.status);
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

  if (payment.receiver_type.toLowerCase() === paymentTypes.instagram) {
    const state = {
      slug,
    };
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${process.env.REACT_APP_INSTAGRAM_ID}&redirect_uri=https://${window.location.host}${urls.igAuth}&scope=user_profile,user_media,instagram_graph_user_profile&response_type=code&state=${JSON.stringify(state)}`;
  }

  return (
    <>
      <Header>Claim Gift</Header>
      <CenteredLayout>
        {(payment.receiver_type.toLowerCase() === paymentTypes.email ||
          payment.receiver_type.toLowerCase() === paymentTypes.phone) && (
          <div className="w-full bg-lavenderBlush rounded-[10px] my-24 p-5 grid grid-cols-1 gap-y-4">
            <div className="text-center">
              <p>Enter the One Time Password (OTP) sent to</p>
              <p>
                <b>{payment.receiver_type_value}</b>
              </p>
              <p className="my-3">
                <b>
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </b>
              </p>
            </div>
            <Formik
              initialValues={{
                otp: "",
              }}
              validationSchema={OtpFormSchema}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  const response = await axios
                    .post(
                      apiUrls.verifyOtp(slug),
                      JSON.stringify(values),
                      config
                    )
                    .then((res) => {
                      navigate(urls.enterBankInfo(slug), {
                        state: {
                          otp: values.otp,
                        },
                      });
                    })
                    .catch((err) => {
                      if (err.response.status === 400) {
                        setErrors(err.response.data);
                        if ("non_field_errors" in err.response.data) {
                          setStatus({
                            non_field_errors: true,
                            data: err.response.data.non_field_errors,
                          });
                        }
                      } else {
                        console.log(err);
                      }
                    });
                } catch (err) {
                  console.log(err);
                }
                setSubmitting(false);
              }}
            >
              {({ values, status, isSubmitting, isValid, dirty }) => (
                <Form className="grid grid-cols-1 gap-y-4">
                  <TextInput
                    label=""
                    name="otp"
                    type="text"
                    placeholder="Enter OTP"
                  />

                  {status &&
                    status.non_field_errors &&
                    status.data.map((err) => (
                      <p className="text-red-500">{err}</p>
                    ))}

                  <PrimaryFormButton
                    data-testid="otpButton"
                    disabled={isSubmitting || !isValid || !dirty}
                    additionalClassNames="flex justify-center items-center gap-2 bg-primary text-white font-bold text-[18px]"
                  >
                    <span>Verify Account</span>
                  </PrimaryFormButton>
                  <p className="text-[0.8em]">
                    Didn't get OTP?{" "}
                    <button
                      type="button"
                      onClick={reload}
                      className="text-primary"
                    >
                      Resend it
                    </button>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </CenteredLayout>
    </>
  );
}
