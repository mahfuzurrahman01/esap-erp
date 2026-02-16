"use client"

import parse from "html-react-parser"
import { PiBagSimpleBold, PiBuildings, PiMapPin, PiUsers } from "react-icons/pi"

import { Skeleton } from "@/components/ui/skeleton"
import { useRecruitmentById } from "@/hooks/hrms/recruitment/use-recruitment"

import RecruitmentCard from "./recruitment-card"

const RecruitmentDetailsContainer = ({
  recruitmentId,
}: {
  recruitmentId: string
}) => {
  const { data: recruitment, isLoading } = useRecruitmentById(
    Number(recruitmentId)
  )

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Details Section Skeleton */}
      <div className="lg:col-span-2">
        <div className="card-shadow rounded-2xl bg-white/80 p-6 backdrop-blur-sm transition-colors duration-200 dark:bg-gray-900/50">
          {/* Basic Info Row Skeleton */}
          <div className="mb-8 flex flex-wrap items-center gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <Skeleton className="h-3.5 w-3.5 bg-gray-300 dark:bg-gray-700/50" />
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700/50" />
                  <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-700/50" />
                </div>
              </div>
            ))}
          </div>

          {/* Description Skeleton */}
          <div className="mb-10">
            <Skeleton className="mb-4 h-7 w-32 bg-gray-300 dark:bg-gray-700/50" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-4 w-full bg-gray-300 dark:bg-gray-700/50"
                />
              ))}
            </div>
          </div>

          {/* Responsibilities Skeleton */}
          <div className="mb-10">
            <Skeleton className="mb-4 h-7 w-40 bg-gray-300 dark:bg-gray-700/50" />
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-4 w-full bg-gray-300 dark:bg-gray-700/50"
                />
              ))}
            </div>
          </div>

          {/* Requirements Skeleton */}
          <div>
            <Skeleton className="mb-4 h-7 w-36 bg-gray-300 dark:bg-gray-700/50" />
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700/50"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Section Skeleton */}
      <div className="lg:col-span-1">
        <div className="card-shadow rounded-2xl bg-white/80 p-6 backdrop-blur-sm transition-colors duration-200 dark:bg-gray-900/50">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-12 w-full bg-gray-300 dark:bg-gray-700/50"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return renderSkeleton()
  }

  if (!recruitment) {
    return <div>No data found</div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Details Section */}
      <div className="lg:col-span-2">
        <div className="card-shadow rounded-2xl bg-white/80 p-6 backdrop-blur-sm transition-colors duration-200 dark:bg-gray-900/50">
          {/* Basic Info Row */}
          <div className="mb-8 flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <PiBagSimpleBold className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Position:
                </span>{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {recruitment.jobPosition?.jobPositionName}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <PiBuildings className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Department:
                </span>{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {recruitment.department?.departmentName}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <PiMapPin className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Location:
                </span>{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {recruitment.workingAddress?.addressLine}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <PiUsers className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Employment Type:
                </span>{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {recruitment.employmentType?.employmentTypeName}
                </span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Description
            </h3>
            <div className="prose max-w-none text-gray-600 dark:text-gray-400">
              {parse(recruitment.description)}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mb-10">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Responsibilities
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {recruitment.responsibilities}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Requirements
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>• {recruitment.experience} years of experience required</p>
              <p>• {recruitment.expectedNewEmployees} positions to be filled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Section - Added sticky positioning */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <RecruitmentCard data={recruitment} />
        </div>
      </div>
    </div>
  )
}

export default RecruitmentDetailsContainer
