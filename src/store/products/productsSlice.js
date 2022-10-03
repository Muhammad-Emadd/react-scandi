import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = products.actions;
export default products.reducer;
