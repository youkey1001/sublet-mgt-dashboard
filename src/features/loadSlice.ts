import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface LOAD {
  status: boolean;
}

export const loadSlice = createSlice({
  name: "load",
  initialState: {
    status: false,
  },
  reducers: {
    loading: (state, action: PayloadAction<LOAD>) => {
      state.status = action.payload.status;
    },
  },
});

export const { loading } = loadSlice.actions;

export const selectLoad = (state: RootState) => state.load;

export default loadSlice.reducer;
