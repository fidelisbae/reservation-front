import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Reservation } from "src/types/reservation";

// baseUrl 있어야함.
// 엔드포인트 있어야함.

// 여기서 api 설정? ㅇㅇ
export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
  }),
  endpoints: (builder) => ({
    getReservationList: builder.query<Reservation[], string>({
      query: () => `reservations`,
    }),

    postReservation: builder.mutation<Boolean, Reservation>({
      query: (body) => ({
        url: "reservations", // 엔드포인트,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetReservationListQuery, usePostReservationMutation } =
  reservationApi;
