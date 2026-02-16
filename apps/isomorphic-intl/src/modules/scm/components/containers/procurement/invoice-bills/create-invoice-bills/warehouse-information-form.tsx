"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"
import { Checkbox } from "rizzui/checkbox"

import { Select } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  InvoiceInput,
  InvoiceUpdate,
} from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import { useGlobalStoreState } from "@/modules/scm/store/global-store-state"

interface WarehouseInformationFormProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<InvoiceInput | InvoiceUpdate>
    control?: Control<InvoiceInput | InvoiceUpdate>
    formState: FormState<InvoiceInput>
    watch?: UseFormWatch<InvoiceInput | InvoiceUpdate>
    setValue?: UseFormSetValue<InvoiceInput | InvoiceUpdate>
  }
  handleDiscountChange?: (value: number) => void
}

export default function WarehouseInformationForm({
  isFieldDisabled,
  formMethods,
}: WarehouseInformationFormProps) {
  const t = useTranslations("form")
  const { setInventoryStockReceived } = useGlobalStoreState()

  const { warehouse } = useSCMSharedDataHook(["warehouse"])

  const { warehouseOptions, isWarehouseLoading } = warehouse

  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = formMethods

  return (
    <>
      <Checkbox
        label={t("form-is-stock-updated")}
        {...register?.("isStockUpdated")}
        inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
        iconClassName="w-[18px] h-[18px]"
        onChange={(e) => {
          setValue?.("isStockUpdated", e.target.checked)
          setInventoryStockReceived(e.target.checked)
        }}
        disabled={isFieldDisabled}
      />
      {errors.isStockUpdated && (
        <p className="text-sm text-red-500">
          {errors.isStockUpdated?.message
            ? t(errors.isStockUpdated?.message)
            : ""}
        </p>
      )}
      <Controller
        control={control}
        name="warehouseId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-set-target-warehouse")}
            labelClassName="text-title"
            placeholder={t("form-select-warehouse")}
            options={warehouseOptions}
            onChange={(option: any) => onChange(option?.value)}
            value={FindSelectOption(warehouseOptions, value)}
            isLoading={isWarehouseLoading}
            isDisabled={isFieldDisabled}
            error={errors?.warehouseId?.message
              ? t(errors.warehouseId?.message)
              : ""}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(warehouseOptions.length)}
            isRequired
          />
        )}
      />
    </>
  )
}
