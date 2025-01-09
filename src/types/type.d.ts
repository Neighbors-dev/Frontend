interface TokenType {
  value: string
  expiresIn: number
}

interface NoticeType {
  title: string
  content: string
  createdAT: string
}

interface MessageType {
  to: string
  from: string
  content: string
}

interface User {
  role?: string
  email?: string
  nickname?: string
}
