import { mockingClient } from './client'

export const postNickname = async (nickname: string) => {
  try {
    const { data } = await mockingClient.post('/mocks/nickname.json', {
      nickname,
    })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
