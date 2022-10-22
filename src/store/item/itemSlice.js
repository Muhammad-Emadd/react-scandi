import { createSlice } from "@reduxjs/toolkit";
import { LOADING, IDLE } from "../../util/constants";

const initialState = {
  product: null,
  selectedAttributes: {},
  productStatus: LOADING,
};

const products = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.product = action.payload;
      state.productStatus = IDLE;
      state.selectedAttributes = {};
    },
    onErrorGettingProduct: (state, action) => {
      state.productStatus = action.payload;
    },
    setAttributes: (state, action) => {
      state.selectedAttributes += action.payload;
    },
  },
});

export const { getProduct, onErrorGettingProduct, setAttributes } =
  products.actions;
export default products.reducer;
