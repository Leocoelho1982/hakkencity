import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hakkencity.com/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // LOGIN ADMIN
    adminLogin: builder.mutation({
      query: (body) => ({
        url: "/admin/login",
        method: "POST",
        body,
        credentials: "include",
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

    // VALIDAR SESSÃO
    adminSession: builder.query({
      query: () => ({
        url: "/admin/me",
        credentials: "include",
      }),
    }),

    // ESTATÍSTICAS
    getCitiesCount: builder.query({
      query: () => ({
        url: "/cities/count",
        credentials: "include",
      }),
    }),

    getZonesCount: builder.query({
      query: () => ({
        url: "/zones/count",
        credentials: "include",
      }),
    }),

    getPoisCount: builder.query({
      query: () => ({
        url: "/pois/count",
        credentials: "include",
      }),
    }),
  }),
});

// ⬇️ EXPORTS CORRETOS
export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAdminSessionQuery,
  useGetCitiesCountQuery,
  useGetZonesCountQuery,
  useGetPoisCountQuery,
} = adminApi;
