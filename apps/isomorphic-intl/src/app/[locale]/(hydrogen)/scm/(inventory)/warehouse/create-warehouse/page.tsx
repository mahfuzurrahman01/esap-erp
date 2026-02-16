import { metaObject } from "@/config/site.config"
import WarehouseCreatePage from "@/modules/scm/components/templates/inventory/warehouse/warehouse-create"

export const metadata = {
  ...metaObject("Warehouse Create"),
}

export default function page() {
  return (
    <div>
      <WarehouseCreatePage />
    </div>
  )
}
