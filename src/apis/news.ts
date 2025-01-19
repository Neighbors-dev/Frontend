import { client } from './client'

export const getNews = async (page: number, size: number) => {
  try {
    const {
      data: { data },
    } = await client.get('/news', {
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
