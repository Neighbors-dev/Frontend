export const chunkWindow = (array: Array<JSX.Element>, size = 4) => {
  const chunkedArray = []

  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size))
  }

  return chunkedArray
}
