import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  overlay: false,
};

const bodyOverlay = createSlice({
  name: "bodyOverlay",
  initialState,
  reducers: {
    setBodyOverlay: (state, action) => {
      state.overlay = action.payload;
    },
  },
});

export const { setBodyOverlay } = bodyOverlay.actions;
export default bodyOverlay.reducer;
