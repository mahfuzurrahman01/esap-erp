import { metaObject } from "@/config/site.config"

export const metadata = {
  ...metaObject("Procurement Settings"),
}

const ProcurementSettingsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <>{children}</>
}

export default ProcurementSettingsLayout
