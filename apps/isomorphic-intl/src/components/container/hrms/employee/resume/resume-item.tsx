import { formatDate } from "@core/utils/format-date"

import { ResumeDetails } from "@/types/hrms/employee/employee.types"

type Props = {
  resume: ResumeDetails
}

const ResumeItem = ({ resume }: Props) => {
  const from = resume.startDate ? formatDate(new Date(resume.startDate)) : "-"
  const to = resume.endDate ? formatDate(new Date(resume.endDate)) : "-"

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4 text-center">
        <div className="h-3 w-3 rounded-full bg-primary" />
        <div className="subtitle2 typography-primary">{resume.resumeName}</div>
      </div>
      <div className="relative flex items-center gap-4">
        <div className="divider-color absolute bottom-0 left-[5px] top-0 w-3 border-l"></div>
        <div className="caption typography-disabled ml-7 flex flex-col gap-1">
          <span className="subtitle2">{resume.description}</span>
          <span className="body2 text-gray-500">{`${from} - ${to}`}</span>
        </div>
      </div>
    </div>
  )
}

export default ResumeItem
