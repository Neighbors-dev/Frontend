import { Link } from 'react-router-dom'

interface NoticeItemProps {
  notice: NoticeType
  index: number
}

export default function NoticeItem({ notice, index }: NoticeItemProps) {
  return (
    <Link to={`${index}`}>
      <article className="border-t border-neutral-80/50 pt-3">
        <p className="label-large mb-1 line-clamp-1 text-white">{notice.title}</p>
        <p className="label-small text-neutral-50">{notice.createdAT}</p>
      </article>
    </Link>
  )
}
