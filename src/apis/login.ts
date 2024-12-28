import { client } from './client'

export const postLogin = async (code: string) => {
  try {
    const { data } = await client.post('/mocks/login.json', {
      code,
    })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
