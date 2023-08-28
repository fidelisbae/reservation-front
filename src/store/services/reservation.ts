import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Reservation } from "src/types/reservation";

// baseUrl 있어야함.
// 엔드포인트 있어야함.

export const reservationApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getReservationList: builder.query<Reservation[], string>({
      query: (name) => `pokemon/${name}`,
    }),
    postReservation: builder.mutation<Boolean, Reservation>({
      query: (body) => ({
        url: "/엔드포인트 받기", // 엔드포인트,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetReservationListQuery, usePostReservationMutation } =
  reservationApi;
