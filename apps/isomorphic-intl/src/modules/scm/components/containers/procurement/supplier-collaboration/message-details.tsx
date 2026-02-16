"use client"

import { useState } from "react"

import { useElementSize } from "@core/hooks/use-element-size"
import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import cn from "@core/utils/class-names"
import { useAtom, useAtomValue } from "jotai"
import { useTranslations } from "next-intl"
import { SubmitHandler, UseFormReturn } from "react-hook-form"
import { Empty, Loader, Title, Tooltip } from "rizzui"

import ArrowLeftIcon from "@/components/icons/arrow-left"
import ArrowRightIcon from "@/components/icons/arrow-right"
import MarkAsReadIcon from "@/components/icons/scm/mark-as-read"
import StarredIcon from "@/components/icons/scm/starred-icon"
import SendIcon from "@/components/icons/send-icon"
import TrashIcon from "@/components/icons/trash"
import { Button, Textarea } from "@/components/ui"
import {
  useDeleteSupplierCollaboration,
  useMarkAsImportant,
  useMarkAsStarred,
  useSendSupplierEmailReplay,
  useSupplierCollaborationById,
} from "@/modules/scm/hooks/procurement/supplier/use-supplier-collaboration"
import { Replay } from "@/modules/scm/types/procurement/supplier/supplier-collaboration-types"
import { ReplaySchema } from "@/modules/scm/validators/procurement/create-email-schema"

import SimpleFileUpload from "../../../base/simple-file-upload"
import MessageBody from "./message-body"
import { messageIdAtom } from "./message-list"
import { deleteItemById } from "./utils"

export default function MessageDetails({ className }: { className?: string }) {
  const t = useTranslations("common")
  const tForm = useTranslations("form")
  const messageId = useAtomValue(messageIdAtom)
  const [, deleteItem] = useAtom(deleteItemById)
  const [ref] = useElementSize()
  const [replyingToMessageId, setReplyingToMessageId] = useState<string | null>(
    null
  )

  const { mutate: deleteSupplierCollaboration } =
    useDeleteSupplierCollaboration()

  const {
    mutate: sendSupplierEmailReplay,
    isPending: isSendingSupplierEmailReplay,
  } = useSendSupplierEmailReplay()
  const { mutate: markAsStarred, isPending: isMarkingAsStarred } =
    useMarkAsStarred()
  const { mutate: markAsImportant, isPending: isMarkingAsImportant } =
    useMarkAsImportant()

  const toggleReplyForm = (messageId: string) => {
    setReplyingToMessageId((prevId) =>
      prevId === messageId ? null : messageId
    )
  }

  const handleDelete = async () => {
    if (message) {
      await deleteSupplierCollaboration(Number(message.id))
      deleteItem(String(message.id))
      // Optionally, navigate to a different message or clear the selected message
    }
  }

  const handleMarkAsStarred = async () => {
    await markAsStarred({
      data: {
        id: Number(messageId),
        starred: true,
      },
    })
  }

  const handleMarkAsImportant = async () => {
    await markAsImportant({
      data: {
        id: Number(messageId),
        important: true,
      },
    })
  }

  const { data: message, isLoading: isMessageLoading } =
    useSupplierCollaborationById(Number(messageId))

  const defaultMessage = {
    supplierCollaborationId: Number(messageId),
    to: message?.to,
    messageBody: "",
    attachmentFile: undefined,
    imageFile: undefined,
  }

  const onSubmit: SubmitHandler<Replay> = (data) => {
    const formData = {
      ...data,
      supplierCollaborationId: Number(messageId),
      to: message?.to,
    }
    // console.log(formData)
    sendSupplierEmailReplay({
      data: formData,
    })
  }

  if (isMessageLoading || isMarkingAsImportant || isMarkingAsStarred) {
    return (
      <div
        className={cn(
          "!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center",
          className
        )}>
        <Loader variant="spinner" size="xl" />
      </div>
    )
  }

  if (!message) {
    return (
      <div
        className={cn(
          "!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center",
          className
        )}>
        <Empty
          text="No conversations selected"
          textClassName="mt-4 text-base text-gray-500"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative pt-6 lg:rounded-lg lg:border lg:border-muted lg:py-7 xl:py-5 2xl:pb-7 2xl:pt-6",
        className
      )}>
      <div>
        <div className="flex flex-col justify-between gap-4 border-b border-dotted border-gray-500/20 md:flex-row 3xl:flex-row 3xl:items-center">
          <div className="block"></div>

          <div className="mb-4 flex flex-col flex-wrap items-end gap-5 px-5 sm:justify-end">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
              <StarredIcon
                onClick={handleMarkAsStarred}
                className={`flex h-6 w-6 cursor-pointer items-center gap-2 ${message?.starred ? "text-yellow-500" : ""}`}
              />
              <MarkAsReadIcon
                onClick={handleMarkAsImportant}
                className={`mt-2 flex h-7 w-7 cursor-pointer items-center gap-2 ${message?.important ? "text-yellow-500" : ""}`}
              />
              <TrashIcon
                onClick={handleDelete}
                className="flex h-6 w-6 cursor-pointer items-center gap-2"
              />
            </div>
            <span className="block">{/* Open  */}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-b border-dotted border-gray-500/20 pt-3 md:flex-row 3xl:flex-row 3xl:items-center">
          <div className="flex flex-col items-start justify-between gap-3 px-5 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
            <Title as="h4" className="font-semibold">
              {t("text-subject-read-abbreviation")}: {message?.subject}
            </Title>
          </div>
          <div className="flex flex-col flex-wrap items-end gap-3 px-5 sm:justify-end">
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <Tooltip
                size="sm"
                content="Undo Reply"
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <ArrowLeftIcon
                  className="flex h-5 w-5 cursor-pointer items-center gap-2 rounded-full hover:bg-gray-500/10"
                  onClick={() => toggleReplyForm(String(message.id))}
                />
              </Tooltip>

              <Tooltip
                size="sm"
                content="Reply"
                placement="top"
                className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
                arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
                color="invert">
                <ArrowRightIcon
                  className="flex h-5 w-5 cursor-pointer items-center gap-2 rounded-full hover:bg-gray-500/10"
                  onClick={() => toggleReplyForm(String(message.id))}
                />
              </Tooltip>
            </div>
            <span className="mb-2 block">{"04 Feb 2025 3:13 am"}</span>
          </div>
        </div>

        <div className="px-5 [&_.simplebar-content]:grid [&_.simplebar-content]:gap-8 [&_.simplebar-content]:py-5">
          <SimpleBar className="@3xl:max-h-[calc(100dvh-34rem)] @4xl:max-h-[calc(100dvh-32rem)] @7xl:max-h-[calc(100dvh-31rem)]">
            <MessageBody />
          </SimpleBar>
        </div>

        {replyingToMessageId === String(message.id) && (
          <div
            ref={ref}
            className="flex items-start rounded-b-lg px-5 @3xl:pt-4 dark:bg-transparent">
            <figure className="dark:mt-4"></figure>
            <div className="w-full">
              <Form<Replay>
                className="relative border border-none p-4 2xl:p-5"
                onSubmit={onSubmit}
                validationSchema={ReplaySchema}
                useFormProps={{
                  defaultValues: defaultMessage,
                }}>
                {({
                  register,
                  setValue,
                  formState: { errors },
                }: UseFormReturn<Replay>) => {
                  return (
                    <>
                      <Textarea
                        labelClassName="bg-paper"
                        label={tForm("form-message")}
                        {...register("messageBody")}
                        error={
                          errors.messageBody?.message
                            ? tForm(errors.messageBody?.message as string)
                            : ""
                        }
                        className="flex-grow border !border-none text-title"
                        textareaClassName="bg-paper dark:bg-paper text-title dark:text-title"
                      />
                      <div className="relative mt-4 flex items-center justify-between">
                        {/* <UploadFilePinIcon className="h-8 w-8" /> */}

                        <div className="flex gap-2">
                          <SimpleFileUpload
                            acceptedFiles={["image/*"]}
                            onFileSelect={(files) => {
                              setValue("imageFile", files[0])
                            }}
                            // onValidationError={handleValidationError}
                            multiple={false}
                          />
                          <SimpleFileUpload
                            acceptedFiles={["application/pdf"]}
                            onFileSelect={(files) => {
                              setValue("attachmentFile", files[0])
                            }}
                            // onValidationError={handleValidationError}
                            multiple={false}
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="solid"
                          isLoading={isSendingSupplierEmailReplay}
                          color="primary"
                          className="flex items-center">
                          {tForm("form-send")}

                          <SendIcon className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </>
                  )
                }}
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function DotSeparator({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      {...props}>
      <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
    </svg>
  )
}
