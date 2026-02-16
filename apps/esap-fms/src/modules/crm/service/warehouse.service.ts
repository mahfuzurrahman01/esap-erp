import {
  WarehousePaginator,
  WarehouseQueryOptions,
} from "@/modules/crm/types/warehouse"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const warehouse = {
  all: (params: Partial<WarehouseQueryOptions>) =>
    httpClient.get<WarehousePaginator>(ApiEndpoint.crm.warehouses, params),
}
