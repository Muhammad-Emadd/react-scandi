import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  isOpen: false,
  transitionExit: false,
};

const filters = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const { id: _id, filterValue: _filterValue } = action.payload;

      const itemIndex = state.filters.findIndex(({ id }) => id === _id);
      if (itemIndex >= 0) {
        const { filterValue } = state.filters[itemIndex];
        if (filterValue.includes(_filterValue)) {
          state.filters[itemIndex].filterValue = filterValue.filter(
            (value) => value !== _filterValue
          );
        } else {
          state.filters[itemIndex] = {
            id: _id,
            filterValue: [...filterValue, _filterValue],
          };
        }
      } else {
        state.filters = state.filters.concat({ _id, _filterValue });
      }
      // (state.filters = [...state.filters, action.payload]);
    },

    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setTransition: (state, action) => {
      state.transitionExit = action.payload;
    },
  },
});

export const { setFilters, setIsOpen, setTransition } = filters.actions;
export default filters.reducer;
