import { ApiEndpoint } from "@/server/client"
import {
  TrainingSession,
  TrainingSessionDataResponse,
  TrainingSessionQueryOptions,
} from "@/types/hrms/training/training-session-type"
import HttpClient from "@/utils/axios"

export const TrainingSessionService = {
  all: (params: Partial<TrainingSessionQueryOptions>) => {
    return HttpClient.get<TrainingSessionDataResponse>(
      ApiEndpoint.hr.fetchAllTrainingSessions,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<TrainingSession>(
      ApiEndpoint.hr.fetchTrainingSessionById(id)
    )
  },

  create: (input: TrainingSession) =>
    HttpClient.post<TrainingSession>(
      ApiEndpoint.hr.createTrainingSession,
      input
    ),

  update: (input: TrainingSession) =>
    HttpClient.put<TrainingSession>(
      ApiEndpoint.hr.updateTrainingSession,
      input
    ),

  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.hr.deleteTrainingSession(id)),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(ApiEndpoint.hr.deleteTrainingSessions, ids),
}
