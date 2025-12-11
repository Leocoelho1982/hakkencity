import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hakkencity.com/api/game",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    collectPoi: builder.mutation({
      query: (poiId) => ({
        url: `/collect/${poiId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useCollectPoiMutation } = gameApi;
