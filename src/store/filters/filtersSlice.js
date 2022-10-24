import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  isOpen: false,
  transitionExit: false,

  filtersOn: [],
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

    setFilter: (state, action) => {
      const { filterId, value } = action.payload;
      const index = state.filtersOn.findIndex(
        (array) => array.filterId === filterId && array.value.id === value.id
      );

      if (index >= 0) {
        state.filtersOn.splice(index, 1);
      } else {
        state.filtersOn = [...state.filtersOn, { filterId, value }];
      }
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setTransition: (state, action) => {
      state.transitionExit = action.payload;
    },
  },
});

export const {
  getFilters,
  setIsOpen,
  setTransition,
  setFilter,
  setFilterCondition,
} = filters.actions;
export default filters.reducer;
