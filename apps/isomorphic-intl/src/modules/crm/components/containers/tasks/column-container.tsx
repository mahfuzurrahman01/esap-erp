import { useMemo } from "react"

import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { PlusAltIcon } from "@/components/icons/crm/plus-alt"

import TaskDrawerView from "./drawer-view"
import TaskCard from "./task-card"
import { taskStatusOptions } from "@/data/crm/campaign"

interface Props {
  column: any
  tasks: any[]
  deleteColumn: (id: any) => void
  updateColumn: (id: any, title: string) => void
  createTask: (status: any) => void
  deleteTask: (id: any) => void
  updateTask: (id: any, subject: string) => void
}

const ColumnContainer = (props: Props) => {
  const { openDrawer } = useDrawer()
  const { column, tasks, deleteTask, updateTask } = props
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
  })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor flex h-[600px] max-h-[600px] w-[334px] flex-col rounded-xl border-2"></div>
    )
  }

  const statusLabel = taskStatusOptions.find(
                (option) => option.value === column.title
              )?.label || ""
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-[665px] max-h-[665px] w-[334px] flex-col rounded-2xl bg-[#f6f8fa] dark:bg-gray-700">
      <div
        {...attributes}
        {...listeners}
        className="text-md border-columnBackgroundColor flex h-[60px] cursor-grab items-center justify-between rounded-b-none p-4 pt-8 font-bold">
        <div className="flex items-center gap-2">
          <h4 className="text-[#1c252e] font-semibold">{statusLabel}</h4>
        </div>
        <button
          className="text-[#1c252e]"
          onClick={() => {
            // createTask(column.id)
            openDrawer({
              view: <TaskDrawerView activeStatus={column.title} />,
              placement: "right",
              containerClassName: "max-w-[26.25rem] dropdown-gr",
            })
          }}>
          <PlusAltIcon className="size-5 dark:text-title" />
        </button>
      </div>

      {/* Column Task Container*/}
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-4">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default ColumnContainer
