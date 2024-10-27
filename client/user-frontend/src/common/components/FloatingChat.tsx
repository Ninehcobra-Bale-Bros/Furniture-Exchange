import React, { useEffect, useState, useRef } from 'react'
import { Button, Input } from 'antd'
import { SendOutlined, MessageOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'moment/locale/vi'
import './FloatingChat.scss'
import { IUser } from '@/types/user'
import { IProduct } from '@/types/product'
import socketService from '@/services/socket.service'
import { useGetUserConversationsQuery, useUseGetConversationByOtherUserIdQuery } from '@/services/conversation.service'
import { IConversation } from '@/types/conversation'

interface Message {
  sender: 'user' | 'recipient'
  content: string
  timestamp: string
}

const FloatingChat = ({
  isVisible,
  toggleChat,
  user,
  product,
  accessToken
}: {
  isVisible: boolean
  toggleChat: () => void
  user: IUser
  product: IProduct
  accessToken: string
}): React.ReactNode => {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedConversation, setSelectedConversation] = useState<IConversation>()

  const { data: conversations, isSuccess } = useGetUserConversationsQuery()
  const { data: conversationMessages, isSuccess: isConversationMessagesSuccess } =
    useUseGetConversationByOtherUserIdQuery(product.seller_id)

  const chatContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSuccess && conversations) {
      const conversation = conversations.conversations.find(
        (conv: IConversation) => conv.other?.id === product.seller_id
      )
      if (conversation) {
        setSelectedConversation(conversation)
      }
    }
  }, [isSuccess, conversations, product.seller_id])

  useEffect(() => {
    if (isConversationMessagesSuccess && conversationMessages) {
      const formattedMessages = conversationMessages.messages.map((msg) => ({
        sender: msg.sender_id === user.id ? 'user' : 'recipient',
        content: msg.content,
        timestamp: moment(msg.created_at).locale('vi').fromNow()
      })) as Message[]
      setMessages(formattedMessages)
    }
  }, [isConversationMessagesSuccess, conversationMessages, user.id])

  useEffect(() => {
    setTimeout(() => {
      if (chatContentRef.current) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight
      }
    }, 1)
  }, [isVisible])

  useEffect(() => {
    socketService.connect()

    if (conversations?.conversation_name) {
      socketService.listen(conversations.conversation_name, (data: { other_id: string; content: string }) => {
        console.log(data)
        const newMessage: Message = {
          sender: data.other_id === user.id ? 'user' : 'recipient',
          content: data.content,
          timestamp: moment().locale('vi').fromNow()
        }
        setMessages((prevMessages) => [...prevMessages, newMessage])
      })
    }

    return (): void => {
      socketService.disconnect()
    }
  }, [isSuccess, conversations?.conversation_name, user.id])

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (): void => {
    if (message.trim()) {
      const newMessage: Message = { sender: 'user', content: message, timestamp: moment().locale('vi').fromNow() }
      socketService.sendMessage({
        content: message,
        other_id: product.seller_id,
        product: product.id
      })
      setMessages([...messages, newMessage])
      setMessage('')
    }
  }

  return (
    <div className={`floating-chat ${isVisible ? 'open' : ''}`}>
      <div className='chat-bubble' onClick={toggleChat}>
        <MessageOutlined />
      </div>
      {isVisible && (
        <div className='chat-window'>
          <div className='chat-header'>
            <span>Tin nhắn với người bán</span>
            <Button type='text' onClick={toggleChat}>
              <i style={{ fontSize: '24px' }} className='fa-regular fa-circle-xmark text-error-2'></i>
            </Button>
          </div>
          <div className='chat-content' ref={chatContentRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <div className='message-content'>{msg.content}</div>
                <div className='message-timestamp'>{msg.timestamp}</div>
              </div>
            ))}
          </div>

          <div className='chat-input'>
            <Input
              placeholder='Type a message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={handleSendMessage}
              suffix={<Button type='primary' icon={<SendOutlined />} onClick={handleSendMessage} />}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default FloatingChat
