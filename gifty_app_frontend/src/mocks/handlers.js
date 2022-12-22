import { rest } from "msw";

const BASE_API_URL = "http://127.0.0.1/api/v1/";

const recieveGift = () => {
  return rest.get(BASE_API_URL + "get-gift-details/rr_12", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          sender_name: "franklin",
          sender_email: "testuser@gmail.com",
          receiver_type: "email",
          amount: "1000",
          receiver_type_value: "igahfranklin@gmail.com",
          slug: "rr_121422102446e83l1z8urt",
          message: "test gift value",
          anonymous: false,
        },
      ])
    );
  });
};

// send gift
const sendGift = () => {
  return rest.post(BASE_API_URL + "send-payment/", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        authorizationUrl: "https://checkout.paystack.com/test_paymentRef",
      })
    );
  });
};

// verify payment
const verifyPayment = () => {
  return rest.post(BASE_API_URL + "send-payment/", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sender_name: "franklin",
        sender_email: "testuser@gmail.com",
        receiver_type: "email",
        amount: "1000",
        receiver_type_value: "igahfranklin@gmail.com",
        slug: "rr_121422102446e83l1z8urt",
        message: "test gift value",
        anonymous: false,
      })
    );
  });
};

export const handlers = [recieveGift(), sendGift(), verifyPayment()];
