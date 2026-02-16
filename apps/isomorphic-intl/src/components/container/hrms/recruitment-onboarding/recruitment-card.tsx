"use client"

import { useEffect, useState } from "react"

import { useTranslations } from "next-intl"
import { Button, Loader } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import CompanyIcon from "@/components/icons/hrms/company"
import LocationMarkerIcon from "@/components/icons/hrms/location-marker"
import OpeningPositionIcon from "@/components/icons/hrms/opening-position"
import ProgressBarIcon from "@/components/icons/hrms/progress-bar"
import RecruiterUser from "@/components/icons/hrms/recruiter-user"
import PencilIcon from "@/components/icons/pencil"
import TrashIcon from "@/components/icons/trash"
import { routes } from "@/config/routes"
import { useDeleteRecruitment } from "@/hooks/hrms/recruitment/use-recruitment"
import { Link } from "@/i18n/routing"
import { Recruitment } from "@/types/hrms/recruitment/recruitment-type"

type Props = {
  data: Recruitment
}

const RecruitmentCard = ({ data }: Props) => {
  const tTable = useTranslations("table")
  const tForm = useTranslations("form")
  const { mutate: deleteRecruitment } = useDeleteRecruitment()
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const handleDelete = async () => {
    setIsDeleteLoading(true)
    try {
      await deleteRecruitment(data.id!)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  useEffect(() => {
    isDeleteLoading && <Loader />
  }, [isDeleteLoading])

  return (
    <div className="card-shadow h-full w-full rounded-2xl p-6">
      {/* Header with Department Tag */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${data.department?.color}20`,
              color: data.department?.color,
            }}>
            {data.department?.departmentName}
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {data.jobPosition?.jobPositionName}
          </h3>
        </div>
        <ListPopover>
          <Link
            href={routes.hr.editRecruitment(data.id!)}
            aria-label="Edit"
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
            <PencilIcon className="h-4 w-4" />
            {tTable("table-text-edit")}
          </Link>
          <Link
            href={routes.hr.recruitmentDetails(data.id!)}
            aria-label="view"
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
            <EyeIcon className="h-4 w-4" />
            {tTable("table-text-view")}
          </Link>

          <Button
            size="sm"
            variant="text"
            color="danger"
            onClick={handleDelete}
            className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-red/20 hover:text-red">
            <TrashIcon className="h-4 w-4" />
            {tTable("table-text-delete")}
          </Button>
        </ListPopover>
      </div>

      {/* Key Info Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <ProgressBarIcon />
          <div>
            <p className="text-xs text-gray-500">{tForm("form-experience")}</p>
            <p className="font-semibold">{data.experience} Years</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <PiTargetBold className="h-4 w-4 text-green-600" />
          </div> */}
          <OpeningPositionIcon />
          <div>
            <p className="text-xs text-gray-500">{tForm("form-openings")}</p>
            <p className="font-semibold">{data.expectedNewEmployees}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CompanyIcon />
          <div>
            <p className="text-xs text-gray-500">{tForm("form-company")}</p>
            <p className="font-semibold">{data.companyName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LocationMarkerIcon />
          <div>
            <p className="text-xs text-gray-500">{tForm("form-locations")}</p>
            <p className="font-semibold">
              {data.workingAddress?.addressLine}, {data.workingAddress?.country}
            </p>
          </div>
        </div>
      </div>

      {/* Recruiter Info */}
      {data.department?.manager && (
        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-500/20">
          <div className="flex items-center gap-2">
            <RecruiterUser className="h-7 w-7" />
            <div>
              <p className="text-xs text-gray-500">{tForm("form-recruiter")}</p>
              <p className="font-semibold">
                {data.department?.manager?.firstName}{" "}
                {data.department?.manager?.lastName}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecruitmentCard
