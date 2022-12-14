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
    getFilters: (state, action) => {
      // flatten attributes
      const allAttributes = action.payload
        .reduce(
          (previousValue, currentValue) => [
            ...previousValue,
            ...currentValue.attributes,
          ],
          []
        )
        // combinning attributes values with the same kay
        .reduce((prevObject, current) => {
          const key = current.id;
          const curGroup = prevObject[key] ?? [];
          return { ...prevObject, [key]: [...curGroup, ...current.items] };
        }, {});

      // filtering similar values in same attribute
      const filteredAttributes = Object.entries(allAttributes).map(
        ([key, value]) => {
          const check = {};
          const res = [];
          value.forEach((val) => {
            if (!check[val.id]) {
              check[val.id] = true;
              res.push({ ...val });
            }
          });
          return { [key]: res };
        }
      );
      state.filters = Object.assign({}, ...filteredAttributes);
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setTransition: (state, action) => {
      state.transitionExit = action.payload;
    },
  },
});

export const { getFilters, setIsOpen, setTransition, setFilter } =
  filters.actions;
export default filters.reducer;
