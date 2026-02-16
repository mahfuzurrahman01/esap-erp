"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"
import {
  PiBriefcase,
  PiEnvelopeSimple,
  PiGlobe,
  PiIdentificationCard,
  PiPhone,
  PiUser,
} from "react-icons/pi"

import { Skeleton } from "@/components/ui/skeleton"
import { EmployeeFullDetails } from "@/types/hrms/employee/employee.types"

type Props = {
  employeeData?: EmployeeFullDetails
  isLoading?: boolean
}

const EmployeeBasicInformation = ({ employeeData, isLoading }: Props) => {
  const t = useTranslations("hrms")
  const tForm = useTranslations("form")

  if (isLoading) {
    return <BasicInformationSkeleton />
  }

  if (!employeeData) return null

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden rounded-xl p-6">
        <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={employeeData?.avatarUrl || "/user-placeholder.png"}
              alt={employeeData?.firstName}
              width={150}
              height={150}
              className="h-24 w-24 rounded-full object-cover"
            />

            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {`${employeeData.firstName} ${employeeData.lastName || ""}`}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <PiBriefcase className="h-4 w-4" />
                <span>{employeeData.jobPosition?.jobPositionName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <PiIdentificationCard className="h-4 w-4" />
                <span>{employeeData.badgeId}</span>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center gap-3">
            <Link href={routes.hr.employeeLeaveCalendar(employeeData.id)}>
              <Button variant="solid" className="h-10 gap-2">
                <CalendarIcon className="h-4 w-4" />
                {t("text-calendar")}
              </Button>
            </Link>
          </div> */}
        </div>
      </div>

      {/* Information Grid */}
      <div className="flex gap-6">
        {/* Contact Information */}
        <div className="rounded-xl bg-gray-0 p-6 dark:bg-gray-900">
          <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t("text-contact-information")}
          </h3>
          <div className="grid gap-4">
            <InfoItem
              icon={<PiEnvelopeSimple className="h-5 w-5" />}
              label={tForm("form-email")}
              value={employeeData.email}
              variant="primary"
            />
            <InfoItem
              icon={<PiPhone className="h-5 w-5" />}
              label={tForm("form-phone")}
              value={employeeData.phone}
              variant="success"
            />
            <InfoItem
              icon={<PiPhone className="h-5 w-5" />}
              label={tForm("form-emergency-number")}
              value={employeeData.emergencyPhone}
              variant="warning"
            />
            <InfoItem
              icon={<PiGlobe className="h-5 w-5" />}
              label={tForm("form-country")}
              value={employeeData.country}
              variant="info"
            />
          </div>
        </div>

        {/* Work Information */}
        <div className="rounded-xl bg-gray-0 p-6 dark:bg-gray-900">
          <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t("text-department-and-manager")}
          </h3>
          <div className="grid gap-4">
            <InfoItem
              icon={<PiBriefcase className="h-5 w-5" />}
              label={tForm("form-department")}
              value={employeeData.department?.departmentName}
              variant="primary"
            />
            <InfoItem
              icon={<PiUser className="h-5 w-5" />}
              label={tForm("form-manager")}
              value={`${employeeData.manager?.firstName || ""} ${
                employeeData.manager?.lastName || ""
              }`}
              avatar={employeeData.manager?.avatar || ""}
              variant="success"
            />
            <InfoItem
              icon={<PiUser className="h-5 w-5" />}
              label={tForm("form-coach")}
              value={`${employeeData.coach?.firstName || ""} ${
                employeeData.coach?.lastName || ""
              }`}
              avatar={employeeData.coach?.avatar || ""}
              variant="info"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

type InfoItemProps = {
  icon?: React.ReactNode
  label: string
  value?: string
  avatar?: string
  variant?: "primary" | "success" | "warning" | "info"
}

const variantStyles = {
  primary: "bg-primary/10 text-primary dark:bg-primary/20",
  success: "bg-green/10 text-green dark:bg-green/20",
  warning: "bg-orange/10 text-orange dark:bg-orange/20",
  info: "bg-blue/10 text-blue dark:bg-blue/20",
}

const InfoItem = ({
  icon,
  label,
  value,
  avatar,
  variant = "primary",
}: InfoItemProps) => {
  if (!value) return null

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${variantStyles[variant]}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <div className="flex items-center gap-2">
          {avatar && (
            <div className="relative h-6 w-6 shrink-0">
              <Image
                src={avatar || "/user-placeholder.png"}
                alt={value}
                fill
                className="rounded-full object-cover"
              />
            </div>
          )}
          <p className="truncate font-medium text-gray-900 dark:text-gray-100">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

const BasicInformationSkeleton = () => (
  <div className="flex flex-col gap-6">
    <div className="relative overflow-hidden rounded-xl bg-gray-0 p-6 dark:bg-gray-900">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {[...Array(2)].map((_, cardIdx) => (
        <div
          key={cardIdx}
          className="rounded-xl bg-gray-0 p-6 dark:bg-gray-900">
          <Skeleton className="mb-6 h-6 w-40" />
          <div className="grid gap-4">
            {[...Array(4)].map((_, itemIdx) => (
              <div key={itemIdx} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default EmployeeBasicInformation
