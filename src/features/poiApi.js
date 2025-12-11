import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const poiApi = createApi({
  reducerPath: "poiApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hakkencity.com/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // LISTAR POIS
    getPois: builder.query({
      query: () => "/pois",
    }),

    // TOTAL DE MOEDAS (soma dos coins de POIs recolhidos)
    getCoinsTotal: builder.query({
      query: () => "/pois/coins/total",
    }),
  }),
});

export const { useGetPoisQuery, useGetCoinsTotalQuery } = poiApi;
