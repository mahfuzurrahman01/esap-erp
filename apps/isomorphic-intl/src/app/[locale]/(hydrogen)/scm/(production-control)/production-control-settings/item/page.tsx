import { metaObject } from "@/config/site.config"
import Item from "@/modules/scm/components/templates/production-control/production-control-settings/item"

export const metadata = {
  ...metaObject("Item"),
}

function page() {
  return (
    <>
      <Item />
    </>
  )
}

export default page
