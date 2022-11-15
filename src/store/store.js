import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categories";
import currenyReducer from "./currencies";
import productsReducer from "./products";
import filtersReducer from "./filters";
import overlayReducer from "./overlay";
import cartReducer from "./cart";
import itemReducer from "./item";
import { saveState, loadState } from "../util/localStorage";

const persistedState = loadState();
const previousState =
  persistedState === undefined
    ? {}
    : {
        cartReducer: {
          items: persistedState.items,
          itemsCount: persistedState.itemsCount,
          totalPrice: persistedState.totalPrice,
        },
        currenyReducer: {
          chosenCurrency: persistedState.chosenCurrency,
        },
      };

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
  preloadedState: previousState,
});
store.subscribe(() => {
  saveState({
    chosenCurrency: store.getState().currenyReducer.chosenCurrency,
    items: store.getState().cartReducer.items,
    itemsCount: store.getState().cartReducer.itemsCount,
    totalPrice: store.getState().cartReducer.totalPrice,
  });
});
