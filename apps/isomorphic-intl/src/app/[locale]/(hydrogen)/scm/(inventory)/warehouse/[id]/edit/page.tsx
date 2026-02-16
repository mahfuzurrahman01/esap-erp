import { metaObject } from "@/config/site.config"
import WarehouseEditPage from "@/modules/scm/components/templates/inventory/warehouse/warehousee-edit"

export const metadata = {
  ...metaObject("Edit Warehouse"),
}

export default function page() {
  return (
    <div>
      <WarehouseEditPage />
    </div>
  )
}
