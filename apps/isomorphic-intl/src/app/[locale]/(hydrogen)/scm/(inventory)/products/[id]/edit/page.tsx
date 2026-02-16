import { metaObject } from "@/config/site.config"
import ProductEditPage from "@/modules/scm/components/templates/inventory/products/product-edit"

export const metadata = {
  ...metaObject("Product Edit"),
}

export default function page() {
  return (
    <>
      <ProductEditPage />
    </>
  )
}
