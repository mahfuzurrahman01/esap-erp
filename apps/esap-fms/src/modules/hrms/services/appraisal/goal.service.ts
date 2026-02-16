import { ApiEndpoint } from "@/server/client"
import {
  Goal,
  GoalDataResponse,
  GoalQueryOptions,
} from "@/types/hrms/appraisal/goals.types"
import HttpClient from "@/utils/axios"

export const GoalService = {
  all: (params: Partial<GoalQueryOptions>) => {
    return HttpClient.get<GoalDataResponse>(
      ApiEndpoint.hr.fetchAllGoals,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<Goal>(ApiEndpoint.hr.fetchGoalById(id))
  },

  create: (input: Goal) =>
    HttpClient.post<Goal>(ApiEndpoint.hr.createGoal, input),

  update: (input: Goal) =>
    HttpClient.put<Goal>(ApiEndpoint.hr.updateGoal, input),

  delete: (id: number) => HttpClient.delete(ApiEndpoint.hr.deleteGoal(id)),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(ApiEndpoint.hr.deleteGoals, ids),
}
