import { client, mockingClient } from './client'

interface MessageResponse {
  data: { openedLetters: MessageType[] }
}

export const getMessages = async (page: number, size: number) => {
  try {
    const { data } = await client.get<MessageResponse>('/mainPage/letter', {
      params: {
        page,
        size,
      },
    })
    return data.data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export const getMessages2 = async () => {
  try {
    const { data } = await mockingClient.get<MessageResponse>('/mocks/message.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export const getMainData = async (size: number) => {
  try {
    const { data } = await client.get('/mainPage', {
      params: {
        page: 0,
        size,
      },
    })
    return data.data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
