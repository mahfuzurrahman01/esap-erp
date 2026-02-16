import { metaObject } from "@/config/site.config"
import ForecastCreatePage from "@/modules/scm/components/templates/demand-and-forecasting/forecast/create-forecast"

export const metadata = {
  ...metaObject("Create Forecast"),
}

export default function page() {
  return (
    <>
      <ForecastCreatePage />
    </>
  )
}
