import cn from "@core/utils/class-names"

type Props = {
  statistics: any[]
}

const EmployeeAttendanceStatistics = ({ statistics }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
      {statistics.map((statistic, index) => (
        <StatisticCard key={statistic.title} {...statistic} index={index} />
      ))}
    </div>
  )
}

export default EmployeeAttendanceStatistics

type StatisticCardProps = {
  title: string
  value: string
  index: number
}

const StatisticCard = ({ title, value, index }: StatisticCardProps) => {
  const colors = ["text-primary", "text-secondary", "text-blue", "text-orange"]

  return (
    <div className="card-shadow rounded-2xl bg-paper px-4 py-4 md:px-6">
      <p className="subtitle2 typography-primary mb-1.5 font-bold">{title}</p>
      <p className={cn("text-2xl font-bold", colors[index])}>{value}</p>
    </div>
  )
}
