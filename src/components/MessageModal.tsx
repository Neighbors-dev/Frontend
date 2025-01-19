import MessageCard from '@/components/MessageCard'

interface MessageModalProps {
  message: MessageType
  onClose: () => void
}

export default function MessageModal({ message, onClose }: MessageModalProps) {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-90 bg-opacity-70 px-5"
      onClick={handleClickOutside}
    >
      <div className="max-w-600">
        <MessageCard message={message} isShort={false} />
      </div>
    </div>
  )
}
