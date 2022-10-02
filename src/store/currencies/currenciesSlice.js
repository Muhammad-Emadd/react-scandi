import { createSlice } from "@reduxjs/toolkit";
import { IDLE, LOADING } from "../../util/constants";

const initialState = {
  currencies: [],
  currenciesStatus: LOADING,
  showCurrencyMenu: false,
  chosenCurrency: null,
};

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    getCurrencies: (state, action) => {
      state.currencies = action.payload;
      state.currenciesStatus = IDLE;
    },
    setErrorFetchingCurr: (state, action) => {
      state.currenciesStatus = action.payload;
    },
    toggleCurrencyMenu: (state) => {
      state.showCurrencyMenu = !state.showCurrencyMenu;
    },
    setCurrency: (state, action) => {},
  },
});

export const {
  getCurrencies,
  setErrorFetchingCurr,
  setCurrency,
  toggleCurrencyMenu,
} = currenciesSlice.actions;
export default currenciesSlice.reducer;
