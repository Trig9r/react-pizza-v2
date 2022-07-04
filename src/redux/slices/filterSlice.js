import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sortItem: { name: 'популярности', sortProperty: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortItem(state, action) {
      state.sortItem = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortItem = action.payload.sortItem;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const { setCategoryId, setSortItem, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
