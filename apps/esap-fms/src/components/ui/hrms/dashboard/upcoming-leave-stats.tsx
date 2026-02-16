"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"
import { PiArrowDownRight, PiArrowUpRight } from "react-icons/pi"

import { Skeleton } from "@/components/ui/skeleton"
import { useLeaveRequestList } from "@/modules/hrms/hooks/attendance-and-leave/use-leave-request"

export default function UpcomingLeaveStats() {
  const t = useTranslations()
  const { data: leaveRequest, isLoading: isLeaveRequestLoading } =
    useLeaveRequestList()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const formatLeaveType = (leaveType: string) => {
    return leaveType?.replace(/\sleave$/i, "")
  }

  // Get only first 3 leave requests
  const upcomingLeaves = leaveRequest?.data?.slice(0, 3)

  const renderSkeleton = () => (
    <div className="h-[280px] w-full rounded-3xl bg-gradient-to-b from-white via-white/80 to-transparent p-5 shadow-sm backdrop-blur-sm transition-colors duration-200 dark:from-gray-100/10 dark:via-gray-100/5 dark:to-transparent">
      <div className="flex flex-col justify-start gap-4 sm:flex-row">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center rounded-2xl bg-gray-50/50 p-4 backdrop-blur-sm sm:w-1/3">
            {/* Avatar Skeleton */}
            <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/10">
              <Skeleton className="h-full w-full" />
            </div>

            {/* Name Skeleton */}
            <div className="flex flex-col items-center gap-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Leave Type Skeleton */}
            <Skeleton className="mt-2 h-6 w-24 rounded-full" />

            {/* Status & Duration Skeleton */}
            <div className="mt-3 flex items-center gap-1.5">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Dates Skeleton */}
            <Skeleton className="mt-2 h-3 w-28" />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-[600px] px-5">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700">
          {t("common.text-upcoming-leaves")}
        </h3>
      </div>

      {isLeaveRequestLoading ? (
        renderSkeleton()
      ) : (
        <div className="h-[280px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-white via-white/80 to-transparent p-5 shadow-sm backdrop-blur-sm transition-colors duration-200 dark:from-gray-100/10 dark:via-gray-100/5 dark:to-transparent">
          <div className="flex h-full flex-col justify-start gap-4 sm:flex-row">
            {upcomingLeaves &&
              upcomingLeaves.map((request) => (
                <div
                  key={request.id}
                  className="group relative flex w-full flex-col items-center rounded-2xl bg-gradient-to-b from-gray-50/80 via-gray-50/50 to-transparent p-4 backdrop-blur-sm transition-all hover:shadow-lg dark:from-gray-800/10 dark:via-gray-800/5 dark:to-transparent sm:w-1/3">
                  {/* Avatar */}
                  <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/80 transition-transform group-hover:scale-105">
                    <Image
                      src={request.employee?.avatarUrl || ""}
                      alt={`${request.employee?.firstName} ${request.employee?.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h4 className="text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                    {request.employee?.firstName}
                    <br />
                    {request.employee?.lastName}
                  </h4>

                  {/* Leave Type */}
                  <span className="mt-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm backdrop-blur-sm transition-colors dark:bg-gray-800/80 dark:text-gray-300">
                    {formatLeaveType(request.leaveType?.leaveTypeName || "")}
                  </span>

                  {/* Status Icon & Duration */}
                  <div className="mt-3 flex items-center gap-1.5">
                    {request.status === "approved" ? (
                      <PiArrowUpRight className="text-[#22C55E]" size={18} />
                    ) : (
                      <PiArrowDownRight className="text-[#EF4444]" size={18} />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {request.duration} days
                    </span>
                  </div>

                  {/* Dates */}
                  <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(request.startDate)} -{" "}
                    {formatDate(request.endDate)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
