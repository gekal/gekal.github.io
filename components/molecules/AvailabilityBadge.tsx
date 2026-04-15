interface AvailabilityBadgeProps {
  label?: string
}

export default function AvailabilityBadge({
  label = '現在、新規案件受付中です',
}: AvailabilityBadgeProps) {
  return (
    <div
      className="flex items-center gap-2.5 p-4 rounded-xl border"
      style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}
    >
      <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
      <p className="text-[12px] font-medium text-green-700">{label}</p>
    </div>
  )
}
