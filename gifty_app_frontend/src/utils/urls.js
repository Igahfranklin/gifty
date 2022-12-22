export const urls = {
  home: "/",
  initiateSend: "/initiate-send",
  sendForm: (type = "") => "/send-form/" + type,
  giftSent: "/gift-sent",
  receiveGift: (slug = "") => "/receive-gift/" + slug,
  verifyAccount: (slug = "") => "/verify-account/" + slug,
  enterBankInfo: (slug = "") => "/enter-bank-info/" + slug,
  confirmReceive: (slug = "") => "/confirm-receive/" + slug,
  refundGift: (slug = "") => "/refund-gift/" + slug,
  verifyAccountForRefund: (slug = "") => "/verify-account-refund/" + slug,
  igAuth: "/ig-auth",
  terms: "/terms",
  privacy: "/privacy",
};

export function generateFullReceiveGiftUrl(slug) {
  return (
    window.location.protocol +
    "//" +
    window.location.host +
    urls.receiveGift(slug)
  );
}

const BASE_API_URL = "http://127.0.0.1/api/v1/";

export const apiUrls = {
  sendPayment: BASE_API_URL + "send-payment/",
  confirmPayment: (reference) =>
    BASE_API_URL + "verify-payment/" + reference + "/",
  getGiftDetails: (slug) => BASE_API_URL + "get-gift-details/" + slug + "/",
  claimGift: (slug) => BASE_API_URL + "claim-gift/" + slug + "/",
  verifyOtp: (slug) => BASE_API_URL + "verify-otp/" + slug + "/",
  getBankList: BASE_API_URL + "get-bank-list/",
  resolveBankAccount: BASE_API_URL + "resolve-bank-account/",
  confirmReceive: (slug) => BASE_API_URL + "confirm-receive/" + slug + "/",
  authIg: (slug) => BASE_API_URL + "auth-ig/" + slug + "/",
  refundGift: (slug) => BASE_API_URL + "refund-gift/" + slug + "/",
};
