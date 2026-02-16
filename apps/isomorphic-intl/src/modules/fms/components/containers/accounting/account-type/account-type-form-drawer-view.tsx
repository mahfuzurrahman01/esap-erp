import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Select } from "@/components/ui"
import {
  useAccountingTypeById,
  useCreateAccountingType,
  useUpdateAccountType,
} from "@/modules/fms/hooks/use-accounting-type"
import { AccountTypeFormInput, accountTypeFormSchema } from "@/modules/fms/validators/account-type-schema"
import { Controller } from "react-hook-form"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"

interface Props {
  id?: number
  record?: AccountTypeFormInput
}

export default function AccountTypeFormDrawerView({ id, record }: Props) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")

  const { data: accountTypeById, isLoading: isLoadingById } =
    useAccountingTypeById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateAccountingType()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateAccountType()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit = async (data: AccountTypeFormInput) => {
    if (isEditMode && id) {
      await updateMutation({ id, data: { ...data, id } })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: AccountTypeFormInput = {
    accountingTypeName: record?.accountingTypeName || "",
  }

  const { accountType } = useSharedDataHooks(["accountTypes"])

  const { accountTypeOptions, isAccountTypeLoading: isLoading } = accountType

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={isEditMode ? t("form-update-account-type") : t("form-new-account-type")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<AccountTypeFormInput>
        validationSchema={accountTypeFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: accountTypeById || defaultValues,
          mode: "onChange",
          values: accountTypeById as AccountTypeFormInput,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[500px] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-account-type")}
                  isRequired
                  placeholder={t("form-enter-account-type")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("accountingTypeName")}
                  error={
                    errors?.accountingTypeName?.message
                      ? t(errors?.accountingTypeName?.message)
                      : ""
                  }
                />
                <Controller
                  name="parentId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label={t("form-parent-account")}
                      labelClassName="text-title"
                      options={accountTypeOptions}
                      value={
                        value && accountTypeOptions
                          ? accountTypeOptions.find((option: any) => option.value === value) ||
                          null
                          : null
                      }
                      onChange={(option: any) => onChange(option?.value)}
                      placeholder={t("form-select-account")}
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
