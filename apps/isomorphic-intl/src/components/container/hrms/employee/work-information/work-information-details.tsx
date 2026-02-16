"use client"

import { useTranslations } from "next-intl"

import {
  EmployeeDetailsGroupContainer,
  EmployeeDetailsItemGroup,
} from "@/components/container/hrms/employee/employee-details-group"
import { WorkInformation } from "@/types/hrms/employee/employee.types"

type Props = {
  workInformation: WorkInformation
}

const WorkInformationDetails = ({ workInformation }: Props) => {
  const t = useTranslations("hrms")
  const tForm = useTranslations("form")

  const approverData = {
    [tForm("form-leave-approver")]:
      `${workInformation?.approver ? workInformation?.approver?.firstName : ""} ${workInformation?.approver ? workInformation?.approver?.lastName : ""}`,
    [tForm("form-daily-hr")]:
      `${workInformation.dailyHR ? workInformation.dailyHR?.firstName : ""} ${workInformation.dailyHR ? workInformation.dailyHR?.lastName : ""}`,
  }

  const scheduleData = {
    [tForm("form-schedule")]:
      workInformation.workingSchedule?.workingScheduleName,
    [tForm("form-timezone")]: workInformation?.timezone,
  }

  let locationData = {}
  if (workInformation) {
    locationData = {
      [tForm("form-address")]:
        workInformation.workingAddress?.workingAddressName,
      [tForm("form-state")]: workInformation.state,
      [tForm("form-country")]: workInformation?.country,
      [tForm("form-work-location")]: workInformation?.workLocation,
    }
  }
  return (
    <section id="workInformation" className="scroll-mt-[150px]">
      <EmployeeDetailsGroupContainer title={t("text-work-information")}>
        <EmployeeDetailsItemGroup
          title={tForm("form-location")}
          data={locationData}
        />
        <EmployeeDetailsItemGroup
          title={tForm("form-approvers")}
          data={approverData}
        />
        <EmployeeDetailsItemGroup
          title={tForm("form-schedule")}
          data={scheduleData}
        />
      </EmployeeDetailsGroupContainer>
    </section>
  )
}

export default WorkInformationDetails
