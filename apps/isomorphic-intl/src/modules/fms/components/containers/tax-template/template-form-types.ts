import { Control, UseFormRegister } from "react-hook-form"
import { SelectOption } from "rizzui"

import { TaxTemplateDetail as GlobalTaxTemplateDetail } from "@/modules/fms/types/tax-template"

export type TaxTypeOption = {
  label: string
  value: number
}

export interface TaxTemplateFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
}

export interface TaxTemplateDetail extends Omit<GlobalTaxTemplateDetail, "id"> {
  id?: number
}

export interface TaxTemplateFormInput {
  id?: number
  taxTemplateName: string
  templateType?: string | null | undefined
  taxCategoryId: number
  companyId: number
  isActive?: boolean
  taxTemplateDetails: TaxTemplateDetail[]
}

export interface TaxTemplateInformationProps {
  register: UseFormRegister<TaxTemplateFormInput>
  control: Control<TaxTemplateFormInput>
  errors: any
  isFieldDisabled: boolean
  taxTemplateTypeOptions: SelectOption[]
  taxCategoryOptions: SelectOption[]
  companyOptions: SelectOption[]
  isTaxTemplateTypesLoading: boolean
  isTaxCategoryLoading: boolean
  isCompanyLoading: boolean
}
