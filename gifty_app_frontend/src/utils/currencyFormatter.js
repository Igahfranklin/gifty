let location = "en-NG";
export const CurrencyFormatter = new Intl.NumberFormat(location, {
  currency: "NGN",
  style: "currency",
  minimumFractionDigits: 0,
});
