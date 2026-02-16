import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input, Textarea } from "@/components/ui"
import {
  useBankById,
  useCreateBank,
  useUpdateBank,
} from "@/modules/fms/hooks/use-bank"
import {
  BankFormInput,
  bankFormSchema,
} from "@/modules/fms/validators/bank-schema"

interface Props {
  id?: number
  record?: BankFormInput
}

export default function BankFormDrawerView({ id, record }: Props) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: bankById, isLoading: isLoadingById } = useBankById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } = useCreateBank()
  const { mutateAsync: updateMutation, isPending: isUpdating } = useUpdateBank()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit = async (data: BankFormInput) => {
    if (isEditMode && id) {
      await updateMutation({ id, data: { ...data, id } })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: BankFormInput = {
    bankName: record?.bankName || "",
    bankWebsite: record?.bankWebsite || "",
    swiftCode: record?.swiftCode || "",
    routingNumber: record?.swiftCode || "",
    contactNumber: record?.swiftCode || "",
    address: record?.swiftCode || "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={isEditMode ? t("form-update-bank") : t("form-new-bank")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<BankFormInput>
        validationSchema={bankFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: bankById || defaultValues,
          mode: "onChange",
          values: bankById as BankFormInput,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[500px] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-bank-name")}
                  placeholder={t("form-enter-bank-name")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("bankName")}
                  error={
                    errors?.bankName?.message
                      ? t(errors?.bankName?.message)
                      : ""
                  }
                />
                <Input
                  label={t("form-bank-website")}
                  placeholder={t("form-enter-bank-website")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("bankWebsite")}
                  error={
                    errors?.bankWebsite?.message
                      ? t(errors?.bankWebsite?.message)
                      : ""
                  }
                />
                <Input
                  label={t("form-swift-code")}
                  placeholder={t("form-enter-swift-code")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("swiftCode")}
                  error={
                    errors?.swiftCode?.message
                      ? t(errors?.swiftCode?.message)
                      : ""
                  }
                />
                <Input
                  label={t("form-routing-number")}
                  placeholder={t("form-enter-swift-code")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("routingNumber")}
                  error={
                    errors?.routingNumber?.message
                      ? t(errors?.routingNumber?.message)
                      : ""
                  }
                />
                <Input
                  label={t("form-contact-number")}
                  placeholder={t("form-enter-swift-code")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("contactNumber")}
                  error={
                    errors?.contactNumber?.message
                      ? t(errors?.contactNumber?.message)
                      : ""
                  }
                />
                <Textarea
                  label={t("form-address")}
                  placeholder={t("form-enter-address")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("address")}
                  error={
                    errors?.address?.message
                      ? t(errors?.address?.message)
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
