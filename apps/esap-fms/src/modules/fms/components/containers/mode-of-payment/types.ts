import { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { SelectOption } from "rizzui"

import { ModeOfPaymentDetails } from "@/modules/fms/types"
import { ModeOfPaymentFormInput } from "@/modules/fms/validators/mode-of-payment-schema"

export interface ModeOfPaymentFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
}

export interface ModeOfPaymentTableProps {
  modeOfPaymentDetails: ModeOfPaymentDetails[]
  isFieldDisabled: boolean
  onRowChange: (index: number, field: string, value: any) => void
  onRowDelete: (index: number) => void
  onAddRow: () => void
  companyOptions: SelectOption[]
  chartOfAccountOptions: SelectOption[]
  isCOALoading: boolean
}

export interface BasicInformationFormProps {
  register: UseFormRegister<ModeOfPaymentFormInput>
  control: Control<ModeOfPaymentFormInput>
  errors: FieldErrors<ModeOfPaymentFormInput>
  isFieldDisabled: boolean
  modeOfPaymentTypeOptions: SelectOption[]
}
