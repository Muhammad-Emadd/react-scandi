import { createSlice } from "@reduxjs/toolkit";
import { LOADING, IDLE } from "../../util/constants";

const initialState = {
  products: [],
  productsStatus: LOADING,
  chosenProduct: null,
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
      state.productsStatus = IDLE;
    },
    onErrorGettingProducts: (state, action) => {
      state.productsStatus = action.payload;
    },
    setProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const { getProducts, onErrorGettingProducts, setProduct } =
  products.actions;
export default products.reducer;
