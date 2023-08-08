import { createSlice } from "@reduxjs/toolkit";

export const recordsSlice = createSlice({
  name: "records",
  initialState: {
    items: [],
  },
  reducers: {
    addRecord: (state, action) => {
      let record = action.payload;
      state.items.push(record);
    },
  },
});
