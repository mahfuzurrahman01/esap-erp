import { Control, FieldErrors, UseFormRegister } from "react-hook-form"

import {
  AssetDepreciationList,
  DepreciationSchedule,
} from "@/modules/fms/types/asset-depreciation-schedule"

export interface AssetDepreciationFormProps {
  id?: number
}

export interface AssetDepreciationTableProps {
  assetDepreciationDetails: DepreciationSchedule[]
  isFieldDisabled: boolean
}

export interface BasicInformationFormProps {
  register: UseFormRegister<AssetDepreciationList>
  control: Control<AssetDepreciationList>
  errors: FieldErrors<AssetDepreciationList>
  isFieldDisabled: boolean
}
