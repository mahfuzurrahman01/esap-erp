"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"
import {
  PiBagSimple,
  PiBuildings,
  PiEnvelope,
  PiPhone,
  PiUserCircle,
} from "react-icons/pi"

import ListPopover from "@/components/base/list-popover"
import { EmailIcon } from "@/components/icons/crm/email"
import EyeIcon from "@/components/icons/eye"
import CompanyIcon from "@/components/icons/hrms/company"
import ProgressBarIcon from "@/components/icons/hrms/progress-bar"
import PencilIcon from "@/components/icons/pencil"
import TrashIcon from "@/components/icons/trash"
import { routes } from "@/config/routes"
import { useDeleteEmployee } from "@/hooks/hrms/employee/use-employee"
import { useCurrentRole } from "@/hooks/use-current-role"
import { Link } from "@/i18n/routing"
import { Employee } from "@/types/hrms/employee/employee.types"

type Props = {
  data: Employee
  showAction?: boolean
}

const EmployeeCard = ({ data, showAction = true }: Props) => {
  const t = useTranslations("form")
  const tTable = useTranslations("table")
  const { mutate: deleteEmployee } = useDeleteEmployee()

  const handleDelete = async () => {
    try {
      await deleteEmployee(data.id!)
    } catch (error) {
      console.log(error)
    }
  }

  const { hasAnyRole } = useCurrentRole()

  const isDeleteVisible = hasAnyRole(["Admin", "HR Admin"])

  return (
    <div className="card-shadow h-full w-full rounded-2xl bg-white p-6 dark:bg-paper">
      {/* Header with Employee Info */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {data.avatarUrl ? (
            <Image
              src={data.avatarUrl}
              alt={`${data.firstName} ${data.lastName}`}
              width={150}
              height={150}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <PiUserCircle className="h-8 w-8 text-gray-500" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-gray-900">
              {data.firstName} {data.lastName}
            </h3>
          </div>
        </div>
        {showAction && (
          <ListPopover>
            <Link
              href={routes.hr.editEmployee(data.id!)}
              aria-label="Edit"
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
              <PencilIcon className="h-4 w-4" />
              {tTable("table-text-edit")}
            </Link>
            <Link
              href={routes.hr.employeeDetails(data.id!)}
              aria-label="view"
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
              <EyeIcon className="h-4 w-4" />
              {tTable("table-text-view")}
            </Link>
            {isDeleteVisible && (
              <p
                onClick={handleDelete}
                aria-label="view"
                className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <TrashIcon className="h-4 w-4" />
                {tTable("table-text-delete")}
              </p>
            )}
          </ListPopover>
        )}
      </div>

      {/* Employee Details Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 dark:text-gray-400">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <ProgressBarIcon />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-white">
              {t("form-position")}
            </p>
            <p
              className="truncate font-medium"
              title={data.jobPosition?.jobPositionName}>
              {data.jobPosition?.jobPositionName}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <CompanyIcon />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-white">
              {t("form-department")}
            </p>
            <p
              className="truncate font-medium"
              title={data.department?.departmentName}>
              {data.department?.departmentName}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <PiPhone className="h-7 w-7 text-green-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-white">
              {t("form-phone")}
            </p>
            <p className="truncate font-medium" title={data.phone || ""}>
              {data.phone || ""}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <EmailIcon className="h-6 w-6 text-sky-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-white">
              {t("form-email")}
            </p>
            <p className="truncate font-medium" title={data.email || ""}>
              {data.email || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Manager Info */}

      <div className="mt-6 border-t pt-4 dark:border-gray-700">
        <div className="flex min-w-0 items-center gap-3">
          {data.manager?.avatar ? (
            <Image
              src={data.manager.avatar}
              alt={`${data.manager.firstName} ${data.manager.lastName}`}
              width={100}
              height={100}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <PiUserCircle className="h-5 w-5 text-gray-500" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-white">
              {t("form-manager")}
            </p>
            <p
              className="truncate font-medium"
              title={`${data.manager?.firstName} ${data.manager?.lastName}`}>
              {data.manager?.firstName || "--"} {data.manager?.lastName || "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
