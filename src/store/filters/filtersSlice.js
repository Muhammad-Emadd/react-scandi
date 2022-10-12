import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attributes: [],
  isOpen: false,
  transitionExit: false,
};

const filters = createSlice({
  name: "filters",
  initialState,
  reducers: {
    getAttributes: (state, action) => {
      state.attributes = [...state.attributes, action.payload];
    },

    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setTransition: (state, action) => {
      state.transitionExit = action.payload;
    },
  },
});

export const { getAttributes, setIsOpen, setTransition } = filters.actions;
export default filters.reducer;
