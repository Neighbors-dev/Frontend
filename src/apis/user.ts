import { client } from './client'

export const postNickname = async (nickname: string) => {
  console.log(nickname)
  try {
    const { data } = await client.get('/mocks/nickname.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
