import { configureStore } from "@reduxjs/toolkit";
import reminderReducer from "./features/reminderSlicd";

export default configureStore({
  reducer: {
    reminder: reminderReducer,
  },
});
