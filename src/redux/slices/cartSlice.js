import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, currentObj) => {
        return sum + currentObj.price * currentObj.count;
      }, 0);
    },
    minusItems(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, currentObj) => {
        return sum + currentObj.price * currentObj.count;
      }, 0);
    },
    removeItems(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, currentObj) => {
        return sum + currentObj.price * currentObj.count;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, clearItems, removeItems, minusItems } = cartSlice.actions;

export default cartSlice.reducer;
