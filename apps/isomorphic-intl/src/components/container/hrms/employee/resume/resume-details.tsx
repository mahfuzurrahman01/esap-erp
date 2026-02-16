import { groupBy } from "lodash"
import { useTranslations } from "next-intl"

import {
  EmployeeDetailsGroupContainer,
  EmployeeDetailsItemContainer,
} from "@/components/container/hrms/employee/employee-details-group"
import ResumeItem from "@/components/container/hrms/employee/resume/resume-item"
import type { ResumeDetails as ResumeDetailsType } from "@/types/hrms/employee/employee.types"

type Props = {
  resumes: ResumeDetailsType[]
}

const ResumeDetails = ({ resumes }: Props) => {
  const t = useTranslations("hrms")
  const groupedResumeData = groupBy(resumes, "resumeType.resumeTypeName")
  return (
    <section id="resume" className="scroll-mt-[150px]">
      <EmployeeDetailsGroupContainer title={t("text-resume")}>
        {Object.entries(groupedResumeData).map(([resumeType, resumes]) => (
          <EmployeeDetailsItemContainer key={resumeType} title={resumeType}>
            <div className="flex flex-col gap-2">
              {resumes.map((resume) => (
                <ResumeItem key={resume.id} resume={resume} />
              ))}
            </div>
          </EmployeeDetailsItemContainer>
        ))}
      </EmployeeDetailsGroupContainer>
    </section>
  )
}

export default ResumeDetails
