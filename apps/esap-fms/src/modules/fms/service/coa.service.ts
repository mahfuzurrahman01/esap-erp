import { COAList, COAPaginator, COAQueryOptions } from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const COAService = {
  all: (params: Partial<COAQueryOptions>) => {
    return HttpClient.get<COAPaginator>(
      ApiEndpoint.fms.COA,
      params,
      EndpointType.FMS
    )
  },
  get: async (id: number): Promise<COAList> => {
    const response = await HttpClient.get<COAList>(
      ApiEndpoint.fms.COAById(id),
      undefined,
      EndpointType.FMS
    )
    return response
  },
  create: (input: COAList) =>
    HttpClient.post<COAList>(
      ApiEndpoint.fms.createCOA,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: COAList) =>
    HttpClient.put<COAList>(
      ApiEndpoint.fms.updateCOA,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.fms.deleteCOA(id), EndpointType.FMS),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<COAList>(
      ApiEndpoint.fms.bulkCOA,
      ids,
      EndpointType.FMS
    ),
}
