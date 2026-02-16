"use client"
import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import {
  useCreateCurrency,
  useCurrencyById,
  useUpdateCurrency,
} from "@/modules/fms/hooks/use-currency"
import { CurrencyList } from "@/modules/fms/types"
import {
  CurrencyFormInput,
  currencyFormSchema,
} from "@/modules/fms/validators/currency-schema"

type NumberFormatOption = {
  label: string
  value: string
}

const numberFormatOptions: NumberFormatOption[] = [
  { label: "#,###.##", value: "1" },
  { label: "#,###.###", value: "2" },
  { label: "#,##,###.##", value: "3" },
  { label: "#,##,###.###", value: "4" },
]

export default function CurrencyFormDrawerView({ id }: { id?: number }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById, isLoading } = useCurrencyById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateCurrency()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateCurrency()

  const isEditMode = !!id

  const defaultValues: CurrencyList = {
    id: id,
    currencyName: "",
    symbol: "",
    fraction: "",
    units: "",
    smallValue: "",
    numberFormat: "1",
  }

  const onSubmit: SubmitHandler<CurrencyFormInput> = async (data) => {
    if (isEditMode && id) {
      await updateMutation({
        ...data,
        id,
      })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditMode ? t("form-edit-currency") : t("form-add-new-currency")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<CurrencyFormInput>
        onSubmit={onSubmit}
        validationSchema={currencyFormSchema}
        className="flex grow flex-col"
        useFormProps={{
          defaultValues: dataById || defaultValues,
          mode: "onChange",
          values: dataById as CurrencyFormInput,
        }}>
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-name")}
                  placeholder={t("form-enter-name")}
                  labelClassName="text-sm font-medium text-gray-900"
                  isRequired
                  {...register("currencyName")}
                  error={
                    errors?.currencyName?.message &&
                    t(errors.currencyName.message)
                  }
                />
                <Input
                  label={t("form-symbol")}
                  placeholder={t("form-enter-symbol")}
                  labelClassName="text-sm font-medium text-gray-900"
                  helperText={t("form-symbol-description")}
                  {...register("symbol")}
                />
                <Input
                  label={t("form-fraction")}
                  placeholder={t("form-enter-fraction")}
                  labelClassName="text-sm font-medium text-gray-900"
                  helperText={t("form-fraction-description")}
                  {...register("fraction")}
                />
                <Input
                  label={t("form-units")}
                  placeholder={t("form-enter-units")}
                  labelClassName="text-sm font-medium text-gray-900"
                  helperText={t("form-units-description")}
                  {...register("units")}
                />
                <Input
                  label={t("form-small-value")}
                  placeholder={t("form-enter-small-value")}
                  labelClassName="text-sm font-medium text-gray-900"
                  helperText={t("form-small-value-description")}
                  {...register("smallValue")}
                />
                <Controller
                  name="numberFormat"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-number-format")}
                      labelClassName="text-title"
                      options={numberFormatOptions}
                      value={
                        numberFormatOptions.find(
                          (option) => option.value === value
                        ) || null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      placeholder={
                        isLoading ? t("form-loading") : t("form-select")
                      }
                      error={
                        errors.numberFormat?.message &&
                        t(errors.numberFormat.message)
                      }
                    />
                  )}
                />
              </div>
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={closeDrawer}
              isLoading={isCreating || isUpdating || isLoading}
              isEditForm={isEditMode}
            />
          </>
        )}
      </Form>
    </div>
  )
}
