import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const poiApi = createApi({
  reducerPath: "poiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hakkencity.com/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getPois: builder.query({
      query: () => "/pois",
    }),
  }),
});

export const { useGetPoisQuery } = poiApi;
