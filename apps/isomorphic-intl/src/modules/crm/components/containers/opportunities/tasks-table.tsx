
"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { Button } from "@/components/ui"
import TableGrid from "@/components/ui/table-grid"
import { useTasksColumns } from "../campaign/tasks-column"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import TaskDrawerView from "../tasks/drawer-view"

interface TableProps {
  data?: any
}

export function TasksTable({
  data = [],
}: TableProps) {
  const t = useTranslations("form")
  const { openDrawer } = useDrawer()
  const columns = useTasksColumns()
  return (
    <div className="print:non-scrollable space-y-4 pt-4 pb-8">
      <div className="flex items-center justify-between">
        <div className="py-6 text-base font-medium text-title">
          {t("form-tasks")}
        </div>
        <Button variant="outline" className="flex items-center gap-2 text-sm"
        onClick={() =>
          openDrawer({
            view: <TaskDrawerView opportunityId={data.id} />,
            placement: "right",
            containerClassName: "max-w-[480px] dropdown-gr",
          })
        }>
          <PiPlusBold className="h-4 w-4" />
          {t("form-add-new")}
        </Button>
      </div>
      <TableGrid
        data={data.tasks}
        columns={columns}
        gridTemplateColumns={cn(
          "50px 250px 1fr 1fr 150px"
        )}
        variant="modern"
      />
    </div>
  )
}