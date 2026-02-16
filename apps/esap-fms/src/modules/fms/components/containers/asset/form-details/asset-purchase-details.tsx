import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Controller, UseFormRegister, UseFormWatch } from "react-hook-form"
import { Control, FormState } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import { Input, Select } from "@/components/ui"
import { AssetFormInput } from "@/modules/fms/validators/asset-schema"
import { useInvoiceList } from "@/modules/scm/hooks"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"
import { useSelectOptions } from "@/hooks/use-select-options"

interface AssetPurchaseDetailsProps {
  formMethods: {
    register: UseFormRegister<AssetFormInput>
    control: Control<AssetFormInput>
    formState: FormState<AssetFormInput>
    watch: UseFormWatch<AssetFormInput>
  }
  isFieldDisabled?: boolean
  mode?: "create" | "edit" | "view"
}

export default function AssetPurchaseDetails({
  formMethods,
  isFieldDisabled,
  mode,
}: AssetPurchaseDetailsProps) {
  const t = useTranslations("form")
  const { data: purchaseInvoiceList, isLoading: isPurchaseInvoiceLoading } = useInvoiceList()

  const purchaseInvoiceOptions = useSelectOptions<Invoice>(
    purchaseInvoiceList?.data,
    "invoiceBillNo"
  )

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = formMethods

  const isExistingAsset = watch("isExistingAsset")
  const isCompositeAsset = watch("isCompositeAsset")

  return (
    <>
      <FormGroup
        title={t("form-purchase-details")}
        className="pt-7 @2xl:pt-9 @3xl:pt-11">
        {isExistingAsset || isCompositeAsset ? (
          <Controller
            name="purchaseDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                inputProps={{ label: t("form-purchase-date") }}
                placeholderText={t("form-select-date")}
                value={value ? new Date(value) : null}
                onChange={(date: any) => {
                  const formattedDate = date
                    ? dayjs(date).format("YYYY-MM-DD")
                    : undefined
                  onChange(formattedDate)
                }}
                maxDate={new Date()}
                popperPlacement="bottom-end"
                disabled={mode !== "create" && true}
              />
            )}
          />
        ) : (
          <>
            <Controller
              name="purchaseInvoiceId"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  label={t("form-purchase-invoice")}
                  labelClassName="text-title"
                  placeholder={
                    isPurchaseInvoiceLoading
                      ? "Loading purchase invoices..."
                      : t("form-select-purchase-invoice")
                  }
                  options={purchaseInvoiceOptions}
                  value={
                    purchaseInvoiceOptions.find(
                      (option: any) => option.value === value
                    ) || 0
                  }
                  isRequired
                  onChange={(option: any) => onChange(option?.value)}
                  isLoading={isPurchaseInvoiceLoading}
                  isDisabled={mode !== "create" && true}
                />
              )}
            />
          </>
        )}
        <Controller
          name="availableForUseDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              inputProps={{ label: t("form-available-for-use-date") }}
              placeholderText={t("form-select-date")}
              value={value ? new Date(value) : null}
              onChange={(date: any) => {
                const formattedDate = date
                  ? dayjs(date).format("YYYY-MM-DD")
                  : undefined
                onChange(formattedDate)
              }}
              maxDate={new Date()}
              popperPlacement="bottom-end"
              disabled={mode !== "create" && true}
            />
          )}
        />
        <Input
          type="number"
          isRequired
          {...register("grossPurchaseAmount")}
          label={t("form-gross-purchase-amount")}
          placeholder={t("form-enter-gross-purchase-amount")}
          error={errors.grossPurchaseAmount?.message}
          disabled={mode !== "create" && true}
        />
        <Input
          type="number"
          isRequired
          {...register("assetQuantity")}
          label={t("form-asset-quantity")}
          placeholder={t("form-enter-asset-quantity")}
          min={1}
          error={errors.assetQuantity?.message}
          disabled={mode !== "create" && true}
        />
      </FormGroup>
    </>
  )
}
