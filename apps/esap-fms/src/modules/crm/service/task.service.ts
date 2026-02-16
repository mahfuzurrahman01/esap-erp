import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import { TaskList, TaskPaginator, TaskQueryOptions } from "../types/task"

export const task = {
  all: (params: Partial<TaskQueryOptions>) =>
    httpClient.get<TaskPaginator>(ApiEndpoint.crm.tasks, params),
  get: (id: string) =>
    httpClient.get<TaskList>(`${ApiEndpoint.crm.tasks}/${id}`),
  create: (input: TaskList) =>
    httpClient.post<TaskList>(ApiEndpoint.crm.tasks, input, true),
  update: (id: string, input: TaskList) =>
    httpClient.put<TaskList>(`${ApiEndpoint.crm.tasks}/${id}`, input, true),
  delete: (id: string) => httpClient.delete(`${ApiEndpoint.crm.tasks}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteTasks, ids)
  },
}
