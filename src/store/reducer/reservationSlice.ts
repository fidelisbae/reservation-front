import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Reservation } from "../../types/reservation";
import { reservationApi } from "../services/reservation";

const initialState = {
  reservationList: [] as Reservation[],
  value: 0,
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    //GetStoreIDValidateStatus
    builder.addMatcher(
      reservationApi.endpoints.getReservationList.matchFulfilled,
      (state, action) => {
        state.reservationList = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { incrementByAmount } = reservationSlice.actions;

export default reservationSlice.reducer;
