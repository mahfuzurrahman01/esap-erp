import { metaObject } from "@/config/site.config"
import WarehouseViewPage from "@/modules/scm/components/templates/inventory/warehouse/warehouse-view"

export const metadata = {
  ...metaObject("Warehouse Details"),
}

export default function page() {
  return (
    <div>
      <WarehouseViewPage />
    </div>
  )
}
