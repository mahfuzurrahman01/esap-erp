"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import { Grid } from "rizzui"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Checkbox, Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useCreateCurrencyExchange,
  useCurrencyExchangeById,
  useUpdateCurrencyExchange,
} from "@/modules/fms/hooks/use-currency-exchange"
import { CurrencyExchangeList } from "@/modules/fms/types"
import {
  CurrencyExchangeFormInput,
  currencyExchangeFormSchema,
} from "@/modules/fms/validators/currency-exchange-schema"
import { formatDate } from "@/utils/format-date"

export default function CurrencyExchangeFormDrawerView({
  id,
}: {
  id?: number
}) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById, isLoading } = useCurrencyExchangeById(id!)
  const { currency } = useSharedDataHooks(["currency"])
  const { currencyOptions, isCurrencyLoading } = currency

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateCurrencyExchange()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateCurrencyExchange()

  const isEditMode = !!id

  const defaultValues: CurrencyExchangeList = {
    id: id,
    dateOfEstablishment: "",
    currencyFromId: 0,
    currencyToId: 0,
    exchangeRate: "",
    isPurchase: true,
    isSelling: true,
  }

  const onSubmit: SubmitHandler<CurrencyExchangeFormInput> = async (data) => {
    const formData = {
      ...data,
      exchangeRate: data.exchangeRate || 0,
    }

    if (isEditMode && id) {
      await updateMutation({
        id,
        data: formData,
      })
      closeDrawer()
    } else {
      await createMutation(formData)
      closeDrawer()
    }
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditMode
            ? t("form-update-currency-exchange")
            : t("form-create-currency-exchange")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<CurrencyExchangeFormInput>
        onSubmit={onSubmit}
        validationSchema={currencyExchangeFormSchema}
        className="flex grow flex-col"
        useFormProps={{
          defaultValues: dataById || defaultValues,
          mode: "onChange",
          values: dataById as CurrencyExchangeList,
        }}>
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex flex-col gap-4 px-5 py-6">
                <Grid columns="2">
                  <Controller
                    name="isPurchase"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        label={t("form-is-purchase")}
                        size="sm"
                        checked={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Controller
                    name="isSelling"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        label={t("form-is-selling")}
                        size="sm"
                        checked={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Controller
                  name="dateOfEstablishment"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{
                        label: t("form-date-of-establishment"),
                      }}
                      placeholderText={t("form-select-date")}
                      value={value ? new Date(value) : null}
                      onChange={(date: any) => {
                        const formattedDate = date
                          ? formatDate(date, "YYYY-MM-DD")
                          : undefined
                        onChange(formattedDate)
                      }}
                      popperPlacement="bottom-end"
                      portal
                      portalTarget={document.body}
                      maxDate={new Date()}
                      required
                    />
                  )}
                />
                <Controller
                  name="currencyFromId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-currency-from")}
                      labelClassName="text-title"
                      options={currencyOptions}
                      value={
                        value && currencyOptions
                          ? currencyOptions.find(
                            (option: any) => option.value === value
                          )
                          : null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isRequired
                      isLoading={isCurrencyLoading}
                      isDisabled={isCurrencyLoading}
                      menuPortalTarget={document.body}
                      placeholder={
                        isCurrencyLoading ? t("form-loading") : t("form-select")
                      }
                      error={
                        errors.currencyFromId?.message &&
                        t(errors.currencyFromId.message)
                      }
                    />
                  )}
                />
                <Controller
                  name="currencyToId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-currency-to")}
                      labelClassName="text-title"
                      options={currencyOptions}
                      value={
                        value && currencyOptions
                          ? currencyOptions.find(
                            (option: any) => option.value === value
                          )
                          : null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      menuPortalTarget={document.body}
                      isRequired
                      isLoading={isCurrencyLoading}
                      isDisabled={isCurrencyLoading}
                      placeholder={
                        isCurrencyLoading ? t("form-loading") : t("form-select")
                      }
                      error={
                        errors.currencyToId?.message &&
                        t(errors.currencyToId.message)
                      }
                    />
                  )}
                />
                <Input
                  {...register("exchangeRate")}
                  label={t("form-exchange-rate")}
                  placeholder={t("form-enter-exchange-rate")}
                  labelClassName="text-sm font-medium text-gray-900"
                  error={
                    errors.exchangeRate?.message &&
                    t(errors.exchangeRate.message)
                  }
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
