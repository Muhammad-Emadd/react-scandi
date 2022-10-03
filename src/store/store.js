import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categories";
import currenyReducer from "./currencies";
import productsReducer from "./products";
import overlayReducer from "./overlay";
import cartReducer from "./cart";

export const store = configureStore({
  reducer: {
    categoryReducer: categoryReducer,
    currenyReducer: currenyReducer,
    productsReducer: productsReducer,
    overlayReducer: overlayReducer,
    cartReducer: cartReducer,
  },
});
