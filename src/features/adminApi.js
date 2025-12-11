import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hakkencity.com/api",
    credentials: "include", // envia cookies em todas as requests
  }),

  endpoints: (builder) => ({
    // LOGIN ADMIN
    adminLogin: builder.mutation({
      query: (body) => ({
        url: "/admin/login",
        method: "POST",
        body,
        credentials: "include", // garante que cookie httpOnly é recebido
      }),
    }),

    // LOGOUT ADMIN
    adminLogout: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    // ESTATÍSTICAS
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
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useGetCitiesCountQuery,
  useGetZonesCountQuery,
  useGetPoisCountQuery,
} = adminApi;
