"use client"

import { useSelectOptions } from "@/hooks/use-select-options"
import ProductEditForm from "@/modules/crm/components/containers/products/edit-form"
import { useAttributeList } from "@/modules/crm/hooks/use-attribute"
import { useCategoryList } from "@/modules/crm/hooks/use-category"
import { Attribute } from "@/modules/crm/types/attribute"
import { Category } from "@/modules/crm/types/category"

export default function ProductCreateTemplate() {
  const { data: categories } = useCategoryList()
  const categoryOptions = useSelectOptions<Category>(categories?.data, "name")

  const { data: attributes } = useAttributeList()
  const attributeOptions = useSelectOptions<Attribute>(attributes?.data, "name")

  return (
    <ProductEditForm
      categoryOptions={categoryOptions}
      attributeOptions={attributeOptions}
    />
  )
}
