import { createSlice } from "@reduxjs/toolkit";
import { IDLE, LOADING } from "../../util/constants";

const initialState = {
  categories: [],
  categoriesStatus: LOADING,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload;
      state.categoriesStatus = IDLE;
    },
    setErrorFetchingCat: (state, action) => {
      state.categoriesStatus = action.payload;
    },
    setCategory: (state, action) => {},
  },
});

export default categoriesSlice.reducer;
export const { getCategories, setErrorFetchingCat, setCategory } =
  categoriesSlice.actions;
