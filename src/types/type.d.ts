interface NoticeType {
  id: number
  title: string
  date: string
}

interface NoticeDetailType extends NoticeType {
  content: string
}
