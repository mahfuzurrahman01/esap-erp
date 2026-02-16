import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input } from "@/components/ui"
import {
  useBudgetAgainstById,
  useCreateBudgetAgainst,
  useUpdateBudgetAgainst,
} from "@/modules/fms/hooks/use-budget-against"
import {
  BudgetAgainstFormInput,
  budgetAgainstFormSchema,
} from "@/modules/fms/validators/budget-against-schema"

export default function BudgetAgainstFormDrawerView({ id }: { id?: number }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById, isLoading: isLoadingById } = useBudgetAgainstById(id!)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateBudgetAgainst()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateBudgetAgainst()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const isEditMode = !!id

  const onSubmit = async (data: BudgetAgainstFormInput) => {
    if (isEditMode && id) {
      await updateMutation({ ...data, id })
      closeDrawer()
    } else {
      await createMutation(data)
      closeDrawer()
    }
  }

  const defaultValues: BudgetAgainstFormInput = {
    budgetAgainstName: dataById?.budgetAgainstName || "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditMode
            ? t("form-edit-budget-against")
            : t("form-add-new-budget-against")
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<BudgetAgainstFormInput>
        validationSchema={budgetAgainstFormSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: dataById || defaultValues,
          mode: "onChange",
          values: dataById as BudgetAgainstFormInput,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[500px] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-budget-against-name")}
                  placeholder={t("form-enter-budget-against-name")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("budgetAgainstName")}
                  error={
                    errors?.budgetAgainstName?.message
                      ? t(errors?.budgetAgainstName?.message)
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
