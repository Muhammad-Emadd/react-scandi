import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemsCount: 0,
  totalPrice: {},
  showCartMenu: false,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartMenu: (state, action) => {
      state.showCartMenu = action.payload;
    },
    addProductToCart: (state, action) => {
      const {
        id: _id,
        attributes: _attributes,
        prices: _prices,
      } = action.payload;

      const itemIndex = state.items.findIndex(({ id, attributes }) => {
        return (
          id === _id &&
          JSON.stringify(attributes) === JSON.stringify(_attributes)
        );
      });

      if (itemIndex >= 0) state.items[itemIndex].count++;
      else {
        state.items.push({ count: 1, ...action.payload });
        state.itemsCount++;
      }

      const newPrices = _prices.reduce(
        (obj, { amount, currency: { label } }) => ((obj[label] = amount), obj),
        {}
      );

      const priceKeys = Object.keys(state.totalPrice);
      if (priceKeys.length === 0) state.totalPrice = newPrices;
      else
        priceKeys.forEach((key) => (state.totalPrice[key] += newPrices[key]));
    },
    removeProductFromCart: (state, action) => {
      const {
        id: _id,
        attributes: _attributes,
        prices: _prices,
      } = action.payload;

      const itemIndex = state.items.findIndex(({ id, attributes }) => {
        return (
          id === _id &&
          JSON.stringify(attributes) === JSON.stringify(_attributes)
        );
      });

      if (state.items[itemIndex].count === 1) {
        state.items.splice(itemIndex, 1);
        state.itemsCount--;
      } else state.items[itemIndex].count--;
      const newPrices = _prices.reduce(
        (obj, { amount, currency: { label } }) => ((obj[label] = amount), obj),
        {}
      );
      const priceKeys = Object.keys(state.totalPrice);
      priceKeys.forEach((key) => (state.totalPrice[key] -= newPrices[key]));
      if (state.totalPrice[priceKeys[0]] === 0) state.totalPrice = {};
    },
  },
});

export const { addProductToCart, removeProductFromCart, toggleCartMenu } =
  cart.actions;
export default cart.reducer;
//0846361859 - 0846314700 - 01006600360
