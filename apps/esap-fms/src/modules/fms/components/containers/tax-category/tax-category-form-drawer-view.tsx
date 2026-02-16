import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Checkbox, Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useCreateTaxCategory,
  useTaxCategoryById,
  useUpdateTaxCategory,
} from "@/modules/fms/hooks/use-tax-category"
import {
  TaxCategoryFormInput,
  taxCategoryFormSchema,
} from "@/modules/fms/validators/tax-category-schema"

interface Props {
  id?: number
  record?: TaxCategoryFormInput
}

export default function TaxCategoryFormDrawerView({ id, record }: Props) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { zatcaCategory } = useSharedDataHooks(["zatcaCategory"])
  const { zatcaCategoryOptions, isZatcaCategoryLoading } = zatcaCategory

  const { data: dataById, isLoading: isLoadingById } = useTaxCategoryById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateTaxCategory()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateTaxCategory()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit = async (data: TaxCategoryFormInput) => {
    console.log("data", data)
    if (isEditMode && id) {
      await updateMutation({ id, data: { ...data, id } })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: TaxCategoryFormInput = {
    taxCategoryName: dataById?.taxCategoryName || "",
    zatcaCategoryId: dataById?.zatcaCategory?.id || 0,
    isActive: dataById?.isActive,
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditMode
            ? t("form-edit-tax-category")
            : t("form-add-new-tax-category")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<TaxCategoryFormInput>
        validationSchema={taxCategoryFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: defaultValues,
          mode: "onChange",
          values: defaultValues,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[500px] flex-col gap-4 px-5 py-6">
                <Input
                  type="text"
                  label={t("form-tax-category-name")}
                  placeholder={t("form-enter-tax-category-name")}
                  labelClassName="text-sm font-medium text-gray-900"
                  isRequired
                  {...register("taxCategoryName")}
                  error={
                    errors?.taxCategoryName?.message
                      ? t(errors?.taxCategoryName?.message)
                      : ""
                  }
                />
                <Controller
                  name="zatcaCategoryId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-zatca-category")}
                      labelClassName="text-title"
                      options={zatcaCategoryOptions}
                      value={
                        value && zatcaCategoryOptions
                          ? zatcaCategoryOptions.find(
                              (option: any) => option.value === value
                            )
                          : null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isLoading={isZatcaCategoryLoading}
                      isDisabled={isZatcaCategoryLoading}
                      isRequired
                      placeholder={
                        isZatcaCategoryLoading
                          ? t("form-loading")
                          : t("form-select")
                      }
                      error={
                        errors.zatcaCategoryId?.message &&
                        t(errors.zatcaCategoryId.message)
                      }
                    />
                  )}
                />
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      label={t("form-is-active")}
                      checked={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isLoading={isCreating || isUpdating || isLoadingById}
              isEditForm={isEditMode}
            />
          </>
        )}
      </Form>
    </div>
  )
}
