"use client"

import { useEffect, useState } from "react"

import parse from "html-react-parser"
import {
  PiBagSimpleBold,
  PiBuildings,
  PiCalendarBold,
  PiEnvelope,
  PiEnvelopeBold,
  PiGithubLogoBold,
  PiLinkedinLogoBold,
  PiMapPin,
  PiPhoneBold,
  PiUsers,
} from "react-icons/pi"
import { Badge, Button } from "rizzui"

import {
  useApplicationById,
  useUpdateApplicationStatus,
} from "@/hooks/hrms/recruitment/use-applications"
import { Application } from "@/types/hrms/recruitment/applications-type"

const APPLICATION_STAGES = [
  {
    key: "pending",
    label: "Pending Review",
    badgeColor: "warning",
    color: "text-[rgb(var(--orange-default))]",
    dotColor: "bg-[rgb(var(--orange-default))]",
  },
  {
    key: "screening",
    label: "Screening",
    badgeColor: "info",
    color: "text-[rgb(var(--blue-default))]",
    dotColor: "bg-[rgb(var(--blue-default))]",
  },
  {
    key: "interview",
    label: "Interview",
    badgeColor: "primary",
    color: "text-[rgb(var(--primary-default))]",
    dotColor: "bg-[rgb(var(--primary-default))]",
  },
  {
    key: "selected",
    label: "Selected",
    badgeColor: "success",
    color: "text-[rgb(var(--green-default))]",
    dotColor: "bg-[rgb(var(--green-default))]",
  },
  {
    key: "rejected",
    label: "Rejected",
    badgeColor: "danger",
    color: "text-[rgb(var(--red-default))]",
    dotColor: "bg-[rgb(var(--red-default))]",
  },
] as const

const ApplicationDetailsContainer = ({
  applicationId,
}: {
  applicationId: string
}) => {
  const { data: application, isLoading } = useApplicationById(
    Number(applicationId)
  )
  const { mutate: updateStatus } = useUpdateApplicationStatus()
  const [currentStatus, setCurrentStatus] = useState<Application["status"]>()

  useEffect(() => {
    if (application?.status) {
      setCurrentStatus(application.status)
    }
  }, [application?.status])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!application) {
    return <div>No data found</div>
  }

  const handleStatusChange = (newStatus: Application["status"]) => {
    setCurrentStatus(newStatus)

    updateStatus(
      { id: Number(applicationId), status: newStatus },
      {
        onError: () => {
          setCurrentStatus(application.status)
        },
      }
    )
  }

  const renderLink = (url: string | undefined | null, label: string) => {
    if (!url) {
      return <span className="text-gray-500">Not added</span>
    }
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary hover:underline">
        {label}
      </a>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Status Workflow */}
      <div className="lg:col-span-12">
        <div className="card-shadow mb-6 rounded-2xl bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">Application Status</h3>
              <Badge
                color={
                  APPLICATION_STAGES.find(
                    (stage) => stage.key === currentStatus
                  )?.badgeColor as any
                }
                className="px-3 py-1 text-sm capitalize">
                {currentStatus}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {APPLICATION_STAGES.map((stage) => {
                const isCurrentStage = currentStatus === stage.key

                let textColorClass = "text-gray-500"
                let dotColorClass = "bg-gray-300"
                let buttonClass =
                  "border border-gray-200 hover:border-gray-300 hover:text-gray-900 dark:border-gray-0 dark:text-gray-0 dark:hover:border-gray-0 dark:hover:text-gray-0"

                if (isCurrentStage) {
                  textColorClass = stage.color
                  dotColorClass = stage.dotColor
                  buttonClass = "" // Remove border for active stage
                }

                return (
                  <Button
                    key={stage.key}
                    size="sm"
                    variant="text"
                    onClick={() => handleStatusChange(stage.key)}
                    className={`min-h-9 gap-2 px-3.5 ${textColorClass} ${buttonClass} transition-colors duration-200`}>
                    <span
                      className={`size-2 rounded-full ${dotColorClass} transition-colors duration-200`}
                    />
                    <span className="font-medium">{stage.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Applicant Details */}
      <div className="lg:col-span-5">
        <div className="card-shadow rounded-2xl bg-white p-6">
          <h3 className="mb-6 text-xl font-semibold">Applicant Information</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <PiUsers className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-md text-gray-500">Full Name</p>
                <p className="font-medium">
                  {application.firstName}
                  {application.lastName ? ` ${application.lastName}` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <PiEnvelopeBold className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-md text-gray-500">Email</p>
                <p className="text-sm font-medium">{application.email}</p>
              </div>
            </div>

            {application.phone && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <PiPhoneBold className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-md text-gray-500">Phone</p>
                  <p className="text-sm font-medium">{application.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <PiCalendarBold className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-md text-gray-500">Notice Period</p>
                <p className="text-sm font-medium">
                  {application.noticePeriod} days
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                <PiLinkedinLogoBold className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-md text-gray-500">LinkedIn</p>
                {renderLink(application.linkedIn, "View Profile")}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                <PiGithubLogoBold className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-md text-gray-500">GitHub</p>
                {renderLink(application.gitHub, "View Profile")}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="mb-4 text-lg font-semibold">Documents</h4>
            <div className="flex gap-4">
              {application.resumeUrl && (
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-black px-4 py-2 text-black hover:bg-black hover:text-white dark:border-gray-0 dark:text-gray-0">
                  <PiUsers className="h-5 w-5" />
                  View Resume
                </a>
              )}
              {application.coverLetterUrl && (
                <a
                  href={application.coverLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-black px-4 py-2 text-black hover:bg-black hover:text-white dark:border-gray-0 dark:text-gray-0">
                  <PiEnvelope className="h-5 w-5" />
                  View Cover Letter
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Position Details */}
      <div className="lg:col-span-7">
        <div className="card-shadow rounded-2xl bg-white p-6">
          <h3 className="mb-6 text-xl font-semibold">Position Details</h3>

          <div className="mb-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <PiBagSimpleBold className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-md text-gray-500">Position</p>
                <p className="text-sm font-medium">
                  {application.jobPosting?.jobPosition?.jobPositionName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <PiBuildings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-md text-gray-500">Department</p>
                <p className="text-sm font-medium">
                  {application.jobPosting?.department?.departmentName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <PiMapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-md text-gray-500">Location</p>
                <p className="text-sm font-medium">
                  {application.jobPosting?.workingAddress?.addressLine}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-md mb-4 font-medium">Job Description</h4>
            <div className="prose prose-sm max-w-none">
              {parse(application.jobPosting?.description || "")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetailsContainer
