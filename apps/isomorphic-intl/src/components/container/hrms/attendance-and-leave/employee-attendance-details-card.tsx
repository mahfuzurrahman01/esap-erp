"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"

import { useTranslations } from "next-intl"

import { useModal } from "@/components/base/modal-views/use-modal"
import Spinner from "@/components/base/spinner"
import AttendanceReportDownloadModal from "@/components/container/hrms/attendance-and-leave/attendance-report-download-modal"
import { CalendarIcon } from "@/components/icons"
import { ArrowDownIcon } from "@/components/icons/arrow-down"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { EmployeeFullDetails } from "@/types/hrms/employee/employee.types"

type Props = {
  employeeData?: EmployeeFullDetails
  isLoading: boolean
}

const EmployeeAttendanceDetailsCard = ({ employeeData, isLoading }: Props) => {
  const t = useTranslations("hrms")
  const tForm = useTranslations("form")
  const { openModal } = useModal()

  const loader = useMemo(
    () => (
      <div className="flex justify-center">
        <Spinner />
      </div>
    ),
    []
  )

  return (
    <div className="@container">
      {isLoading && loader}
      {employeeData && (
        <div className="card-shadow bg-gray-0 p-4 dark:bg-gray-800 md:p-6">
          <div className="mb-4 flex items-center gap-4">
            <Image
              src={
                employeeData?.avatarUrl
                  ? employeeData.avatarUrl
                  : "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
              }
              alt="Profile Picture"
              width={150}
              height={150}
              className="h-16 w-16 rounded-full object-cover"
            />
            <Link href={routes.hr.employeeLeaveCalendar(employeeData.id)}>
              <Button variant="outline" color="primary" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{t("text-calendar")}</span>
              </Button>
            </Link>
            {/* <Button
              variant="outline"
              color="secondary"
              className="gap-2"
              onClick={() =>
                openModal({
                  view: (
                    <AttendanceReportDownloadModal
                      employeeId={employeeData.id}
                    />
                  ),
                })
              }>
              <ArrowDownIcon className="h-4 w-4" />
              <span>{t("text-download-report")}</span>
            </Button> */}
          </div>
          <div className="flex flex-col gap-4 @xl:flex-row">
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col @sm:flex-row @sm:gap-x-4">
                <span className="w-full basis-full text-xs text-gray-500 @sm:basis-1/3 dark:text-gray-600">
                  {tForm("form-name")}
                </span>
                <span className="w-full basis-full font-medium text-gray-800 @sm:basis-2/3 dark:text-gray-0">
                  {`${employeeData.firstName} ${employeeData.lastName}`}
                </span>
              </div>
              <div className="flex flex-col @sm:flex-row @sm:gap-x-4">
                <span className="w-full basis-full text-xs text-gray-500 @sm:basis-1/3 dark:text-gray-600">
                  {tForm("form-email")}
                </span>
                <span className="line-clamp-1 w-full basis-full font-medium text-primary @sm:basis-2/3">
                  {employeeData.email}
                </span>
              </div>
              <div className="flex flex-col @sm:flex-row @sm:gap-x-4">
                <span className="w-full basis-full text-xs text-gray-500 @sm:basis-1/3 dark:text-gray-600">
                  {tForm("form-phone")}
                </span>
                <span className="w-full basis-full font-medium text-gray-800 @sm:basis-2/3 dark:text-gray-0">
                  {employeeData.phone}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col @sm:flex-row @sm:gap-x-4">
                <span className="w-full basis-full text-xs text-gray-500 @sm:basis-1/3 dark:text-gray-600">
                  {tForm("form-department")}
                </span>
                <span className="w-full basis-full font-medium text-gray-800 @sm:basis-2/3 dark:text-gray-0">
                  {employeeData?.department?.departmentName}
                </span>
              </div>
              <div className="flex flex-col @sm:flex-row @sm:gap-x-4">
                <span className="w-full basis-full text-xs text-gray-500 @sm:basis-1/3 dark:text-gray-600">
                  {tForm("form-job-position")}
                </span>
                <span className="w-full basis-full font-medium text-gray-800 @sm:basis-2/3 dark:text-gray-0">
                  {employeeData.jobPosition?.jobPositionName}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col @sm:flex-row @sm:gap-x-4">
                <span className="w-full basis-full text-xs text-gray-500 @sm:basis-1/3 dark:text-gray-600">
                  {tForm("form-manager")}
                </span>
                <span className="w-full basis-full font-medium text-gray-800 @sm:basis-2/3 dark:text-gray-0">
                  {`${employeeData?.manager?.firstName} ${employeeData?.manager?.lastName}`}
                </span>
              </div>
              <div className="flex flex-col @sm:flex-row @sm:gap-x-4">
                <span className="w-full basis-full text-xs text-gray-500 @sm:basis-1/3 dark:text-gray-600">
                  {tForm("form-coach")}
                </span>
                <span className="w-full basis-full font-medium text-gray-800 @sm:basis-2/3 dark:text-gray-0">
                  {`${employeeData?.coach?.firstName} ${employeeData?.coach?.lastName}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeAttendanceDetailsCard
