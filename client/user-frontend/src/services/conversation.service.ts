import { enviroment } from '@/environments/environment'

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './base.service'
import { IConversationResponse, IGetConversationResponse } from '@/types/conversation'

export const conversationApi = createApi({
  reducerPath: 'conversationApi',
  baseQuery: baseQueryWithAuth(`${enviroment.apiUrl}`),
  endpoints: (builder) => ({
    getUserConversations: builder.query<IGetConversationResponse, void>({
      query: () => ({
        url: '/conversations',
        method: 'GET'
      })
    }),
    useGetConversationByOtherUserId: builder.query<IConversationResponse, string>({
      query: (otherUserId) => ({
        url: `/conversations/${otherUserId}/user`,
        method: 'GET'
      })
    }),
    getConversationByProductId: builder.query<IConversationResponse, string>({
      query: (productId) => ({
        url: `/conversations/${productId}/product`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetConversationByProductIdQuery,
  useGetUserConversationsQuery,
  useUseGetConversationByOtherUserIdQuery
} = conversationApi
