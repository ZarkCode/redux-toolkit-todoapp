import { configureStore } from "@reduxjs/toolkit";
import recordsSlice from "./recordSlice.js";

export const store = configureStore({
  reducer: {
    records: recordsSlice,
  },
});
