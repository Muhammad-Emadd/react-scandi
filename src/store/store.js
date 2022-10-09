import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categories";
import currenyReducer from "./currencies";
import productsReducer from "./products";
import filtersReducer from "./filters";
import overlayReducer from "./overlay";
import cartReducer from "./cart";
import itemReducer from "./item";

export const store = configureStore({
  reducer: {
    categoryReducer: categoryReducer,
    currenyReducer: currenyReducer,
    productsReducer: productsReducer,
    filtersReducer: filtersReducer,
    overlayReducer: overlayReducer,
    itemReducer: itemReducer,
    cartReducer: cartReducer,
  },
});
