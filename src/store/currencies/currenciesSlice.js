import { createSlice } from "@reduxjs/toolkit";
import { IDLE, LOADING } from "../../util/constants";

const initialState = {
  currencies: [],
  currenciesStatus: LOADING,
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
    setCurrency: (state, action) => {},
  },
});

export const { getCurrencies, setErrorFetchingCurr, setCurrency } =
  currenciesSlice.actions;
export default currenciesSlice.reducer;
