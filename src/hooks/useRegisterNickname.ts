import { MAX_NICKNAME_LENGTH } from '@/constants'
import { useState } from 'react'

function useRegisterNickname(defaultNickname: string) {
  const [nickname, setNickname] = useState(defaultNickname)

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = e.target.value
    if (currentValue.length > MAX_NICKNAME_LENGTH)
      currentValue = currentValue.slice(0, MAX_NICKNAME_LENGTH)
    setNickname(currentValue)
  }

  return {
    nickname,
    handleNicknameChange,
  }
}

export default useRegisterNickname
