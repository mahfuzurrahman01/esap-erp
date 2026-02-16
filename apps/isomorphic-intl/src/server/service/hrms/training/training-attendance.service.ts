import { ApiEndpoint } from "@/server/client"
import {
  Appraisal,
  AppraisalDataResponse,
  AppraisalQueryOptions,
} from "@/types/hrms/appraisal/appraisals.types"
import {
  TrainingAttendance,
  TrainingAttendanceDataResponse,
  TrainingAttendanceQueryOptions,
} from "@/types/hrms/training/training-attendance-type"
import {
  TrainingProgram,
  TrainingProgramDataResponse,
} from "@/types/hrms/training/training-program-type"
import { TrainingProgramQueryOptions } from "@/types/hrms/training/training-program-type"
import HttpClient from "@/utils/axios"

export const TrainingAttendanceService = {
  all: (params: Partial<TrainingAttendanceQueryOptions>) => {
    return HttpClient.get<TrainingAttendanceDataResponse>(
      ApiEndpoint.hr.fetchAllTrainingAttendances,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<TrainingAttendance>(
      ApiEndpoint.hr.fetchTrainingAttendanceById(id)
    )
  },

  create: (input: TrainingAttendance) =>
    HttpClient.post<TrainingAttendance>(
      ApiEndpoint.hr.createTrainingAttendance,
      input
    ),

  update: (input: TrainingAttendance) =>
    HttpClient.put<TrainingAttendance>(
      ApiEndpoint.hr.updateTrainingAttendance,
      input
    ),

  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.hr.deleteTrainingAttendance(id)),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(ApiEndpoint.hr.deleteTrainingAttendances, ids),
}
