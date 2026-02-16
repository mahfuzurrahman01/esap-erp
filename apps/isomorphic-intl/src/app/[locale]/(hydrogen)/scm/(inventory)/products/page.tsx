import { metaObject } from "@/config/site.config"
import ProductListPage from "@/modules/scm/components/templates/inventory/products/product-list"

export const metadata = {
  ...metaObject("Products List"),
}

export default function page() {
  return (
    <>
      <ProductListPage />
    </>
  )
}
