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

    // ---- CITIES ----
getCities: builder.query({
  query: () => ({
    url: "/cities",
    credentials: "include",
  }),
}),

// ---- ZONES ----
getZones: builder.query({
  query: () => ({
    url: "/zones",
    credentials: "include",
  }),
}),

// ---- POIS ----
getPois: builder.query({
  query: () => ({
    url: "/pois",
    credentials: "include",
  }),
}),

createPoi: builder.mutation({
  query: (body) => ({
    url: "/pois",
    method: "POST",
    body,
    credentials: "include",
  }),
}),

updatePoi: builder.mutation({
  query: ({ id, body }) => ({
    url: `/pois/${id}`,
    method: "PUT",
    body,
    credentials: "include",
  }),
}),

deletePoi: builder.mutation({
  query: (id) => ({
    url: `/pois/${id}`,
    method: "DELETE",
    credentials: "include",
  }),
}),

// ---- ZONES ----


createZone: builder.mutation({
  query: (body) => ({
    url: "/zones",
    method: "POST",
    body,
    credentials: "include",
  }),
}),

updateZone: builder.mutation({
  query: ({ id, body }) => ({
    url: `/zones/${id}`,
    method: "PUT",
    body,
    credentials: "include",
  }),
}),

deleteZone: builder.mutation({
  query: (id) => ({
    url: `/zones/${id}`,
    method: "DELETE",
    credentials: "include",
  }),
}),


// ---- CITIES ----


createCity: builder.mutation({
  query: (body) => ({
    url: "/cities",
    method: "POST",
    body,
    credentials: "include",
  }),
}),

updateCity: builder.mutation({
  query: ({ id, body }) => ({
    url: `/cities/${id}`,
    method: "PUT",
    body,
    credentials: "include",
  }),
}),

deleteCity: builder.mutation({
  query: (id) => ({
    url: `/cities/${id}`,
    method: "DELETE",
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
  useGetCitiesQuery,
  useGetZonesQuery,
  useGetPoisQuery,
  useCreatePoiMutation,
  useUpdatePoiMutation,
  useDeletePoiMutation,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useCreateZoneMutation,
  useUpdateZoneMutation,
  useDeleteZoneMutation,
} = adminApi;
