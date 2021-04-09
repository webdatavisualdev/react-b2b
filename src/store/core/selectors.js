import { Currencies } from "helpers/constants";

export const getCore = (state) => state.core;
export const getFormSubmitted = (state) => state.core.formSubmitted;
export const getDrawerStatus = state => state.core.cartDrawer;
export const getDrawerOpen = (state) => state.core.drawerOpen;
export const getCurrency = (state) => ({
  value: state.core.currency,
  symbol: Currencies[state.core.currency || "USD"]?.symbol,
  decimal: Currencies[state.core.currency || "USD"]?.decimal_digits,
});
