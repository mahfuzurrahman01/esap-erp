import { ApiEndpoint } from "@/server/client"
import {
  Participant,
  ParticipantCreateInput,
  ParticipantDataResponse,
  ParticipantQueryOptions,
  ParticipantUpdateInput,
} from "@/types/hrms/training/participants-type"
import HttpClient from "@/utils/axios"

export const ParticipantService = {
  all: (params: Partial<ParticipantQueryOptions>) => {
    return HttpClient.get<ParticipantDataResponse>(
      ApiEndpoint.hr.fetchAllParticipants,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<Participant[]>(
      ApiEndpoint.hr.fetchParticipantById(id)
    )
  },

  getByProgram: (
    programId: number,
    params: Partial<ParticipantQueryOptions>
  ) => {
    return HttpClient.get<ParticipantDataResponse>(
      ApiEndpoint.hr.fetchParticipantsByProgram(programId),
      params
    )
  },

  create: (input: ParticipantCreateInput) =>
    HttpClient.post<Participant>(ApiEndpoint.hr.createParticipant, input),

  update: (input: ParticipantUpdateInput) =>
    HttpClient.post<Participant>(ApiEndpoint.hr.updateParticipant, input),

  updateAttendance: (id: number, status: string) =>
    HttpClient.put<Participant>(
      ApiEndpoint.hr.updateParticipantAttendance(id),
      { attendanceStatus: status }
    ),

  updateFeedback: (id: number, status: string) =>
    HttpClient.put<Participant>(ApiEndpoint.hr.updateParticipantFeedback(id), {
      feedbackStatus: status,
    }),

  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.hr.deleteParticipant(id)),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(ApiEndpoint.hr.deleteParticipants, ids),
}
