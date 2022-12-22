import * as Yup from "yup";

import { paymentTypes } from "../utils/paymentTypes";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const NUMBER_TXT = "must be a number"
const REQUIRED_TXT = "required"
const EMAIL_TXT = "must be a valid email"
const PHONE_TXT = "must be a valid phone number"
const MAX_TXT = "too long"

export const SendViaEmailFormSchema = Yup.object({
    name: Yup.string().required(REQUIRED_TXT),
    anonymous: Yup.boolean(),
    email: Yup.string().email(EMAIL_TXT).required(REQUIRED_TXT),
    amount: Yup.number(NUMBER_TXT).lessThan(10000001, "must be under 10 million").moreThan(999, "must be 1,000 or more").required(REQUIRED_TXT),
    identifier_type: Yup.string().required().oneOf(
        Object.keys(paymentTypes).map(key=>paymentTypes[key]), "must be valid type"),
    identifier_value: Yup.string().required(REQUIRED_TXT).when("identifier_type", {
        is: paymentTypes.email,
        then: Yup.string().email(EMAIL_TXT)
    }).when("identifier_type", {
        is: paymentTypes.phone,
        then: Yup.string().matches(phoneRegExp, PHONE_TXT)
    }),
    message: Yup.string().max(1000, MAX_TXT),
    terms: Yup.boolean().oneOf([true], REQUIRED_TXT),
});

export const OtpFormSchema = Yup.object({
    otp: Yup.string().required(REQUIRED_TXT).length(6, "must be 6 numbers"),
});

export const EnterBankInfoFormSchema = Yup.object({
    bank: Yup.string().required(REQUIRED_TXT), // TODO: make this oneOf
    account_number: Yup.string().required(REQUIRED_TXT).length(10, "must be 10 numbers"),
    account_name_resolved: Yup.bool().required(REQUIRED_TXT).oneOf([true], REQUIRED_TXT)
});
