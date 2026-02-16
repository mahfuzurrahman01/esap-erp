import {
  Machine,
  MachinePaginator,
  MachineQueryOptions,
} from "@/modules/scm/types/production-control/work-order-tracking/machine-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const MachineService = {
  all: (params?: Partial<MachineQueryOptions>) => {
    return HttpClient.get<MachinePaginator>(
      ApiEndpoint.scm.getAllMachine,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<Machine>(ApiEndpoint.scm.getMachineById(id)),
  create: (input: Machine) =>
    HttpClient.post<Machine>(ApiEndpoint.scm.createMachine, input),
  update: (input: Machine) =>
    HttpClient.put<Machine>(ApiEndpoint.scm.updateMachine, input),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.scm.deleteMachine(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteMachine, ids)
  },
}
