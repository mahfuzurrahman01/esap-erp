"use client"

import { useRef } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import { PiWarningCircleFill } from "react-icons/pi"
import { ActionIcon, Tooltip } from "rizzui"

import ModalFormAction from "@/components/base/modal-form-action"
import ModalHeader from "@/components/base/modal-header"
import { useModal } from "@/components/base/modal-views/use-modal"
import PdfGreenIcon from "@/components/icons/hrms/pdf-green-icon"
import TrashIcon from "@/components/icons/trash"
import { useUploadFile } from "@/hooks/hrms/file-management/folders/use-folders"
import { FileCreateInput } from "@/types/hrms/file-management/folders.types"
import { uploadFileSchema } from "@/validators/hrms/upload-file-schema"

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
  folderId: number
}

const getFileError = (file: File, MAX_FILE_SIZE: number) => {
  if (file.size > MAX_FILE_SIZE) {
    return "form-file-size-too-large"
  }
  return null
}

// Add this helper function for file size formatting
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export default function FileUploadModal({ folderId }: FileUploadModalProps) {
  const t = useTranslations("form")
  const { closeModal } = useModal()
  const { mutateAsync: uploadFile, isPending } = useUploadFile()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCloseModal = () => {
    closeModal()
  }

  const onSubmit: SubmitHandler<FileCreateInput> = async (data) => {
    if (!data.files?.length) return
    const formData = new FormData()
    formData.append("folderId", folderId.toString())
    data.files.forEach((file: File) => {
      formData.append("files", file)
    })

    try {
      await uploadFile(formData)
      handleCloseModal()
    } catch (error) {
      console.error("Error uploading files:", error)
    }
  }

  const getFileIcon = (file: File) => {
    const isImage = file.type.startsWith("image/")
    if (isImage) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="h-10 w-10 rounded-lg object-cover"
        />
      )
    }
    return <PdfGreenIcon className="h-6 w-6" />
  }

  return (
    <div className="dropdown-gr card-shadow !z-50 mt-1 w-full min-w-[30vw] rounded-lg border border-gray-200 border-transparent bg-paper p-5 transition-all duration-200">
      <ModalHeader heading={t("form-upload-file")} onClose={handleCloseModal} />
      <Form<FileCreateInput>
        validationSchema={uploadFileSchema}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            files: [],
          },
        }}>
        {({ control, formState: { errors } }) => (
          <>
            <div className="space-y-6 py-5">
              <Controller
                name="files"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-col gap-4">
                    {/* Dropzone Area */}
                    <div
                      className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center hover:border-primary hover:bg-gray-50/50 dark:bg-transparent"
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={(e) => {
                        e.preventDefault()
                        const files = e.dataTransfer.files
                        if (files) {
                          const newFiles = [
                            ...(value || []),
                            ...Array.from(files),
                          ]
                          onChange(newFiles)
                        }
                      }}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files
                          if (files) {
                            const newFiles = [
                              ...(value || []),
                              ...Array.from(files),
                            ]
                            onChange(newFiles)
                          }
                        }}
                        className="hidden"
                        id="files"
                      />
                      <div className="mb-4 text-gray-400">
                        <PdfGreenIcon />
                      </div>
                      <p className="mt-4 text-sm text-gray-500">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {t("form-drop-or-select-file")}
                        </span>
                      </p>
                      <span className="mt-1 cursor-pointer text-sm font-medium text-primary hover:text-primary-dark">
                        {t("form-browse")}
                      </span>
                    </div>

                    {/* Selected Files List */}
                    {value?.length > 0 && (
                      <div className="mt-4">
                        <div className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {t("form-selected-files")} ({value.length})
                        </div>
                        <div className="space-y-2">
                          {value.map((file: File, index: number) => {
                            const fileError = getFileError(file, 1000000)
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-0 p-2.5 dark:border-gray-700 dark:bg-gray-900">
                                <div className="flex items-center gap-2.5">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                    {getFileIcon(file)}
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      {file.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatFileSize(file.size)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {fileError && (
                                    <Tooltip
                                      content={t(fileError)}
                                      placement="top"
                                      className="bg-red-500 text-white">
                                      <ActionIcon
                                        size="sm"
                                        variant="text"
                                        className="text-red-500">
                                        <PiWarningCircleFill className="h-4 w-4" />
                                      </ActionIcon>
                                    </Tooltip>
                                  )}
                                  <ActionIcon
                                    size="sm"
                                    variant="flat"
                                    color="danger"
                                    onClick={() => {
                                      const newFiles = value.filter(
                                        (_, i) => i !== index
                                      )
                                      onChange(newFiles)
                                    }}
                                    className="h-6 w-6">
                                    <TrashIcon className="h-4 w-4" />
                                  </ActionIcon>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {errors?.files && !Array.isArray(errors.files) && (
                      <p className="text-xs text-red-500">
                        {t(errors.files.message)}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <ModalFormAction
              isLoading={isPending}
              handleCloseDrawer={handleCloseModal}
            />
          </>
        )}
      </Form>
    </div>
  )
}
