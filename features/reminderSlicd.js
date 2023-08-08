import { createSlice } from "@reduxjs/toolkit";
import { createElement } from "react";
import { getItem, getRemindingTimes } from "../storage/database";

const loadInitialStateFromStorage = async () => {
  try {
    const storedData = await getRemindingTimes();

    return storedData ? storedData : [];
  } catch (error) {
    console.log(error);
  }
};
export const reminderSlice = createSlice({
  name: "reminder",
  initialState: {
    items: loadInitialStateFromStorage(),
  },
  reducers: {
    addRemindingTimes: (state, action) => {
      state.items._j.push(action.payload);
    },
  },
});

export const { addRemindingTimes } = reminderSlice.actions;
export default reminderSlice.reducer;
