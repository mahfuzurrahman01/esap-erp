import { metaObject } from "@/config/site.config"

export const metadata = {
  ...metaObject("Production Control Settings"),
}

const ProductionControlSettingsLayout = ({
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

export default ProductionControlSettingsLayout
