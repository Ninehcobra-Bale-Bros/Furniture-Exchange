// src/services/socketService.ts
import { enviroment } from '@/environments/environment'
import { io, Socket } from 'socket.io-client'

class SocketService {
  private socket: Socket | null = null

  connect(): void {
    this.socket = io(enviroment.socketUrl || '')

    this.socket.on('connect', () => {
      console.log('Connected to server via Socket.IO')
    })

    this.socket.on('newMessage', (data: any) => {
      console.log('Message from server:', data)
    })
  }

  sendMessage(msg: any): void {
    if (this.socket) {
      this.socket.emit('newMessage', msg)
    }
  }

  listen(eventName: string, callback: (data: any) => void): void {
    if (this.socket) {
      console.log('Listening for event:', eventName)
      this.socket.on(eventName, callback)
    }
  }

  joinRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('joinRoom', roomId)
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }
}

export default new SocketService()
