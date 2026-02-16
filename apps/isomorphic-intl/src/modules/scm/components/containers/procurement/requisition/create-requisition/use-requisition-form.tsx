"use client"

import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { useAtom } from "jotai"
import { SubmitHandler } from "react-hook-form"

import { DEFAULT_REQUISITION_VALUES } from "@/modules/scm/constants/requisition-constants"
import {
  useMaterialRequirementsPlanningById,
  useProductById,
  useSalesOperationPlanById,
  useStockReplenishmentById,
} from "@/modules/scm/hooks"
import {
  useCreateRequisition,
  useRequisitionById,
  useUpdateRequisition,
} from "@/modules/scm/hooks/procurement/requisition/use-requisition"
import { useProductItems } from "@/modules/scm/hooks/shared/use-product-items"
import { useRequisitionStore } from "@/modules/scm/store/requisition-store"
import { SalesOperationPlan } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-plan-types"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { StockReplenishment } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types"
import {
  Requisition,
  RequisitionInput,
  RequisitionItemDtos,
  RequisitionUpdate,
} from "@/modules/scm/types/procurement/requisition/requisition-types"
import { ProductItemsUtils } from "@/modules/scm/utils/items-calculation"
import { formatDateToISO } from "@/utils/format-date-to-iso"

import { currencyNameTemplate, previewDataTemplate } from "."
import { MaterialRequirementsPlanning } from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-planning-types"
import { useCurrentUser } from "@/hooks/auth/use-auth"

interface UseRequisitionFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
  requestFor?: "requisition" | "stockReplenishment" | "salesOperationPlan" | "materialAvailability"
}

export const useRequisitionForm = ({
  id,
  mode,
  requestFor,
}: UseRequisitionFormProps) => {
  const pathname = usePathname()
  const isFieldDisabled = mode === "view"
  const [previewData] = useAtom(previewDataTemplate)
  const [currencyName] = useAtom(currencyNameTemplate)
  const { selectedProductTemplate } = useRequisitionStore()
  const {user} = useCurrentUser()

  const [formValues, setFormValues] = useState(DEFAULT_REQUISITION_VALUES)

  const {
    productItems,
    setProductItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
  } = useProductItems()

  // Get the base path before the ID
  const currentPath = useMemo(() => {
    const pathSegments = pathname?.split("/") || []
    const basePathIndex = pathSegments.findIndex((segment) =>
      ["requisitions", "sales-operations-plan", "stock-replenishment", "material-availability"].includes(
        segment
      )
    )
    return basePathIndex !== -1 ? pathSegments[basePathIndex] : null
  }, [pathname])

  // Map the path to our internal types
  const pathType = useMemo(() => {
    switch (currentPath) {
      case "requisitions":
        return "requisitions"
      case "sales-operations-plan":
        return "salesOperationPlan"
      case "stock-replenishment":
        return "stockReplenishment"
      case "material-availability":
        return "materialAvailability"
      default:
        return null

    }
  }, [currentPath])

  const { calculateTotalAmount, calculateTotalQuantity } = ProductItemsUtils()

  const { data: productDetails, isLoading: isProductDetailsLoading } =
    useProductById(selectedProductTemplate) as {
      data: Product | undefined
      isLoading: boolean
    }

  const { data: requisitionDetails, isLoading: isRequisitionDetailsLoading } =
    useRequisitionById(pathType === "requisitions" ? Number(id) : 0) as {
      data: Requisition | undefined
      isLoading: boolean
    }

  const {
    data: stockReplenishmentDetails,
    isLoading: isStockReplenishmentDetailsLoading,
  } = useStockReplenishmentById(
    pathType === "stockReplenishment" ? Number(id) : 0
  ) as {
    data: StockReplenishment | undefined
    isLoading: boolean
  }

  const {
    data: salesOperationPlanDetails,
    isLoading: isSalesOperationPlanDetailsLoading,
  } = useSalesOperationPlanById(
    pathType === "salesOperationPlan" ? Number(id) : 0
  ) as {
    data: SalesOperationPlan | undefined
    isLoading: boolean
  }

  const { data: materialAvailabilityDetails, isLoading: isMaterialAvailabilityDetailsLoading } =
    useMaterialRequirementsPlanningById(
      pathType === "materialAvailability" ? Number(id) : 0
    ) as {
      data: MaterialRequirementsPlanning | undefined
      isLoading: boolean
    }

  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement

  const file = fileInput?.files?.[0]

  const formData = new FormData()
  if (file) {
    formData.append("bsFile", file)
  }

  // Add this effect to handle product selection updates
  useEffect(() => {
    if (
      productDetails &&
      !isProductDetailsLoading &&
      (requestFor === "requisition" ||
        requestFor === "salesOperationPlan" ||
        requestFor === "stockReplenishment" ||
        requestFor === "materialAvailability")
    ) {
      setProductItems((prevItems) => {
        return prevItems.map((item) => {

          if (item.productId === productDetails.id) {
            return {
              ...item,
              itemUnitId: productDetails.itemUnitId,
              unitPrice:
                productDetails.sellingPrice || productDetails.purchasePrice,
            }
          }
          return item
        })
      })
    }
  }, [productDetails, isProductDetailsLoading])

  useEffect(() => {
    if (user) {
      setFormValues({
        ...formValues,
        requestedBy: user.name || "",
      })
    }
  }, [user])
  useEffect(() => {
    if (requisitionDetails && pathType === "requisitions") {
      setProductItems(
        requisitionDetails.requisitionItemDtos?.map((item) => ({
          ...item,

          id: item.id || 0,
          requisitionId: requisitionDetails.id || 0,
        })) || []
      )
      setFormValues({
        ...requisitionDetails,
        supplierId: requisitionDetails?.supplierId || 0,
        requestedBy: requisitionDetails?.requestedBy || "",
        requestedDate: requisitionDetails?.requestedDate || "",
        expectedDeliveryDate: requisitionDetails?.expectedDeliveryDate || "",
        billingStatus: requisitionDetails?.billingStatus || "",
        fiscalPosition: requisitionDetails?.fiscalPosition || "",
        projectName: requisitionDetails?.projectName || "",
        priority: requisitionDetails?.priority || "",
        companyName: requisitionDetails?.companyName || "",
        companyId: requisitionDetails?.companyId || 0,
        currencyId: requisitionDetails?.currencyId || 0,
        currencyName: requisitionDetails?.currencyName || currencyName || "",
        paymentTermsId: requisitionDetails?.paymentTermsId || 0,
        documentFile: requisitionDetails?.documentUrl || previewData[0] || "",
        reqAmount: calculateTotalAmount(productItems),
        totalQuantity: calculateTotalQuantity(productItems),
      })
    }
  }, [requisitionDetails])

  useEffect(() => {
    if (
      stockReplenishmentDetails &&
      pathType === "stockReplenishment" &&
      productDetails
    ) {
      setProductItems([
        {
          productId: stockReplenishmentDetails?.productId || 0,
          quantity: 0,
          itemUnitId: productDetails?.itemUnitId || 0,
          unitPrice:
            productDetails?.sellingPrice || productDetails?.purchasePrice,
        },
      ])
      setFormValues({
        supplierId: stockReplenishmentDetails?.supplierId || 0,
        requestedBy: "",
        requestedDate: "",
        expectedDeliveryDate:
          stockReplenishmentDetails?.expectedDeliveryDate || "",
        billingStatus: "",
        fiscalPosition: "",
        projectName: "",
        priority: "",
        companyName: "",
        companyId: 0,
        currencyId: 0,
        currencyName: "",
      })
    }
  }, [stockReplenishmentDetails])

  useEffect(() => {
    if (
      salesOperationPlanDetails &&
      pathType === "salesOperationPlan" &&
      productDetails
    ) {
      setProductItems([
        {
          productId: salesOperationPlanDetails?.productId || 0,
          quantity: salesOperationPlanDetails?.adjustedForecast || 0,
          itemUnitId: productDetails?.itemUnitId || 0,
          unitPrice:
            productDetails?.sellingPrice || productDetails?.purchasePrice,
        },
      ])
      setFormValues({
        supplierId: 0,
        requestedBy: "",
        requestedDate: "",
        expectedDeliveryDate: "",
        billingStatus: "",
        fiscalPosition: "",
        projectName: "",
        priority: "",
        companyName: "",
        companyId: 0,
        currencyId: 0,
        currencyName: "",
      })
    }
  }, [salesOperationPlanDetails, pathname, productDetails])


  useEffect(() => {
    if (materialAvailabilityDetails && pathType === "materialAvailability") {
      setProductItems(materialAvailabilityDetails?.materialRequirementItems?.map((item) => ({
        ...item,
        productId: item.productId || 0,
        quantity: item.shortage || 0,
        itemUnitId: item.itemUnitId || 0,
        unitPrice: item.unitCost || 0,
      })) || [])
    }
  }, [materialAvailabilityDetails])


  const { setSelectedProductTemplate } = useRequisitionStore()

  useEffect(() => {
    if (salesOperationPlanDetails?.productId) {
      setSelectedProductTemplate(salesOperationPlanDetails.productId)
    }
  }, [salesOperationPlanDetails, setSelectedProductTemplate])

  useEffect(() => {
    if (stockReplenishmentDetails?.productId) {
      setSelectedProductTemplate(stockReplenishmentDetails.productId)
    }
  }, [stockReplenishmentDetails, setSelectedProductTemplate])

  const getFormValues = () => formValues

  const { mutateAsync: createRequisition, isPending: isCreatePending } =
    useCreateRequisition()

  const { mutateAsync: updateRequisition, isPending: isUpdatePending } =
    useUpdateRequisition()

  const onSubmit: SubmitHandler<RequisitionInput | RequisitionUpdate> = async (
    data
  ) => {
    const formatDates = (date: string | null) =>
      formatDateToISO(date ? new Date(date) : null)

    const formattedData = {
      ...data,
      currencyName: data.currencyName || currencyName || "",
      documentFile: data.documentFile || previewData[0] || "",
      expectedDeliveryDate: formatDates(data.expectedDeliveryDate || ""),
      requestedDate: formatDates(data.requestedDate || ""),
      reqAmount: calculateTotalAmount(productItems),
      totalQuantity: calculateTotalQuantity(productItems),
    }

    if (mode === "edit" && requisitionDetails) {
      const updateData = {
        ...formattedData,
        documentFile:
          formattedData.documentFile || requisitionDetails.documentUrl,
        id: requisitionDetails.id,
        updateRequisitionItemDtos: productItems.map((item) => ({
          ...item,
          requisitionId: requisitionDetails.id || 0,
        })) as RequisitionItemDtos[],
      }
      await updateRequisition({ data: updateData })
    } else {
      const createData = {
        ...formattedData,
        saveRequisitionItemDtos: productItems,
      }
      await createRequisition(createData as RequisitionInput)
    }
  }
  return {
    isFieldDisabled,
    productItems,
    handleProductItemChange,
    handleProductItemDelete,
    handleProductItemAdd,
    getFormValues,
    onSubmit,
    initialData: requisitionDetails,
    isLoading:
      isRequisitionDetailsLoading ||
      isCreatePending ||
      isUpdatePending ||
      isSalesOperationPlanDetailsLoading ||
      isStockReplenishmentDetailsLoading ||
      isMaterialAvailabilityDetailsLoading,
  }
}
