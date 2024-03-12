// productSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    error: null,
    loading: true,
    priceRange: '',
    selectedCategories: new Set(),
    currentPage: 1,
    itemsPerPage: 10,
    saveCount: 0,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.currentPage = 1; // Reset currentPage when changing filters
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
      state.currentPage = 1; // Reset currentPage when changing filters
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    incrementSaveCount: (state) => {
        state.saveCount += 1;
      },
  },
});

export const {
  setData,
  setError,
  setPriceRange,
  setSelectedCategories,
  setCurrentPage,
  incrementSaveCount
} = productSlice.actions;

export default productSlice.reducer;
