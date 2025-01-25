import { client } from './client'

export const getSharing = async () => {
  try {
    const {
      data: { data },
    } = await client.get('/sharing')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
    }
    return null
  }
}

export const getSharingCode = async () => {
  try {
    const {
      data: { data },
    } = await client.get('/sharing/recommenderCode')
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}
