interface NoticeType {
  id: number
  title: string
  date: string
}

interface NoticeDetailType extends NoticeType {
  content: string
}

interface MessageType {
  to: string
  from: string
  content: string
}
