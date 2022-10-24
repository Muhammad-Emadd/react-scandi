import { createSlice } from "@reduxjs/toolkit";
import { FILTERS_OFF, FILTERS_ON } from "../../util/constants";

const initialState = {
  filters: [],
  isOpen: false,
  transitionExit: false,
  condition: FILTERS_OFF,
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
              res.push({ ...val, active: false });
            }
          });
          return { [key]: res };
        }
      );
      state.filters = Object.assign({}, ...filteredAttributes);
    },

    setFilter: (state, action) => {
      const { filterId, value } = action.payload;
      const { filters } = state;
      const index = state.filters[filterId].findIndex(
        ({ id }) => id === value.id
      );
      const newValue = filters[filterId].map((val, i) => {
        return i === index ? { ...val, active: !val.active } : val;
      });

      state.filters = { ...state.filters, [filterId]: newValue };
      state.condition = Object.values(filters).every((value) =>
        value.every(({ active }) => active === false)
      )
        ? FILTERS_OFF
        : FILTERS_ON;
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
