import { metaObject } from "@/config/site.config"
import WarehouseListPage from "@/modules/scm/components/templates/inventory/warehouse/warehouse-list"

export const metadata = {
  ...metaObject("Warehouse List"),
}

export default function page() {
  return (
    <>
      <WarehouseListPage />
    </>
  )
}
