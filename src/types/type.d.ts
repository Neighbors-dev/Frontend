interface TokenType {
  value: string
  expiresIn: number
}

interface NoticeType {
  noticeId: number
  title: string
  content?: string
  createdAT?: string
}

interface MessageType {
  letterId?: number
  to: string
  from: string
  content: string
}

interface OfficeAddressType {
  addressId: number
  officeName: string
  roadAddress: string
}

interface User {
  role?: string
  email?: string
  nickname?: string
}

interface NewsType {
  newId: number
  title: string
  content: string
}
