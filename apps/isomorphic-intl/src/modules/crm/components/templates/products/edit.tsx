"use client"

import { useSelectOptions } from "@/hooks/use-select-options"
import SkeletonLoader from "@/components/base/skeleton-loader"
import ProductEditForm from "@/modules/crm/components/containers/products/edit-form"
import { useAttributeList } from "@/modules/crm/hooks/use-attribute"
import { useCategoryList } from "@/modules/crm/hooks/use-category"
import { useProductById } from "@/modules/crm/hooks/use-product"
import { Attribute } from "@/modules/crm/types/attribute"
import { Category } from "@/modules/crm/types/category"
import { ProductView } from "@/modules/crm/types/product"

export default function ProductEditTemplate({ id }: { id: string }) {
  const { data, isLoading } = useProductById(id) as {
    data: { data: ProductView } | undefined
    isLoading: boolean
  }
  const productData = data?.data

  const { data: categories } = useCategoryList()
  const categoryOptions = useSelectOptions<Category>(categories?.data, "name")

  const { data: attributes } = useAttributeList()
  const attributeOptions = useSelectOptions<Attribute>(attributes?.data, "name")

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <ProductEditForm
      id={id}
      productData={productData}
      categoryOptions={categoryOptions}
      attributeOptions={attributeOptions}
    />
  )
}
