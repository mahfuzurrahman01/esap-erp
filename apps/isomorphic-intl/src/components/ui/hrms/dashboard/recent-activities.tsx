"use client"

import { useTranslations } from "next-intl"
import {
  PiBriefcase,
  PiCalendarCheck,
  PiClockClockwise,
  PiUserCirclePlus,
  PiUsersFour,
} from "react-icons/pi"
import { Title } from "rizzui/typography"

import { cn } from "@/utils/cn"

// Dummy data - replace with real data later
const activities = [
  {
    id: 1,
    type: "new_hire",
    title: "Sarah Wilson joined as UI Designer",
    department: "Design Team",
    time: "2 hours ago",
    icon: <PiUserCirclePlus className="h-5 w-5" />,
    color: "primary",
  },
  {
    id: 2,
    type: "leave_request",
    title: "John Doe requested sick leave",
    department: "Engineering",
    time: "4 hours ago",
    icon: <PiCalendarCheck className="h-5 w-5" />,
    color: "warning",
  },
  {
    id: 3,
    type: "project",
    title: "New project 'Dashboard Redesign' created",
    department: "Product Team",
    time: "6 hours ago",
    icon: <PiBriefcase className="h-5 w-5" />,
    color: "success",
  },
  {
    id: 4,
    type: "department",
    title: "Marketing department meeting scheduled",
    department: "Marketing",
    time: "8 hours ago",
    icon: <PiUsersFour className="h-5 w-5" />,
    color: "info",
  },
  {
    id: 5,
    type: "attendance",
    title: "Late arrival marked for Mike Johnson",
    department: "Sales",
    time: "10 hours ago",
    icon: <PiClockClockwise className="h-5 w-5" />,
    color: "secondary",
  },
]

interface Props {
  className?: string
}

const colorStyles = {
  primary: "bg-primary/10 text-primary dark:bg-primary/20",
  success: "bg-green/10 text-green dark:bg-green/20",
  warning: "bg-orange/10 text-orange dark:bg-orange/20",
  info: "bg-blue/10 text-blue dark:bg-blue/20",
  secondary: "bg-secondary/10 text-secondary dark:bg-secondary/20",
}

export default function RecentActivities({ className }: Props) {
  const t = useTranslations()

  return (
    <div className={cn("rounded-xl bg-gray-0 p-5 dark:bg-gray-900", className)}>
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <PiClockClockwise className="h-6 w-6 text-gray-500" />
          <Title as="h3" className="font-semibold">
            {t("common.text-recent-activities")}
          </Title>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="relative flex gap-3 pb-6 last:pb-0">
            {/* Timeline connector */}
            <div className="absolute bottom-0 left-[18px] top-10 w-[2px] bg-gray-200 last:hidden dark:bg-gray-700" />

            {/* Activity icon */}
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                colorStyles[activity.color as keyof typeof colorStyles]
              )}>
              {activity.icon}
            </div>

            {/* Activity content */}
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {activity.title}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {activity.department}
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          <PiClockClockwise className="mb-2 h-8 w-8" />
          <p>{t("common.text-no-recent-activities")}</p>
        </div>
      )}
    </div>
  )
}
