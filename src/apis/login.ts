import { mockingClient } from './client'

export const postLogin = async (code: string) => {
  try {
    const { data } = await mockingClient.post('/mocks/login.json', {
      code,
    })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}
