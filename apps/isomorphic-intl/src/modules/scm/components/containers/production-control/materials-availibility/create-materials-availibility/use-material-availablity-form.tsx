"use client"

import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { SubmitHandler } from "react-hook-form"

import { DEFAULT_MATERIAL_AVAILABILITY_VALUES } from "@/modules/scm/constants/material-availability-constants"
import {
  useBillOfMaterialsById,
  useCreateMaterialRequirementsPlanning,
  useMaterialRequirementsPlanningById,
  useProductById,
  useUpdateMaterialRequirementsPlanning,
} from "@/modules/scm/hooks"
import { useStockList } from "@/modules/scm/hooks/inventory/stock/use-stock"
import { useMaterialAvailabilityItems } from "@/modules/scm/hooks/shared/use-material-availability-items"
import { useRequisitionStore } from "@/modules/scm/store/requisition-store"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { BillOfMaterials } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type"
import { MaterialRequirementsPlanning } from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-planning-types"

interface UseMaterialAvailabilityFormProps {
  id: number
  mode?: "create" | "edit" | "view"
}

export const useMaterialAvailabilityForm = ({
  id,
  mode = "create",
}: UseMaterialAvailabilityFormProps) => {
  const pathname = usePathname()
  const isFieldDisabled = mode === "view"
  const { selectedProductTemplate } = useRequisitionStore()

  const [formValues, setFormValues] = useState<MaterialRequirementsPlanning>(
    DEFAULT_MATERIAL_AVAILABILITY_VALUES
  )

  const currentPath = useMemo(() => {
    const pathSegments = pathname?.split("/") || []
    const basePathIndex = pathSegments.findIndex((segment) =>
      ["bill-of-materials", "material-availability"].includes(segment)
    )
    return basePathIndex !== -1 ? pathSegments[basePathIndex] : null
  }, [pathname])

  // Map the path to our internal types
  const pathType = useMemo(() => {
    switch (currentPath) {
      case "bill-of-materials":
        return "billOfMaterials"
      case "material-availability":
        return "materialAvailability"
      default:
        return null
    }
  }, [currentPath])

  const {
    materialAvailabilityItems,
    setMaterialAvailabilityItems,
    handleMaterialAvailabilityItemsChange,
    handleMaterialAvailabilityItemsDelete,
    handleMaterialAvailabilityItemsAdd,
  } = useMaterialAvailabilityItems()

  const { data: stockList, isLoading: isStockListLoading } = useStockList()

  const { data: productDetails, isLoading: isProductDetailsLoading } =
    useProductById(selectedProductTemplate) as {
      data: Product | undefined
      isLoading: boolean
    }

  const {
    data: billOfMaterialsDetails,
    isLoading: isBillOfMaterialsDetailsLoading,
  } = useBillOfMaterialsById(
    pathType === "billOfMaterials" ? Number(id) : 0
  ) as {
    data: BillOfMaterials | undefined
    isLoading: boolean
  }

  const {
    data: materialAvailabilityDetails,
    isLoading: isMaterialAvailabilityDetailsLoading,
  } = useMaterialRequirementsPlanningById(
    pathType === "materialAvailability" ? Number(id) : 0
  ) as {
    data: MaterialRequirementsPlanning | undefined
    isLoading: boolean
  }

  useEffect(() => {
    if (productDetails && !isProductDetailsLoading) {
      setMaterialAvailabilityItems((prevItems) => {
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
    if (
      billOfMaterialsDetails &&
      !isBillOfMaterialsDetailsLoading &&
      stockList &&
      !isStockListLoading
    ) {
      // Get unique product IDs from materialAvailabilityItems
      const productIds = Array.from(
        new Set(
          billOfMaterialsDetails?.billOfMaterialItems?.map(
            (item) => item.productId
          )
        )
      )
      const stockListItems = stockList?.data?.filter((item) =>
        productIds.includes(item.productId)
      )

      const inventoryMap = stockListItems?.reduce(
        (acc, item) => {
          if (item.productId !== undefined) {
            acc[item.productId] = item
          }
          return acc
        },
        {} as Record<number, any>
      )

      setMaterialAvailabilityItems(
        billOfMaterialsDetails?.billOfMaterialItems?.map((items) => ({
          inventoryId:
            items.productId !== undefined
              ? (inventoryMap ?? {})[items.productId]?.id
              : undefined,
          productId: items.productId,
          itemUnitId: items.itemUnitId,
          unitCost: items.unitCost,
          requiredQuantity: items.quantity,
          availableQuantity:
            items.productId !== undefined
              ? (inventoryMap ?? {})[items.productId]?.currentQuantity
              : undefined,
          shortage:
            items.productId !== undefined
              ? (items.quantity ?? 0) >
                (inventoryMap ?? {})[items.productId]?.currentQuantity
                ? (items.quantity ?? 0) -
                  (inventoryMap ?? {})[items.productId]?.currentQuantity
                : 0
              : undefined,
        })) ?? []
      )
      setFormValues({
        ...materialAvailabilityDetails,
        scheduledProductionStart: billOfMaterialsDetails?.scheduledFrom || "",
        scheduledProductionEnd: billOfMaterialsDetails?.scheduledTo || "",
      })
    }
  }, [billOfMaterialsDetails, isBillOfMaterialsDetailsLoading])

  useEffect(() => {
    if (materialAvailabilityDetails && !isMaterialAvailabilityDetailsLoading) {
      setMaterialAvailabilityItems(
        materialAvailabilityDetails.materialRequirementItems ?? []
      )
      setFormValues(materialAvailabilityDetails)
    }
  }, [materialAvailabilityDetails, isMaterialAvailabilityDetailsLoading])

  const getFormValues = () => formValues

  const {
    mutate: createMaterialAvailability,
    isPending: isCreateMaterialAvailabilityLoading,
  } = useCreateMaterialRequirementsPlanning()

  const {
    mutate: updateMaterialAvailability,
    isPending: isUpdateMaterialAvailabilityLoading,
  } = useUpdateMaterialRequirementsPlanning()

  const onSubmit: SubmitHandler<MaterialRequirementsPlanning> = async (
    data
  ) => {
    const formattedData = {
      ...data,
      materialRequirementItems: materialAvailabilityItems.map((item) => ({
        ...item,
        inventoryId: item.inventoryId ?? undefined,
      })),
    }

    if (mode === "edit") {
      updateMaterialAvailability({
        data: {
          ...formattedData,
          id: Number(id),
        },
      })
    } else {
      createMaterialAvailability(formattedData)
    }
  }

  return {
    materialAvailabilityItems,
    setMaterialAvailabilityItems,
    handleMaterialAvailabilityItemsChange,
    handleMaterialAvailabilityItemsDelete,
    handleMaterialAvailabilityItemsAdd,
    getFormValues,
    onSubmit,
    isFieldDisabled,
    isLoading:
      isCreateMaterialAvailabilityLoading ||
      isUpdateMaterialAvailabilityLoading ||
      isProductDetailsLoading ||
      isMaterialAvailabilityDetailsLoading ||
      isBillOfMaterialsDetailsLoading ||
      isStockListLoading,
  }
}
