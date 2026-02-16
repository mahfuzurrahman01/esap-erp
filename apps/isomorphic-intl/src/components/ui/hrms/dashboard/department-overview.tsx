"use client"

import { useTranslations } from "next-intl"
import { PiBuildingsFill, PiUsers } from "react-icons/pi"
import { Title } from "rizzui/typography"

import { cn } from "@/utils/cn"

// Dummy data - replace with real data later
const departments = [
  {
    id: 1,
    name: "Engineering",
    totalEmployees: 85,
    growth: 12.5,
    color: "primary",
  },
  {
    id: 2,
    name: "Marketing",
    totalEmployees: 45,
    growth: 8.2,
    color: "success",
  },
  {
    id: 3,
    name: "Sales",
    totalEmployees: 65,
    growth: -5.4,
    color: "warning",
  },
  {
    id: 4,
    name: "HR",
    totalEmployees: 15,
    growth: 3.2,
    color: "info",
  },
  {
    id: 5,
    name: "Finance",
    totalEmployees: 25,
    growth: 7.8,
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

export default function DepartmentOverview({ className }: Props) {
  const t = useTranslations()

  return (
    <div className={cn("rounded-xl bg-gray-0 p-5 dark:bg-gray-900", className)}>
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <PiBuildingsFill className="h-6 w-6 text-gray-500" />
          <Title as="h3" className="font-semibold">
            {t("common.text-department-overview")}
          </Title>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {departments.map((department) => (
          <div
            key={department.id}
            className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  colorStyles[department.color as keyof typeof colorStyles]
                )}>
                <PiUsers className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {department.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {department.totalEmployees} {t("common.text-employees")}
                </p>
              </div>
            </div>
            <div
              className={cn(
                "flex h-8 items-center rounded-full px-3 text-sm font-medium",
                department.growth >= 0
                  ? "bg-green/10 text-green dark:bg-green/20"
                  : "bg-red/10 text-red dark:bg-red/20"
              )}>
              {department.growth > 0 && "+"}
              {department.growth}%
            </div>
          </div>
        ))}
      </div>

      {departments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          <PiBuildingsFill className="mb-2 h-8 w-8" />
          <p>{t("common.text-no-departments")}</p>
        </div>
      )}
    </div>
  )
}
