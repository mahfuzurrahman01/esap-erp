"use client"

import { useEffect, useState } from "react"

import dayjs from "dayjs"
import { useAtom } from "jotai"
import { SubmitHandler } from "react-hook-form"

import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useAssetMaintenanceById,
  useCreateAssetMaintenance,
  useUpdateAssetMaintenance,
} from "@/modules/fms/hooks/use-asset-maintenance"
import { maintenanceRepetitionAtom } from "@/modules/fms/store/maintenance-repetition-atom"
import {
  AssetMaintenanceSchema,
  AssetMaintenanceTaskSchema,
} from "@/modules/fms/validators/asset-maintenance-schema"

import { AssetMaintenanceFormProps } from "./types"

export function useAssetMaintenanceForm({
  id,
  mode,
}: AssetMaintenanceFormProps) {
  const isFieldDisabled = mode === "view"
  const [assetMaintenanceDetails, setAssetMaintenanceDetails] = useState<
    AssetMaintenanceTaskSchema[]
  >([])
  const [repetitionConfigs] = useAtom(maintenanceRepetitionAtom)
  const { employee } = useSharedDataHooks(["employee"])
  const { employeeOptions } = employee

  const { data: assetMaintenanceById } = useAssetMaintenanceById(Number(id))
  const { mutate: createAssetMaintenance, isPending: isCreatePending } =
    useCreateAssetMaintenance()
  const { mutate: updateAssetMaintenance, isPending: isUpdatePending } =
    useUpdateAssetMaintenance()

  useEffect(() => {
    if (assetMaintenanceById?.assetMaintenanceDetails?.length) {
      setAssetMaintenanceDetails(
        assetMaintenanceById.assetMaintenanceDetails.map((task) => ({
          ...task,
          assetMaintenanceTaskName: task.assetMaintenanceTaskName || "",
          maintenanceStatus: task.maintenanceStatus || "",
          maintenanceRepetition: task.maintenanceRepetition || "",
          assignedToId: task.assignedToId || 0,
          assignedToName: task.assignedToName || "",
          nextMaintenanceDate: task.nextMaintenanceDate 
            ? dayjs(task.nextMaintenanceDate).format("YYYY-MM-DD")
            : "",
        }))
      )
    } else if (mode === "create") {
      setAssetMaintenanceDetails([
        {
          id: 0,
          assetMaintenanceId: 0,
          assetMaintenanceTaskName: "",
          maintenanceStatus: "",
          maintenanceRepetition: "",
          assignedToId: 0,
          assignedToName: "",
          nextMaintenanceDate: "",
        },
      ])
    }
  }, [assetMaintenanceById, mode])

  const handleRowChange = (index: number, field: string, value: any) => {
    setAssetMaintenanceDetails((prev) => {
      const updated = [...prev]
      const currentRow = { ...updated[index], [field]: value }

      // If changing repetition type, update the next maintenance date
      if (field === "maintenanceRepetition") {
        const currentDate = currentRow.nextMaintenanceDate
          ? dayjs(currentRow.nextMaintenanceDate).toDate()
          : null
        const nextDate = calculateNextMaintenanceDate(currentDate, value)
        currentRow.nextMaintenanceDate = dayjs(nextDate).format("YYYY-MM-DD")
      }

      // If changing assignedToId, update the assignedToName
      if (field === "assignedToId") {
        const selectedEmployee = employeeOptions.find(
          (employee: any) => employee.value === value
        )
        if (selectedEmployee) {
          currentRow.assignedToName = selectedEmployee.label
        }
      }

      updated[index] = currentRow
      return updated
    })
  }

  const calculateNextMaintenanceDate = (
    currentDate: Date | null,
    repetitionType: string
  ) => {
    const startDate = currentDate ? dayjs(currentDate) : dayjs()
    const type = repetitionType.toLowerCase()

    switch (type) {
      case "daily":
        return startDate.add(1, "day")
      case "weekly":
        return startDate.add(1, "week")
      case "monthly":
        return startDate.add(1, "month")
      case "half-yearly":
        return startDate.add(6, "month")
      case "yearly":
        return startDate.add(1, "year")
      default:
        return startDate
    }
  }

  const handleRowDelete = (index: number) => {
    setAssetMaintenanceDetails((prev) => prev.filter((_, i) => i !== index))
  }

  const addNewRow = () => {
    setAssetMaintenanceDetails((prev) => [
      ...prev,
      {
        id: 0,
        assetMaintenanceId: 0,
        assetMaintenanceTaskName: "",
        maintenanceStatus: "",
        maintenanceRepetition: "",
        assignedToId: 0,
        assignedToName: "",
        nextMaintenanceDate: "",
      },
    ])
  }

  const onSubmit: SubmitHandler<AssetMaintenanceSchema> = (data) => {
    const formData = {
      ...data,
      comments: data.comments || "",
      assetMaintenanceDetails: assetMaintenanceDetails.map((detail) => ({
        ...detail,
        id: detail.id || 0,
        assetMaintenanceId: data.id || 0,
        maintenanceStatus: detail.maintenanceStatus || "",
        maintenanceRepetition: detail.maintenanceRepetition || "",
        assignedToName: detail.assignedToName || "",
        nextMaintenanceDate: detail.nextMaintenanceDate || "",
      })),
    }

    if (id) {
      updateAssetMaintenance(formData)
    } else {
      createAssetMaintenance(formData)
    }
  }

  const defaultValues: Partial<AssetMaintenanceSchema> = {
    assetId: 0,
    companyId: 0,
    assetMaintenanceDetails: [],
    comments: "",
  }

  return {
    defaultValues,
    assetMaintenanceById,
    isFieldDisabled,
    assetMaintenanceDetails,
    handleRowChange,
    handleRowDelete,
    addNewRow,
    onSubmit,
    isLoading: isCreatePending || isUpdatePending,
  }
}
