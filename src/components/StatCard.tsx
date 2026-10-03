interface StatCardProps {
  label: string
  value: number
  change: string
}

function StatCard({ label, value, change }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d1219] p-5 transition hover:border-white/20">
      <p className="text-sm text-gray-500">{label}</p>

      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-semibold tracking-tight">{value}</p>

        <span className="text-xs text-emerald-400">
          {change}
        </span>
      </div>
    </div>
  )
}

export default StatCard