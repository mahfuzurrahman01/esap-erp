import { metaObject } from "@/config/site.config"
import ShipmentListPage from "@/modules/scm/components/templates/logistic-and-transport/shipment"

export const metadata = {
  ...metaObject("Shipment"),
}

export default function page() {
  return <ShipmentListPage />
}
