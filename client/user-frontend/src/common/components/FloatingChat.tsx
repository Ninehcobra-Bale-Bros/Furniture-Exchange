import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { SendOutlined, MessageOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'moment/locale/vi'
import './FloatingChat.scss'

interface Message {
  sender: 'user' | 'recipient'
  content: string
  timestamp: string
}

const FloatingChat: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

  const toggleChat = (): void => {
    setVisible(!visible)
  }

  const handleSendMessage = (): void => {
    if (message.trim()) {
      const newMessage: Message = { sender: 'user', content: message, timestamp: moment().locale('vi').fromNow() }
      setMessages([...messages, newMessage])
      setMessage('')
      // Simulate a response from the recipient
      setTimeout(() => {
        const responseMessage: Message = {
          sender: 'recipient',
          content: 'This is a response.',
          timestamp: moment().locale('vi').fromNow()
        }
        setMessages((prevMessages) => [...prevMessages, responseMessage])
      }, 1000)
    }
  }

  return (
    <div className={`floating-chat ${visible ? 'open' : ''}`}>
      <div className='chat-bubble' onClick={toggleChat}>
        <MessageOutlined />
      </div>
      {visible && (
        <div className='chat-window'>
          <div className='chat-header'>
            <span>Tin nhắn</span>
            <Button type='text' onClick={toggleChat}>
              <i style={{ fontSize: '24px' }} className='fa-regular fa-circle-xmark text-error-2'></i>
            </Button>
          </div>
          <div className='chat-content'>
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
