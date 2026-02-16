import {
  ItemUnit,
  ItemUnitPaginator,
  ItemUnitQueryOptions,
} from "@/modules/scm/types/procurement/requisition/item-unit-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ItemUnitService = {
  all: (params: Partial<ItemUnitQueryOptions>) =>
    HttpClient.get<ItemUnitPaginator>(ApiEndpoint.scm.getAllItemUnit, params),
  get: (id: number) =>
    HttpClient.get<ItemUnit>(ApiEndpoint.scm.getItemUnitById(id)),
  create: (input: ItemUnit) =>
    HttpClient.post<ItemUnit>(ApiEndpoint.scm.createItemUnit, input),
  update: (input: ItemUnit) =>
    HttpClient.put<ItemUnit>(ApiEndpoint.scm.updateItemUnit, input),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.scm.deleteItemUnit(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteItemUnit, ids)
  },
}
