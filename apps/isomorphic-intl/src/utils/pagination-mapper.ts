import { PaginationResponse } from "@/modules/fms/types"

export function mapPaginatorData<T>(data?: { pages: PaginationResponse<T>[] }) {
  if (!data?.pages?.length) {
    return {
      pageIndex: 0,
      pageSize: 10,
      count: 0,
      data: [],
    }
  }

  const lastPage = data.pages[data.pages.length - 1]
  return {
    pageIndex: lastPage.pageIndex - 1,
    pageSize: lastPage.pageSize,
    count: lastPage.count,
    data: lastPage.data,
  }
}
