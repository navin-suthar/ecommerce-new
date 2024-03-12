// store.js

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    // Add other reducers here if you have any
  },
});
