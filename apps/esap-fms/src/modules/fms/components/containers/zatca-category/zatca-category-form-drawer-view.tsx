import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input } from "@/components/ui"
import {
  useCreateZatcaCategory,
  useZatcaCategoryById,
  useUpdateZatcaCategory,
} from "@/modules/fms/hooks/use-zatca-category"
import { zatcaCategoryFormInput, zatcaCategoryFormSchema } from "@/modules/fms/validators/zatca-category-schema"

interface Props {
  id?: number
  record?: zatcaCategoryFormInput
}

export default function ZatcaCategoryFormDrawerView({ id, record }: Props) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById, isLoading: isLoadingById } = useZatcaCategoryById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateZatcaCategory()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateZatcaCategory()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit = async (data: zatcaCategoryFormInput) => {
    if (isEditMode && id) {
      await updateMutation({ id, data: { ...data, id } })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: zatcaCategoryFormInput = {
    zatcaCategoryName: record?.zatcaCategoryName || "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditMode
            ? t("form-edit-zatca-category")
            : t("form-add-new-zatca-category")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<zatcaCategoryFormInput>
        validationSchema={zatcaCategoryFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: dataById || defaultValues,
          mode: "onChange",
          values: dataById as zatcaCategoryFormInput,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[500px] flex-col gap-4 px-5 py-6">
                <Input
                  type="text"
                  label={t("form-title")}
                  placeholder={t("form-enter-title")}
                  labelClassName="text-sm font-medium text-gray-900"
                  isRequired
                  {...register("zatcaCategoryName")}
                  error={
                    errors?.zatcaCategoryName?.message
                      ? t(errors?.zatcaCategoryName?.message)
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
