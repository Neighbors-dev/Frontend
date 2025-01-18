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
  }
}

export const postMessage = async (message: WriteMessageType) => {
  try {
    const { data } = await client.post('/letter', message)
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}

export const getMyMessages = async () => {
  try {
    const {
      data: {
        data: { myLetterInfos },
      },
    } = await client.get('/letter')
    return myLetterInfos
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    throw new Error()
  }
}

export const getMyMessageDetail = async (letterId: string) => {
  try {
    const {
      data: { data },
    } = await client.get(`/letter/detail?letterId=${letterId}`)
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    throw new Error()
  }
}

export const putMyMessageIsPublic = async (letterId: string, isPublic: boolean) => {
  try {
    const { data } = await client.put('/letter', {
      letterId,
      isPublic,
    })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}

export const deleteMyMessage = async (letterId: string) => {
  try {
    const { data } = await client.delete('/letter', { data: { letterId } })
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}
