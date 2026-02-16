"use client"

import { useEffect, useState } from "react"

import { SubmitHandler } from "react-hook-form"

import { DEFAULT_PRODUCT_VALUES } from "@/modules/scm/constants/product-constants"
import {
  useCreateProduct,
  useProductById,
  useUpdateProduct,
} from "@/modules/scm/hooks"
import { useGlobalStoreState } from "@/modules/scm/store/global-store-state"
import { Product } from "@/modules/scm/types/inventory/products/products-types"

import { calculatePurchasePrice, calculateSellingPrice } from "./form-utils"

interface UseProductFormProps {
  id: number
  initialData?: Product
  mode?: "create" | "edit" | "view"
}

export const useProductForm = ({
  id,
  mode = "create",
}: UseProductFormProps) => {
  const isFieldDisabled = mode === "view"
  const { companyNameTemplate, assetCategoryNameTemplate, isFixedAssetTemplate } =
    useGlobalStoreState()

  const [formValues, setFormValues] = useState(DEFAULT_PRODUCT_VALUES)

  const { data: productDetails, isLoading: isProductDetailsLoading } =
    useProductById(id) as {
      data: Product | undefined
      isLoading: boolean
    }

  useEffect(() => {
    setFormValues({
      ...DEFAULT_PRODUCT_VALUES,
      companyName: companyNameTemplate || "",
      assetCategoryName: assetCategoryNameTemplate || "",
      isFixedAsset: isFixedAssetTemplate || false,
    })
  }, [])

  useEffect(() => {
    if (productDetails) {
      setFormValues({
        ...productDetails,
        productCategoryId: productDetails.productCategoryId || 0,
        isFixedAsset: productDetails.isFixedAsset || isFixedAssetTemplate || false,
        assetCategoryId: productDetails.assetCategoryId || 0,
        companyName: companyNameTemplate || productDetails.companyName || "",
        assetCategoryName:
          assetCategoryNameTemplate || productDetails.assetCategoryName || "",
        companyId: productDetails.companyId || 0,
        purchasePrice: productDetails.purchasePrice || 0,
        sellingPrice: productDetails.sellingPrice || 0,
        salesTax: productDetails.salesTax || 0,
        avatarFile: productDetails.imageUrl || undefined,
        description: productDetails.description || "",
      })
    }
  }, [productDetails])

  const { mutateAsync: createProduct, isPending: isCreating } =
    useCreateProduct()
  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct()

  const getFormValues = () => formValues

  const onSubmit: SubmitHandler<Product> = async (formData: Product) => {
    // Start with the original values
    let updatedPurchasePrice = (
      productDetails?.purchasePrice ??
      formData.purchasePrice ??
      0
    ).toFixed(2)
    let updatedSellingPrice = (
      productDetails?.sellingPrice ??
      formData.sellingPrice ??
      0
    ).toFixed(2)

    if (mode === "edit") {
      // Only calculate if the values are different from the original product details
      if (
        formData.purchasePrice !== productDetails?.purchasePrice ||
        formData.purchaseTax !== productDetails?.purchaseTax
      ) {
        updatedPurchasePrice = calculatePurchasePrice(
          formData?.purchasePrice || 0,
          formData?.purchaseTax || 0
        ).toFixed(2)
      }

      if (
        formData.sellingPrice !== productDetails?.sellingPrice ||
        formData.salesTax !== productDetails?.salesTax ||
        formData.discount !== productDetails?.discount
      ) {
        updatedSellingPrice = calculateSellingPrice(
          formData?.sellingPrice || 0,
          formData?.salesTax || 0,
          formData?.discount || 0
        ).toFixed(2)
      }
    } else {
      // For create mode, always calculate
      updatedPurchasePrice = calculatePurchasePrice(
        formData?.purchasePrice || 0,
        formData?.purchaseTax || 0
      ).toFixed(2)
      updatedSellingPrice = calculateSellingPrice(
        formData?.sellingPrice || 0,
        formData?.salesTax || 0,
        formData?.discount || 0
      ).toFixed(2)
    }

    const formattedData = {
      ...formData,
      ...(mode === "edit" && { id: id || 0 }),
      companyName: companyNameTemplate || productDetails?.companyName || "",
      assetCategoryName:
        assetCategoryNameTemplate || productDetails?.assetCategoryName || "",
      purchasePrice: Number(updatedPurchasePrice),
      sellingPrice: Number(updatedSellingPrice),
    }

    if (mode === "edit") {
      await updateProduct({ data: formattedData as Product })
    } else {
      await createProduct(formattedData as Product)
    }
  }

  return {
    isFieldDisabled,
    onSubmit,
    getFormValues,
    formValues,
    isLoading: isProductDetailsLoading || isCreating || isUpdating,
  }
}
