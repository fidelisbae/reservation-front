import { configureStore } from "@reduxjs/toolkit";

import { reservationSlice } from "./reducer/reservationSlice";
import { reservationApi } from "./services/reservation";

export const store = configureStore({
  reducer: {
    reservation: reservationSlice.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reservationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
