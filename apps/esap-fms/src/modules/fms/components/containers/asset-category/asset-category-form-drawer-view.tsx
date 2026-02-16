"use client"
import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useAssetCategoryById,
  useCreateAssetCategory,
  useUpdateAssetCategory,
} from "@/modules/fms/hooks/use-asset-category"
import {
  AssetCategoryFormInput,
  assetCategoryFormSchema,
} from "@/modules/fms/validators/asset-category-schema"

interface Props {
  id?: number
  record?: AssetCategoryFormInput
}

export default function AssetCategoryFormDrawerView({ id, record }: Props) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { coa } = useSharedDataHooks(["coa"])
  const { coaOptions, isCOALoading } = coa

  const { data: assetCategoryById, isLoading: isLoadingById } =
    useAssetCategoryById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateAssetCategory()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateAssetCategory()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit = async (data: AssetCategoryFormInput) => {
    if (isEditMode && id) {
      await updateMutation({ ...data, id: Number(id) })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: AssetCategoryFormInput = {
    assetCategoryName: record?.assetCategoryName || "",
    fixedAssetAccountId: record?.fixedAssetAccountId || 0,
  }

  const formValues = isEditMode && assetCategoryById
    ? { ...defaultValues, ...assetCategoryById }
    : defaultValues

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditMode
            ? t("form-update-asset-category")
            : t("form-new-asset-category")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<AssetCategoryFormInput>
        validationSchema={assetCategoryFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: formValues,
          mode: "onChange",
          values: isEditMode ? formValues : undefined,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[768px] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-asset-category-name")}
                  placeholder={t("form-enter-asset-category-name")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("assetCategoryName")}
                  error={
                    errors?.assetCategoryName?.message
                      ? t(errors?.assetCategoryName?.message)
                      : ""
                  }
                />
                <Controller
                  name="fixedAssetAccountId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-fixed-asset-account")}
                      labelClassName="text-title"
                      options={coaOptions}
                      value={
                        value && coaOptions
                          ? coaOptions.find(
                            (option: any) => option.value === (value as number)
                          ) || null
                          : null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      isLoading={isCOALoading}
                      isDisabled={isCOALoading}
                      placeholder={
                        isCOALoading ? t("form-loading") : t("form-select")
                      }
                      error={
                        errors.fixedAssetAccountId?.message &&
                        t(errors.fixedAssetAccountId.message)
                      }
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
