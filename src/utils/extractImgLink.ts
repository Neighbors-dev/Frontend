import { MAIN_BACKGROUND_IMAGE_BASE_LINK, MAIN_BACKGROUND_IMAGE_LINK } from '@/constants'

export const extractImgLink = (messageCount: number) => {
  let imgLink = ''

  if (messageCount < 50) {
    imgLink = MAIN_BACKGROUND_IMAGE_LINK[0]
  } else if (messageCount < 100) {
    imgLink = MAIN_BACKGROUND_IMAGE_LINK[1]
  } else if (messageCount < 200) {
    imgLink = MAIN_BACKGROUND_IMAGE_LINK[2]
  } else if (messageCount < 350) {
    imgLink = MAIN_BACKGROUND_IMAGE_LINK[3]
  } else if (messageCount < 500) {
    imgLink = MAIN_BACKGROUND_IMAGE_LINK[4]
  } else if (messageCount < 750) {
    imgLink = MAIN_BACKGROUND_IMAGE_LINK[5]
  } else if (messageCount < 999) {
    imgLink = MAIN_BACKGROUND_IMAGE_LINK[6]
  } else {
    imgLink = MAIN_BACKGROUND_IMAGE_LINK[7]
  }

  return `${MAIN_BACKGROUND_IMAGE_BASE_LINK}${imgLink}`
}
