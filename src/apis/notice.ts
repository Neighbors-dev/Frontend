import { mockingClient } from './client'

interface NoticeResponse {
  notices: NoticeType[]
}

export const getNotices = async () => {
  try {
    const { data } = await mockingClient.get<NoticeResponse>('/mocks/notice.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export const getNoticeById = async (id: string) => {
  console.log(id)
  try {
    const { data } = await mockingClient.get<NoticeDetailType>('/mocks/notice/1.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
