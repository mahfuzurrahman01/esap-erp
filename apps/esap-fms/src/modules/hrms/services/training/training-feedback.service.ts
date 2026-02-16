import { ApiEndpoint } from "@/server/client"
import {
  TrainingFeedback,
  TrainingFeedbackCreate,
  TrainingFeedbackDataResponse,
  TrainingFeedbackQueryOptions,
} from "@/types/hrms/training/training-feedbacks-type"
import HttpClient from "@/utils/axios"

export const TrainingFeedbackService = {
  all: (params: Partial<TrainingFeedbackQueryOptions>) => {
    return HttpClient.get<TrainingFeedbackDataResponse>(
      ApiEndpoint.hr.fetchAllTrainingFeedbacks,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<TrainingFeedback>(
      ApiEndpoint.hr.fetchTrainingFeedbackById(id)
    )
  },

  create: (input: TrainingFeedbackCreate) =>
    HttpClient.post<TrainingFeedbackCreate>(
      ApiEndpoint.hr.createTrainingFeedback,
      input
    ),

  update: (input: TrainingFeedbackCreate) =>
    HttpClient.post<TrainingFeedbackCreate>(
      ApiEndpoint.hr.updateTrainingFeedback,
      input
    ),

  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.hr.deleteTrainingFeedback(id)),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(ApiEndpoint.hr.deleteTrainingFeedbacks, ids),
}
