"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Input } from "@/components/ui"
import { JournalEntryType } from "@/modules/fms/types"
import { useCreateJournalEntryType, useUpdateJournalEntryType, useJournalEntryTypeById } from "@/modules/fms/hooks"
import { JournalEntryTypeFormInput, journalEntryTypeFormSchema } from "@/modules/fms/validators/journal-type-schema"
import SimpleBar from "simplebar-react"

export default function JournalEntryTypeFormDrawerView({ id }: { id?: number }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById, isLoading } = useJournalEntryTypeById(id!)
  console.log(dataById)

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreateJournalEntryType()
  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdateJournalEntryType()

  const isEditMode = !!id

  const defaultValues: JournalEntryType = {
    id: id,
    journalTypeName: "",
  }

  const onSubmit: SubmitHandler<JournalEntryTypeFormInput> = async (data) => {
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
          isEditMode ? t("form-edit-journal-entry-type") : t("form-add-new-journal-entry-type")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<JournalEntryTypeFormInput>
        onSubmit={onSubmit}
        validationSchema={journalEntryTypeFormSchema}
        className="flex grow flex-col"
        useFormProps={{
          defaultValues: dataById || defaultValues,
          mode: "onChange",
          values: dataById as JournalEntryTypeFormInput,
        }}>
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <div className="flex min-h-[500px] flex-col gap-4 px-5 py-6">
                <Input
                  label={t("form-name")}
                  placeholder={t("form-enter-name")}
                  labelClassName="text-sm font-medium text-gray-900"
                  {...register("journalTypeName")}
                  error={
                    errors?.journalTypeName?.message
                      ? t(errors?.journalTypeName?.message)
                      : ""
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
