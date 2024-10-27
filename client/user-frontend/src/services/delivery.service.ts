import { enviroment } from '@/environments/environment'

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './base.service'
import { IGetUserAllShipmentResponse } from '@/types/delivery'

export const deliveryApi = createApi({
  reducerPath: 'deliveryApi',
  baseQuery: baseQueryWithAuth(`${enviroment.apiUrl}`),
  endpoints: (builder) => ({
    getAllUserShipment: builder.query<IGetUserAllShipmentResponse, void>({
      query: () => ({
        url: '/shipments/user',
        method: 'GET'
      })
    }),
    confirmUserShipment: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/shipments/confirm/${id}`,
        method: 'PATCH'
      })
    })
  })
})
export const { useGetAllUserShipmentQuery } = deliveryApi
