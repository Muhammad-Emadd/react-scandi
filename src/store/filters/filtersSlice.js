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
      const { productAttributes } = action.payload;

      // flatten attributes
      const allAttributes = productAttributes
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
              res.push({ ...val, view: false });
            }
          });
          return { [key]: res };
        }
      );
      state.filters = Object.assign({}, ...filteredAttributes);
    },

    setFilter: (state, action) => {
      const { filterId, value } = action.payload;
      const index = state.filters[filterId].findIndex(
        ({ id }) => id === value.id
      );
      const newValue = state.filters[filterId].map((val, i) => {
        return i === index ? { ...val, view: !val.view } : val;
      });
      state.filters = { ...state.filters, filterId: newValue };
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
