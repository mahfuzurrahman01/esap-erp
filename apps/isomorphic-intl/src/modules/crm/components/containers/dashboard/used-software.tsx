import React from "react"
import { Title } from "rizzui"
import Avatar from "@/components/ui/avatar"
import { taskStatusOptions } from "@/data/crm/campaign"
import demoAvatar from "@public/auth/avatar.webp"
import { useTaskList } from "@/modules/crm/hooks/use-task"
import { TaskList } from "@/modules/crm/types/task"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useTranslations } from "next-intl"
import { CalendarIcon } from "@/components/icons"
import { FolderIcon } from "@/components/icons/hrms/folder-icon"
import { useMedia } from "react-use"
import cn from "@core/utils/class-names"

export default function AppList() {
  const t = useTranslations("crm")
  const isMobile = useMedia("(max-width: 480px)", false)
  const { data: output, isLoading } = useTaskList()
  const tableData: TaskList[] = output?.data || []
  if (isLoading) {
    return <SkeletonLoader row={1} />
  }
  const limitedTableData = tableData.slice(0, 3);
  return (
    <div>
      <h5 className="py-4 font-medium text-gray-700">{t("text-task-manager")}</h5>
      {limitedTableData.map((task) => {
        const statusLabel =
          taskStatusOptions.find((option) => option.value === task.status)
            ?.label || task.status
        return (
          <div
            className="mb-4 flex items-center rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
            key={task.id}>
            <div className="relative mr-4 flex-shrink-0">
              <Avatar
                src={
                  task.assignedToPhotopath &&
                  task.assignedToPhotopath.startsWith("http")
                    ? task.assignedToPhotopath
                    : demoAvatar.src
                }
                name={task.assignedToName}
                className="h-10 w-10 flex-shrink-0"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
              <Title
                as="h4"
                className={cn(
                  "text-base font-semibold",
                  isMobile ? "max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap" : ""
                )}
              >
                {task.ticketSubject || task.subject}
              </Title>
                <span className="rounded bg-gray-200 p-1 text-xs text-gray-700">
                  {task.priority}
                </span>
              </div>
              <div className="mt-1 flex justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className={cn(
                    "text-xs md:text-sm flex items-center",
                    isMobile ? "text-[9px]" : ""
                  )}>
                    <CalendarIcon className="mr-2" /> {new Date(task.startDate!).toLocaleDateString()}
                  </span>
                  <span className={cn(
                    "text-xs md:text-sm flex items-center",
                    isMobile ? "text-[9px]" : ""
                  )}><CalendarIcon className="mr-2" /> {new Date(task.dueDate!).toLocaleDateString()}</span>
                </div>
                <span className={cn(
                    "text-xs md:text-sm flex items-center",
                    isMobile ? "text-[9px]" : ""
                  )}><FolderIcon className="size-3 mr-2" /> {statusLabel}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
