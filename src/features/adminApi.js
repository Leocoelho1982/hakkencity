import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hakkencity.com/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getCitiesCount: builder.query({
      query: () => "/cities/count",
    }),
    getZonesCount: builder.query({
      query: () => "/zones/count",
    }),
    getPoisCount: builder.query({
      query: () => "/pois/count",
    }),
  }),
});

export const {
  useGetCitiesCountQuery,
  useGetZonesCountQuery,
  useGetPoisCountQuery,
} = adminApi;
