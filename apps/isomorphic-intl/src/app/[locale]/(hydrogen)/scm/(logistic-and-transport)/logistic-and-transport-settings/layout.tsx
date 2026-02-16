import { metaObject } from "@/config/site.config"

export const metadata = {
  ...metaObject("Logistic And Transport Settings"),
}

const LogisticAndTransportSettingsLayout = ({
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

export default LogisticAndTransportSettingsLayout
