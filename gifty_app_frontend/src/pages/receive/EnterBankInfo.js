import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, useFormikContext } from "formik";
import { CurrencyFormatter } from "../../utils/currencyFormatter";
import { SendMoreGiftIconWhite } from "../../assets/svg-components";
import Header from "../../components/Header";
import CenteredLayout from "../../layouts/CenteredLayout";
import { urls, apiUrls } from "../../utils/urls";
import { baseConfig as config } from "../../utils/apiCalls";
import { EnterBankInfoFormSchema } from "../../utils/yupSchemas";
import TextInput from "../../components/forms/inputs/TextInput";

import SelectInput from "../../components/forms/inputs/SelectInput";
import PrimaryFormButton from "../../components/PrimaryFormButton";
import ErrorPage from "../../components/ErrorPage";

function DisplayAccountName() {
  const {
    values: { bank, account_number }, //account_name_resolved

    setFieldValue,
  } = useFormikContext();

  const [bankInfo, setBankInfo] = useState();
  const [loading, setLoading] = useState(false);

  const resolveBankAccount = async () => {
    setLoading(true);
    try {
      const response = await axios
        .post(
          apiUrls.resolveBankAccount,
          JSON.stringify({ bank, account_number }),
          config
        )
        .then((res) => setBankInfo(res.data.data))
        .catch((err) => {
          if (err.response.status === 400) {
            console.log(err);
          } else if (err.response.status === 404) {
            setBankInfo(err.response.data);
          } else {
            console.log(err);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setBankInfo();
    if (bank && account_number && account_number.length === 10) {
      resolveBankAccount();
    }
  }, [bank, account_number]);

  useEffect(() => {
    setFieldValue(
      "account_name_resolved",
      bankInfo && bankInfo.account_name ? true : false
    );
  }, [bankInfo]);

  return (
    <span className="text-gray-400">
      {loading ? (
        <i>Loading...</i>
      ) : bankInfo ? (
        bankInfo.account_name ? (
          bankInfo.account_name
        ) : (
          bankInfo.status
        )
      ) : (
        <i>Confirm account name displayed here</i>
      )}
    </span>
  );
}

export default function EnterBankInfo() {
  const [bankList, setBankList] = useState();
  const [payment, setPayment] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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

    (async () => {
      try {
        await axios
          .get(apiUrls.getBankList, config)
          .then((res) => setBankList(res.data.data))
          .catch((err) => {
            if (err.response.status === 400) {
              console.log(err);
            } else {
              console.log(err);
            }
          });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [slug]);

  if (err) return <ErrorPage text={err} />;

  // if (!location.state || !location.state.otp) navigate(urls.receiveGift(slug));

  if (!payment || !bankList) return <></>;

  return (
    <>
      <Header>Enter Bank Account Details</Header>
      <CenteredLayout>
        <div className="w-full bg-lavenderBlush rounded-[10px] my-24 p-5 grid grid-cols-1 gap-y-4">
          <p>
            Enter account details to receive{" "}
            <b>{CurrencyFormatter.format(payment?.amount)}</b> from{" "}
            <b>{payment.sender_name ? payment.sender_name : "Anonymous"}</b>.
          </p>
          <Formik
            initialValues={{
              bank: "",
              account_number: "",
              account_name_resolved: false,
              otp: location.state?.otp,
            }}
            validationSchema={EnterBankInfoFormSchema}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                axios
                  .post(
                    apiUrls.confirmReceive(slug),
                    JSON.stringify(values),
                    config
                  )
                  .then((res) => navigate(urls.confirmReceive(slug)))
                  .catch((err) => {
                    if (err.response.status === 400) {
                      setErrors(err.response.data);
                      if ("status" in err.response.data) {
                        setStatus({
                          non_field_errors: true,
                          data: [err.response.data.status], // array expected
                        });
                      }
                      if ("non_field_errors" in err.response.data) {
                        setStatus({
                          non_field_errors: true,
                          data: err.response.data.non_field_errors,
                        });
                      }
                      if ("otp" in err.response.data) {
                        setStatus({
                          non_field_errors: true,
                          data: err.response.data.otp,
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
                <SelectInput label="Bank Name" name="bank">
                  <option value={""}>-- Select bank --</option>
                  {bankList.map((bank, i) => (
                    <option key={i} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </SelectInput>

                <TextInput
                  label="Enter Account Number"
                  name="account_number"
                  type="text"
                  placeholder="0000000000"
                />

                <p>
                  <b>Account Name:</b> <DisplayAccountName />
                </p>

                {status &&
                  status.non_field_errors &&
                  status.data.map((err) => (
                    <p className="text-red-500">{err}</p>
                  ))}

                <PrimaryFormButton
                  disabled={isSubmitting || !isValid || !dirty}
                  additionalClassNames="flex justify-center items-center gap-2 bg-primary text-white font-bold text-[18px]"
                >
                  <SendMoreGiftIconWhite />
                  <span>Claim Gift</span>
                </PrimaryFormButton>
              </Form>
            )}
          </Formik>
        </div>
      </CenteredLayout>
    </>
  );
}
