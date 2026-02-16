"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Checkbox, Input, Select } from "@/components/ui"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useCostCenterById,
  useCreateCostCenter,
  useUpdateCostCenter,
} from "@/modules/fms/hooks/use-cost-center"
import {
  CostCenterFormInput,
  costCenterFormSchema,
} from "@/modules/fms/validators/cost-center-schema"

interface Props {
  id?: number
  record?: CostCenterFormInput
}

export default function CostCenterFormDrawerView({ id, record }: Props) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { company } = useSharedDataHooks(["company"])
  const { companyOptions, companyList, isCompanyLoading } = company

  const { data: dataById, isLoading: isLoadingById } = useCostCenterById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateCostCenter()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateCostCenter()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit: SubmitHandler<CostCenterFormInput> = async (data) => {
    if (isEditMode && id) {
      await updateMutation({ id, ...data })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: CostCenterFormInput = {
    costCenterName: record?.costCenterName || "",
    companyId: record?.companyId || 0,
    isActive: record?.isActive || false,
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditMode
            ? t("form-edit-cost-center")
            : t("form-add-new-cost-center")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<CostCenterFormInput>
        validationSchema={costCenterFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: dataById || defaultValues,
          mode: "onChange",
          values: dataById as CostCenterFormInput,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[500px] flex-col gap-4 px-5 py-6">
                <Input
                  type="text"
                  isRequired
                  label={t("form-cost-center-name")}
                  placeholder={t("form-enter-cost-center-name")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("costCenterName")}
                  error={
                    errors?.costCenterName?.message
                      ? t(errors?.costCenterName?.message)
                      : ""
                  }
                />
                <Controller
                  name="companyId"
                  control={control}
                  defaultValue={
                    companyList?.data?.find(
                      (company: any) => company.isDefault
                    )?.id || 0
                  }
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-company-name")}
                      labelClassName="text-title"
                      isRequired
                      menuPortalTarget={document.body}
                      options={companyOptions}
                      value={
                        value && companyOptions
                          ? companyOptions.find(
                            (option: any) => option.value === value
                          )
                          : companyOptions?.find(
                            (option: any) =>
                              option.value ===
                              companyList?.data?.find(
                                (company: any) => company.isDefault
                              )?.id
                          ) || null
                      }
                      onChange={(option: any) => onChange(option.value)}
                      isLoading={isCompanyLoading}
                      isDisabled={isCompanyLoading}
                      placeholder={
                        isCompanyLoading
                          ? "Loading companies..."
                          : t("form-select-company")
                      }
                      error={
                        errors.companyId?.message &&
                        t(errors.companyId.message)
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
