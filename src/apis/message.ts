import { client } from './client'

export const getMessages = async (page: number, size: number) => {
  try {
    const {
      data: { data },
    } = await client.get('/mainPage/letter', {
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

export const getMainData = async () => {
  try {
    const {
      data: { data },
    } = await client.get('/mainPage', {
      params: {
        page: 0,
        size: 1,
      },
    })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export const getSearchResult = async (keyword: string, target: string) => {
  try {
    const {
      data: {
        data: { addressInfos },
      },
    } = await client.get('/address', {
      params: {
        searchAddress: keyword,
        targetJob: target,
      },
    })
    return addressInfos
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}
