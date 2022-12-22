import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import Header from "../../components/Header";
import CenteredLayout from "../../layouts/CenteredLayout";
import PrimaryFormButton from "../../components/PrimaryFormButton";
import { urls, apiUrls } from "../../utils/urls";
import { SendViaEmailFormSchema } from "../../utils/yupSchemas";
import { baseConfig as config } from "../../utils/apiCalls";
import TextInput from "../../components/forms/inputs/TextInput";
import CheckInput from "../../components/forms/inputs/CheckInput";
import TextArea from "../../components/forms/inputs/TextArea";
import SelectInput from "../../components/forms/inputs/SelectInput";
import { GiftSentSuccessIconWhite } from "../../assets/svg-components";
import { calculateFee } from "../../utils/calc";
import { paymentTypes } from "../../utils/paymentTypes";

import { countryExts } from "../../utils/phoneExt";

// const countryExts = [
//   {
//     ext: 234,
//     title: "234 - NG",
//   },
//   {
//     ext: 1,
//     title: "1 - USA",
//   },
//   {
//     ext: 44,
//     title: "44 - UK",
//   },
// ];

// TODO: validate phone number on Twilio
export default function SendForm() {
  const { type } = useParams();

  return (
    <>
      <Header>Send Gift with {type}</Header>
      <CenteredLayout>
        <Formik
          initialValues={{
            name: "",
            anonymous: false,
            email: "",
            amount: 1000,
            phone_ext: countryExts[0].ext,
            identifier_type: type,
            identifier_value: "",
            message: "",
            terms: false,
          }}
          validationSchema={SendViaEmailFormSchema}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            if (type === paymentTypes.email) {
              values = {
                ...values,
                receiver_email: values.identifier_value,
              };
            } else if (type === paymentTypes.phone) {
              values = {
                ...values,
                receiver_phone: values.identifier_value,
              };
            } else if (type === paymentTypes.instagram) {
              values = {
                ...values,
                receiver_instagram: values.identifier_value,
              };
            } else if (type === paymentTypes.twitter) {
              values = {
                ...values,
                receiver_twitter: values.identifier_value,
              };
            }

            try {
              const response = await axios
                .post(apiUrls.sendPayment, JSON.stringify(values), config)
                .then((res) => {
                  if (res.status === 200) {
                    const authorizationURI =
                      res.data.data.data.authorization_url;
                    window.location = authorizationURI;
                  }
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
            <Form className="w-full bg-whiteSmoke rounded-[10px] my-24 p-5 grid grid-cols-1 gap-y-4">
              <TextInput
                label="Your name/username"
                name="name"
                type="text"
                placeholder="Enter a name the receiver knows"
              />
              <CheckInput name="anonymous">
                <span className="pl-2">
                  Anonymous: do not show the receiver my details (Optional)
                </span>
              </CheckInput>
              <TextInput
                label="Your email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />

              <hr className="border-primary_faded" />

              <TextInput
                label="Gift amount (₦)"
                name="amount"
                type="number"
                step="1000"
                min={1000}
                max={1000000}
                data-testid="amount"
              />
              <p className="text-[0.8em]">
                Fee: ₦{calculateFee(values.amount).toLocaleString()}
              </p>

              {type === paymentTypes.email && (
                <TextInput
                  label="Receiver's email"
                  name="identifier_value"
                  type="email"
                  placeholder="Enter receiver's email"
                />
              )}
              {type === paymentTypes.phone && (
                <div className="grid grid-cols-4 gap-x-1">
                  <SelectInput label="Ext." name="phone_ext">
                    {countryExts.map((ext, i) => (
                      <option key={i} value={ext.phone_code}>
                        {ext.country_name} - {ext.phone_code}
                      </option>
                    ))}
                  </SelectInput>
                  <div className="col-span-3">
                    <TextInput
                      label="Receiver's phone number"
                      name="identifier_value"
                      type="tel"
                      placeholder="Enter receiver's phone number"
                    />
                  </div>
                </div>
              )}
              {type === paymentTypes.instagram && (
                <TextInput
                  label="Receiver's Instagram"
                  name="identifier_value"
                  type="text"
                  placeholder="Enter receiver's Instagram username"
                />
              )}
              {type === paymentTypes.twitter && (
                <TextInput
                  label="Receiver's Twitter"
                  name="identifier_value"
                  type="text"
                  placeholder="Enter receiver's Twitter username"
                />
              )}

              <TextArea
                label="Message (Optional)"
                name="message"
                placeholder="Enter a message for receiver"
                cols="30"
                rows="6"
              />

              <CheckInput name="terms" data-testid="terms">
                <span className="pl-2">
                  I have read the{" "}
                  <Link to={urls.terms} className="text-primary">
                    terms
                  </Link>{" "}
                  and{" "}
                  <Link to={urls.privacy} className="text-primary">
                    privacy
                  </Link>{" "}
                  policies
                </span>
              </CheckInput>

              {status &&
                status.non_field_errors &&
                status.data.map((err, i) => (
                  <p key={i} className="text-red-500">
                    {err}
                  </p>
                ))}

              <PrimaryFormButton
                disabled={isSubmitting || !isValid || !dirty}
                additionalClassNames="flex justify-center items-center gap-2 bg-primary text-white font-bold text-[18px]"
              >
                <span>Send Gift</span>
                <GiftSentSuccessIconWhite />
              </PrimaryFormButton>

              <p className="text-center text-[0.8em]">
                If gift is not claimed within 7 days, it will be refunded back
                to you
              </p>
            </Form>
          )}
        </Formik>
      </CenteredLayout>
    </>
  );
}
