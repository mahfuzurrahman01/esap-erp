"use client"

import ReportCardAnalytics from "../../base/report-card-analytics"


export default function ReportState({ className, data }: { className?: string, data?: any }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-3 gap-5 pb-1">
        {data.map((item: any) => (
          <ReportCardAnalytics
            key={item.sl}
            statItem={item}
            iconClassName="mb-16"
          />
        ))}
      </div>
    </div>
  )
}
