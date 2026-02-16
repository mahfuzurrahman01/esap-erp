import { metaObject } from "@/config/site.config"
import ForecastListPage from "@/modules/scm/components/templates/demand-and-forecasting/forecast/forecast-list"

export const metadata = {
  ...metaObject("Demand Forecasting"),
}

export default function page() {
  return (
    <>
      <ForecastListPage />
    </>
  )
}
