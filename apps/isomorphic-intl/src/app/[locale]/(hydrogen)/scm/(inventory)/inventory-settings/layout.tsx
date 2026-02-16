import { metaObject } from "@/config/site.config"

export const metadata = {
  ...metaObject("Inventory Settings"),
}

const InventorySettingsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <>{children}</>
}

export default InventorySettingsLayout
