import { metaObject } from "@/config/site.config"
import ProductEntryPage from "@/modules/scm/components/templates/inventory/products/product-entry/page"

export const metadata = {
  ...metaObject("Product Entry"),
}

export default function page() {
  return (
    <>
      <ProductEntryPage />
    </>
  )
}
