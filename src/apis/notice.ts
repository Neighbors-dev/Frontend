import { client, mockingClient } from './client'

interface NoticeResponse {
  data: {
    noticeList: NoticeType[]
  }
}

/* export const getNotices2 = async (page: number, size: number) => {
  try {
    const {
      data: { data },
    } = await mockingClient.get<NoticeResponse>('/mocks/notice.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
} */

export const getNotices = async (page: number, size: number) => {
  try {
    const {
      data: { data },
    } = await client.get<NoticeResponse>('/notice', {
      params: {
        page,
        size,
      },
    })
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
    const { data } = await mockingClient.get<NoticeType>('/mocks/notice/1.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
