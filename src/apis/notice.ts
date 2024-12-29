import { mockingClient } from './client'

interface Notice {
  notices: string[]
}

export const getNotices = async () => {
  try {
    const { data } = await mockingClient.get<Notice>('/mocks/notice.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
