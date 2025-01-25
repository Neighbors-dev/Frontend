export const randomArray = (max: number, size: number) => {
  // 1부터 max - 1까지 중복되지 않는 size개의 랜덤한 숫자를 가진 배열 생성
  const random: number[] = [0]
  while (random.length < size + 1) {
    const num = Math.floor(Math.random() * (max - 1)) + 1
    if (!random.includes(num)) {
      random.push(num)
    }
  }

  return random
}
