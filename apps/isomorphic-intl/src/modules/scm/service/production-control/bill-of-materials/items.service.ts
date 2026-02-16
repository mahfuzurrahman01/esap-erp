import {
  Item,
  ItemPaginator,
  ItemQueryOptions,
} from "@/modules/scm/types/production-control/bill-of-materials/items-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ItemService = {
  all: (params?: Partial<ItemQueryOptions>) => {
    return HttpClient.get<ItemPaginator>(ApiEndpoint.scm.getAllItems, params)
  },
  get: (id: number) => HttpClient.get<Item>(ApiEndpoint.scm.getItemById(id)),
  create: (input: Item) =>
    HttpClient.post<Item>(ApiEndpoint.scm.createItem, input),
  update: (input: Item) =>
    HttpClient.put<Item>(ApiEndpoint.scm.updateItem, input),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.scm.deleteItem(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteItem, ids)
  },
}
