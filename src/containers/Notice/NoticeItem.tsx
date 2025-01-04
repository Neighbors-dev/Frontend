import { Link } from 'react-router-dom'

interface NoticeItemProps {
  notice: NoticeType
}

export default function NoticeItem({ notice }: NoticeItemProps) {
  return (
    <Link to={`${notice.id}`}>
      <article className="border-t border-neutral-80/50 pt-3">
        <p className="label-large mb-1 line-clamp-1 text-white">{notice.title}</p>
        <p className="label-small text-neutral-50">{notice.date}</p>
      </article>
    </Link>
  )
}
