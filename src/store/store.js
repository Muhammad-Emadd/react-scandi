import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categories";
import currenyReducer from "./currencies";

export const store = configureStore({
  reducer: {
    categoryReducer: categoryReducer,
    currenyReducer: currenyReducer,
  },
});
