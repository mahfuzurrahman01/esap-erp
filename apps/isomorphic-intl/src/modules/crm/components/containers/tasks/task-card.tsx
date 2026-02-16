import dynamic from "next/dynamic"
import { useState } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"

const TaskDrawerView = dynamic(() => import("./drawer-view"), {
  ssr: false,
})

interface Props {
  task: any
  deleteTask: (id: any) => void
  updateTask: (id: any, subject: string) => void
}

const TaskCard = ({ task, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
  })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const { openDrawer } = useDrawer()

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-dark flex-left relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 p-2.5 opacity-30"
      />
    )
  }

  return (
    <div
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="flex-left relative flex h-[78px] min-h-[78px] cursor-grab items-center rounded-xl bg-white p-2.5 dark:bg-gray-900">
      <p
        className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden text-[#1c252e] font-semibold whitespace-pre-wrap dark:text-white"
        onClick={() =>
          openDrawer({
            view: <TaskDrawerView id={task.id} />,
            placement: "right",
            containerClassName:
              "max-w-[480px] bg-paper dropdown-gr card-shadow",
          })
        }>
        {" "}
        {task.subject}
      </p>
      {/* { mouseIsOver && (
                    <button onClick={()=>{deleteTask(task.id)}}
                    className="stroke-white absolute right-4 top-1/2
                    -translate-y-1/2 bg-columnBackgroundColor p-2 rounded">
                        <FaTrashAlt className="text-red-500" />
                    </button>
        )} */}
    </div>
  )
}

export default TaskCard
