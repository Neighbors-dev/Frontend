import { client } from './client'

interface MessageResponse {
  messages: Message[]
}

export interface Message {
  id: number
  to: {
    office: string
    name: string
  }
  content: string
  from: string
}

export const getMessages = async () => {
  try {
    const { data } = await client.get<MessageResponse>('/mocks/message.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
