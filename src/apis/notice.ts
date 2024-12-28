import { client } from './client'

interface Notice {
  notices: string[]
}

export const getNotices = async () => {
  try {
    const { data } = await client.get<Notice>('/mocks/notice.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
