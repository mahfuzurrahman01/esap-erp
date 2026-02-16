import { useEffect, useMemo, useState } from "react"

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"

import { Task, TaskList } from "@/modules/crm/types/task"

import ColumnContainer from "./column-container"
import TaskCard from "./task-card"
import { useUpdateTask } from "@/modules/crm/hooks/use-task"
import { UseMutationResult } from "@tanstack/react-query"

export async function updateTaskStatus(
  updateStatus: UseMutationResult<any, Error, any, any>,
  taskId: string,
  ticketId: string,
  status: string
) {
  await updateStatus.mutateAsync({
    id: taskId,
    data: { ticketId, status },
  })
}

const KanbanBoard = ({ taskData }: any) => {
  const updateTaskMutation = useUpdateTask()
  const [columns, setColumns] = useState<any[]>([])
  const [activeColumn, setActiveColumn] = useState<any | null>(null)
  const [activeTask, setActiveTask] = useState<any | null>(null)
  const [tasks, setTasks] = useState<TaskList | any>([])

  const generatedColumns = useMemo(() => {
    if (!taskData) return [];
  
    const allStatuses = ['1', '2', '3', '4', '5'];
    return allStatuses.map((status, index) => {
      const tasksWithStatus = taskData.filter((task: Task) => task.status === status);
      return {
        id: `status-${index}`,
        title: status,
        tasks: tasksWithStatus.length > 0 ? tasksWithStatus : [],
      };
    });
  }, [taskData]);
  
  useEffect(() => {
    setTasks(taskData);
    setColumns(generatedColumns);
  }, [taskData, generatedColumns]);  

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  )

  function generateId() {
    return Math.floor(Math.random() * 1000) + 1
  }

  function deleteColumn(id: any) {
    const filteredColumns = columns.filter((col) => col.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter((t: any) => t.status !== id)
    setTasks(newTasks)
  }

  function updateColumn(id: any, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col
      return { ...col, title }
    })
    setColumns(newColumns)
  }

  function createTask(status: any) {
    const newTask: any = {
      id: generateId(),
      status,
      subject: `Task ${tasks.length + 1}`,
    }
    setTasks([...tasks, newTask])
  }

  function deleteTask(id: any) {
    const newTasks = tasks.filter((task: any) => task.id !== id)
    setTasks(newTasks)
  }

  function updateTask(id: any, subject: string) {
    const newTasks = tasks.map((task: any) => {
      if (task.id !== id) return task
      return { ...task, subject }
    })
    setTasks(newTasks)
  }

  const updateTaskStatusOnServer = async (taskId: any, ticketId: string, status: string) => {
    const statusMap: { [key: string]: string } = {
      'status-0': '1',
      'status-1': '2',
      'status-2': '3',
      'status-3': '4',
      'status-4': '5'
    };
    const newStatus = statusMap[status] || status;
    await updateTaskStatus(updateTaskMutation, taskId, ticketId, newStatus);
  };
  

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event
    setTimeout(async () => {
      updateTaskStatusOnServer(over?.id, over?.data?.current?.task?.ticketId, over?.data?.current?.task?.status)
    }, 4000);
    if (!over) return

    const activestatus = active.id
    const overstatus = over.id
    if (activestatus === overstatus) return

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activestatus
      )
      const overColumnIndex = columns.findIndex((col) => col.id === overstatus)
      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function onDragOver(event: any) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id
    const overStatus = over?.data?.current?.task?.status

    if (activeId === overId) return
    const isActiveATask = active.data.current?.type === "Task"
    const isOverATask = over.data.current?.type === "Task"

    if (!isActiveATask) return

    // dropping a task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks: any) => {
        const activeIndex = tasks.findIndex((t: any) => t.id === activeId)
        const overIndex = tasks.findIndex((t: any) => t.id === overId)
        tasks[activeIndex].status = tasks[overIndex].status
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === "Column"
    //dorpping a task over another coloumn
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks: any) => {
        const activeIndex = tasks.findIndex((t: any) => t.id === activeId)
        tasks[activeIndex].status = overStatus || overId
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  return (
    <div className="m-auto flex w-full items-center overflow-x-auto custom-scroll">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}>
        <div className="mt-2 flex mb-6">
          <div className="flex gap-6 w-auto">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter(
                    (task: any) =>
                      task.status === col.id || task.status === col.title
                  )}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter(
                  (task: any) => task.status === activeColumn.id
                )}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default KanbanBoard
