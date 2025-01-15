import { client } from './client'

interface NoticeResponse {
  data: {
    noticeList: NoticeType[]
  }
}

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

export const getNoticeById = async (noticeId: string) => {
  try {
    const {
      data: { data },
    } = await client.get('/notice/detail', {
      params: {
        noticeId,
      },
    })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export const getMyMessages = async () => {
  try {
    const {
      data: {
        data: { myLetterInfos },
      },
    } = await client.get('/letter')
    console.log(myLetterInfos)
    return myLetterInfos
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
