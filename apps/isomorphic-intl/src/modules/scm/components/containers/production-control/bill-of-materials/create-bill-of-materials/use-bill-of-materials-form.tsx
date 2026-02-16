"use client";

import { useEffect, useState } from "react";



import { useAtom } from "jotai";
import { SubmitHandler } from "react-hook-form";



import { currencyNameTemplate } from "@/modules/scm/components/containers/procurement/requisition/create-requisition";
import { DEFAULT_BILL_OF_MATERIALS_VALUES } from "@/modules/scm/constants/bill-of-materials-constants";
import { useBillOfMaterialsById, useCreateBillOfMaterials, useUpdateBillOfMaterials } from "@/modules/scm/hooks";
import { useProductById } from "@/modules/scm/hooks/inventory/product/use-product";
import { useProductMaterial } from "@/modules/scm/hooks/shared/use-product-material";
import { companyNameTemplate } from "@/modules/scm/store/global-store-state";
import { useRequisitionStore } from "@/modules/scm/store/requisition-store";
import { Product } from "@/modules/scm/types/inventory/products/products-types";
import { BillOfMaterials } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type";





interface UseBillOfMaterialsFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
}

export const useBillOfMaterialsForm = ({
  id,
  mode = "create",
}: UseBillOfMaterialsFormProps) => {
  const isFieldDisabled = mode === "view"
  const { selectedProductTemplate } = useRequisitionStore()
  const [currencyName] = useAtom(currencyNameTemplate)
  const [companyName] = useAtom(companyNameTemplate)
  const [formValues, setFormValues] = useState(DEFAULT_BILL_OF_MATERIALS_VALUES)

  const {
    productItems,
    setProductItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
  } = useProductMaterial()

  const { data: productDetails, isLoading: isProductDetailsLoading } =
    useProductById(selectedProductTemplate) as {
      data: Product | undefined
      isLoading: boolean
    }

  const {
    data: billOfMaterialsDetails,
    isLoading: isBillOfMaterialsDetailsLoading,
  } = useBillOfMaterialsById(Number(id)) as {
    data: BillOfMaterials | undefined
    isLoading: boolean
  }

  useEffect(() => {
    if (productDetails && !isProductDetailsLoading) {
      setProductItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.productId === productDetails.id) {
            return {
              ...item,
              itemUnitId: productDetails.itemUnitId,
              unitCost:
                productDetails.sellingPrice || productDetails.purchasePrice,
            }
          }
          return item
        })
      })
    }
  }, [productDetails, isProductDetailsLoading])



  useEffect(() => {
    if (billOfMaterialsDetails && !isBillOfMaterialsDetailsLoading) {
      const items =
        billOfMaterialsDetails.billOfMaterialItems?.map((item) => ({
          ...item,
          id: item.id || 0,
          billOfMaterialId: billOfMaterialsDetails.id || 0,
          productId: item.productId || 0,
          quantity: item.quantity || 0,
          unitCost: item.unitCost || 0,
          totalCost: (item.quantity || 0) * (item.unitCost || 0),
        })) || []
      setProductItems(items)
      setFormValues({
        ...billOfMaterialsDetails,
        currencyName: billOfMaterialsDetails.currencyName || currencyName || "",
        companyName: billOfMaterialsDetails.companyName || companyName || "",
      })
    }
  }, [billOfMaterialsDetails, isBillOfMaterialsDetailsLoading])

  const calculateMaterialCost = () => {
    return productItems.reduce((total, item) => {
      return total + (item.totalCost || 0)
    }, 0)
  }

  const { mutateAsync: createBillOfMaterials, isPending: isCreatePending } =
    useCreateBillOfMaterials()

  const { mutateAsync: updateBillOfMaterials, isPending: isUpdatePending } =
    useUpdateBillOfMaterials()

  const getFormValues = () => formValues

  const onSubmit: SubmitHandler<BillOfMaterials> = async (data) => {
    const formattedData = {
      ...data,
      currencyName: data.currencyName || currencyName || "",
      companyName: data.companyName || companyName || "",
    }
    const billOfMaterials = {
      ...formattedData,
      billOfMaterialItems: productItems,
    }
    if (mode === "edit" && billOfMaterialsDetails) {
      await updateBillOfMaterials({
        data: {
          id: id || 0,
          ...billOfMaterials,
        },
      })
    } else {
      await createBillOfMaterials(billOfMaterials)
    }
  }

  return {
    getFormValues,
    isFieldDisabled,
    productItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
    calculateMaterialCost,
    onSubmit,
    isLoading:
      isProductDetailsLoading ||
      isBillOfMaterialsDetailsLoading ||
      isCreatePending ||
      isUpdatePending,
  }
}