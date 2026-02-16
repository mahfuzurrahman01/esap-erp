import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input } from "@/components/ui"
import {
  useBankAccountTypeById,
  useCreateBankAccountType,
  useUpdateBankAccountType,
} from "@/modules/fms/hooks/use-bank-account-type"
import {
  BankAccountTypeFormInput,
  bankAccountTypeFormSchema,
} from "@/modules/fms/validators/bank-account-type-schema"

interface Props {
  id?: number
  record?: BankAccountTypeFormInput
}

export default function BankAccountTypeFormDrawerView({ id, record }: Props) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: bankAccountTypeById, isLoading: isLoadingById } =
    useBankAccountTypeById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateBankAccountType()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateBankAccountType()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit = async (data: BankAccountTypeFormInput) => {
    if (isEditMode && id) {
      await updateMutation({ id, data: { ...data, id } })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: BankAccountTypeFormInput = {
    bankAccountTypeName: record?.bankAccountTypeName || "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={isEditMode ? t("form-update-account-type") : t("form-new-account-type")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<BankAccountTypeFormInput>
        validationSchema={bankAccountTypeFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: bankAccountTypeById || defaultValues,
          mode: "onChange",
          values: bankAccountTypeById as BankAccountTypeFormInput,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[500px] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-account-type")}
                  placeholder={t("form-enter-account-type")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("bankAccountTypeName")}
                  error={
                    errors?.bankAccountTypeName?.message
                      ? t(errors?.bankAccountTypeName?.message)
                      : ""
                  }
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
