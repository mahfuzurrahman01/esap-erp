import { ApiEndpoint } from "@/server/client"
import {
  TrainingProgram,
  TrainingProgramDataResponse,
  TrainingProgramQueryOptions,
} from "@/types/hrms/training/training-program-type"
import HttpClient from "@/utils/axios"

export const TrainingProgramService = {
  all: (params: Partial<TrainingProgramQueryOptions>) => {
    return HttpClient.get<TrainingProgramDataResponse>(
      ApiEndpoint.hr.fetchAllTrainingPrograms,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<TrainingProgram>(
      ApiEndpoint.hr.fetchTrainingProgramById(id)
    )
  },

  create: (input: TrainingProgram) =>
    HttpClient.post<TrainingProgram>(
      ApiEndpoint.hr.createTrainingProgram,
      input
    ),

  update: (input: TrainingProgram) =>
    HttpClient.put<TrainingProgram>(
      ApiEndpoint.hr.updateTrainingProgram,
      input
    ),

  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.hr.deleteTrainingProgram(id)),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(ApiEndpoint.hr.deleteTrainingPrograms, ids),
}
