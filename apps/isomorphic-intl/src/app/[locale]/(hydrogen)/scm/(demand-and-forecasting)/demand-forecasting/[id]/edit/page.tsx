import { metaObject } from "@/config/site.config"
import ForecastEditPage from "@/modules/scm/components/templates/demand-and-forecasting/forecast/forecast-edit"

export const metadata = {
  ...metaObject("Forecast Edit"),
}

export default function page() {
  return (
    <>
      <ForecastEditPage />
    </>
  )
}
