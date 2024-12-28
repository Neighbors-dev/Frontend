import { client } from './client'

export const postLogin = async (code: string) => {
  console.log(code)
  try {
    const { data } = await client.get('/mocks/login.json')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
