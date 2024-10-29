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
        url: '/delivery/user',
        method: 'GET'
      })
    }),
    confirmUserShipment: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/delivery/user/confirm/${id}`,
        method: 'PATCH'
      })
    }),
    cancelUserShipment: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/delivery/user/cancel/${id}`,
        method: 'PATCH'
      })
    })
  })
})
export const { useGetAllUserShipmentQuery, useConfirmUserShipmentMutation, useCancelUserShipmentMutation } = deliveryApi
