import { Control, FieldErrors, UseFormRegister } from "react-hook-form"

import {
  AssetMaintenanceSchema,
  AssetMaintenanceTaskSchema,
} from "@/modules/fms/validators/asset-maintenance-schema"

export interface AssetMaintenanceFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
}

export interface AssetMaintenanceTableProps {
  assetMaintenanceDetails: AssetMaintenanceTaskSchema[]
  isFieldDisabled: boolean
  onRowChange: (index: number, field: string, value: any) => void
  onRowDelete: (index: number) => void
  onAddRow: () => void
}

export interface BasicInformationFormProps {
  register: UseFormRegister<AssetMaintenanceSchema>
  control: Control<AssetMaintenanceSchema>
  errors: FieldErrors<AssetMaintenanceSchema>
  isFieldDisabled: boolean
}
