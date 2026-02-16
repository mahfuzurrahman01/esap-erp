import { metaObject } from "@/config/site.config"

export const metadata = {
  ...metaObject("Demand Forecasting Settings"),
}

const DemandForecastingSettingsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      {children}
    </>
  )
}

export default DemandForecastingSettingsLayout
