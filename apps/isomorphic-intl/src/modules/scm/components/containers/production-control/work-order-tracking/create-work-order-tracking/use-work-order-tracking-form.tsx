"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";



import { useAtom } from "jotai";
import { SubmitHandler } from "react-hook-form";



import { DEFAULT_WORK_ORDER_VALUES } from "@/modules/scm/constants/work-order-constants";
import { useBillOfMaterialsById, useCreateWorkOrder, useMaterialRequirementsPlanningById, useUpdateWorkOrder, useWorkOrderById } from "@/modules/scm/hooks";
import { useWorkOrderItems } from "@/modules/scm/hooks/shared/use-work-order-items";
import { assignedToName, employeeName } from "@/modules/scm/store/global-store-state";
import { BillOfMaterials } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type";
import { MaterialRequirementsPlanning } from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-planning-types";
import { WorkOrder } from "@/modules/scm/types/production-control/work-order-tracking/work-order-types";





interface UseWorkOrderTrackingFormProps {
  id: number
  mode?: "create" | "edit" | "view"
}

export const useWorkOrderTrackingForm = ({
  id,
  mode = "create",
}: UseWorkOrderTrackingFormProps) => {
  const isFieldDisabled = mode === "view"
  const pathname = usePathname()
  const [formValues, setFormValues] = useState<WorkOrder>(
    DEFAULT_WORK_ORDER_VALUES
  )
  const [assignedToNameTemplate] = useAtom(assignedToName)
  const [employeeNameTemplate] = useAtom(employeeName)

  const currentPath = useMemo(() => {
    const pathSegments = pathname?.split("/") || []
    const basePathIndex = pathSegments.findIndex((segment) =>
      ["material-availability", "bill-of-materials", "work-order-tracking"].includes(segment)
    )
    return basePathIndex !== -1 ? pathSegments[basePathIndex] : null
  }, [pathname])

  // Map the path to our internal types
  const pathType = useMemo(() => {
    switch (currentPath) {
      case "material-availability":
        return "materialAvailability"
      case "bill-of-materials":
        return "billOfMaterials"
      case "work-order-tracking":
        return "workOrderTracking"
      default:
        return null
    }
  }, [currentPath])

  const {
    workOrderItems,
    setWorkOrderItems,
    handleWorkOrderItemsChange,
    handleWorkOrderItemsDelete,
    handleWorkOrderItemsAdd,
  } = useWorkOrderItems()

  const { data: workOrderDetails, isLoading: isWorkOrderLoading } =
    useWorkOrderById(pathType === "workOrderTracking" ? Number(id) : 0) as {
      data: WorkOrder
      isLoading: boolean
    }

  const {
    data: materialRequirementsPlanningDetails,
    isLoading: isMaterialRequirementsPlanningLoading,
  } = useMaterialRequirementsPlanningById(
    pathType === "materialAvailability" ? Number(id) : 0
  ) as {
    data: MaterialRequirementsPlanning
    isLoading: boolean
  }

  const { data: billOfMaterialsDetails, isLoading: isBillOfMaterialsLoading } =
    useBillOfMaterialsById(pathType === "billOfMaterials" ? Number(id) : 0) as {
      data: BillOfMaterials
      isLoading: boolean
    }

  useEffect(() => {
    if (workOrderDetails && !isWorkOrderLoading && pathType === "workOrderTracking") {
      setWorkOrderItems(
        workOrderDetails?.workOrderDetails?.map((item) => ({
          ...item,
          productId: item.productId,
          workOrderId: workOrderDetails.id,
          employeeName: item.employeeName || employeeNameTemplate || "",
        })) || []
      )
      setFormValues({
        ...workOrderDetails,
        assignedToName:
          assignedToNameTemplate || workOrderDetails.assignedToName || "",
      })
    }
  }, [workOrderDetails, isWorkOrderLoading])

  useEffect(() => {
    if (billOfMaterialsDetails && !isBillOfMaterialsLoading && pathType === "billOfMaterials") {
      setWorkOrderItems(
        billOfMaterialsDetails?.billOfMaterialItems?.map((item) => ({
          ...item,
          productId: item.productId,
          employeeName: employeeNameTemplate || "",
        })) || []
      )
      setFormValues({
        ...formValues,
        assignedToName:
          assignedToNameTemplate || "",
        workCenterId: billOfMaterialsDetails?.workCenterId,
        estCompletionStart: billOfMaterialsDetails?.scheduledFrom,
        estCompletionEnd: billOfMaterialsDetails?.scheduledTo,
      })
    }
  }, [billOfMaterialsDetails, isBillOfMaterialsLoading])

  const getFormValues = () => formValues

  const { mutate: createWorkOrder, isPending: isCreateWorkOrderLoading } =
    useCreateWorkOrder()

  const { mutate: updateWorkOrder, isPending: isUpdateWorkOrderLoading } =
    useUpdateWorkOrder()

  const onSubmit: SubmitHandler<WorkOrder> = (values) => {
    const formattedValues = {
      ...values,
      billOfMaterialId: billOfMaterialsDetails?.id,
      assignedToName: pathType === "workOrderTracking" ? assignedToNameTemplate || values.assignedToName || "" : values.assignedToName || assignedToNameTemplate,
      workOrderDetails: workOrderItems.map((item) => ({
        ...item,
        employeeName: pathType === "workOrderTracking" || pathType === "billOfMaterials" ? employeeNameTemplate || "" : item.employeeName,
      })),
    }

    if (mode === "create") {
      createWorkOrder(formattedValues)
    } else {
      updateWorkOrder({
        data: {
          ...formattedValues,
          billOfMaterialId: workOrderDetails.billOfMaterialId,
          id: id,
        },
      })
    }
  }
  return {
    getFormValues,
    onSubmit,
    workOrderItems,
    setWorkOrderItems,
    handleWorkOrderItemsChange,
    handleWorkOrderItemsDelete,
    handleWorkOrderItemsAdd,
    isFieldDisabled,
    isLoading:
      isWorkOrderLoading ||
      isMaterialRequirementsPlanningLoading ||
      isCreateWorkOrderLoading ||
      isUpdateWorkOrderLoading,
  }
}