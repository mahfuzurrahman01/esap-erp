"use client"

import { useEffect } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import ModalFormAction from "@/components/base/modal-form-action"
import ModalHeader from "@/components/base/modal-header"
import { useModal } from "@/components/base/modal-views/use-modal"
import { Input, Textarea } from "@/components/ui"
import {
  useCreateFolder,
  useUpdateFolder,
} from "@/hooks/hrms/file-management/folders/use-folders"
import { Folder } from "@/types/hrms/file-management/folders.types"
import { folderSchema } from "@/validators/hrms/folder.schema"

const defaultValues: Folder = {
  folderName: "",
  description: "",
  permission: "admin",
}

type FolderFormModalProps = {
  isOpen: boolean
  isEditForm?: boolean
  initialData?: any
  onClose: () => void
} & (
  | { isEditForm: true; initialData: Folder }
  | { isEditForm?: false; initialData?: Folder }
)

export default function FolderFormModalView({
  isEditForm = false,
  initialData,
}: FolderFormModalProps) {
  const t = useTranslations("form")
  const { closeModal } = useModal()

  const {
    mutateAsync: createFolder,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateFolder()

  const {
    mutateAsync: updateFolder,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateFolder()

  const handleCloseModal = () => {
    closeModal()
  }

  const onSubmit: SubmitHandler<Folder> = async (data) => {
    if (isEditForm && initialData?.id) {
      updateFolder({ ...data, id: Number(initialData?.id) })
    } else {
      createFolder(data)
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      closeModal()
    }
  }, [createSuccess, updateSuccess])

  return (
    <div className="dropdown-gr card-shadow relative !z-50 mt-1 w-full min-w-[480px] overflow-hidden rounded-md bg-paper p-5 transition-all duration-200">
      <ModalHeader
        heading={isEditForm ? t("form-edit-folder") : t("form-create-folder")}
        onClose={handleCloseModal}
      />
      <Form<Folder>
        validationSchema={folderSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialData || defaultValues,
        }}>
        {({ register, formState: { errors } }) => {
          return (
            <>
              <div className="space-y-6 py-5">
                <Input
                  label={t("form-folder-name")}
                  placeholder={t("form-enter-folder-name")}
                  {...register("folderName")}
                  error={
                    errors.folderName?.message && t(errors.folderName?.message)
                  }
                />

                <Textarea
                  label={t("form-description")}
                  placeholder={t("form-enter-description")}
                  {...register("description")}
                  error={
                    errors.description?.message &&
                    t(errors.description?.message)
                  }
                />
              </div>

              <ModalFormAction
                isLoading={isCreatePending || isUpdatePending}
                isEditForm={isEditForm}
                handleCloseDrawer={handleCloseModal}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
