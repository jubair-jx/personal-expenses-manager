import { configureStore } from "@reduxjs/toolkit";
import transctionSlice from "../features/transctionSlice";

const store = configureStore({
  reducer: {
    transctionReducer: transctionSlice,
  },
});
export default store;
