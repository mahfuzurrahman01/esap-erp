import React, { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import SendIcon from "@/components/icons/send-icon"
import { Button, Input, Textarea } from "@/components/ui"
import { useCurrentUser } from "@/hooks/auth/use-auth"
import {
  useBlockMessage,
  useCreateMessageDetails,
  useDeleteMessage,
} from "@/modules/crm/hooks/use-message"
import { messageFormSchema } from "@/modules/crm/validators/message-schema"

import OponentAvatar from "./oponent-avatar"
import SelectedProfile from "./selected-profile"
import SelectedUserCell from "./selected-user-cell"
import Preview from "./preview"
import ActionMenu from "./action-menu"
import { useMedia } from "react-use"
import { cn } from "@/utils/cn"

dayjs.extend(relativeTime)

export default function Conversation({
  selectedContact,
  setSelectedContact,
  messages,
  setMessages,
  handleScroll,
  isLoadingMore,
  messagesEndRef,
}: {
  selectedContact: any
  setSelectedContact: any
  messages: any[]
  setMessages: any
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void
  isLoadingMore: boolean
  messagesEndRef: any
  isDetailsLoading: boolean
}) {
  const t = useTranslations("crm")
  const isMobile = useMedia("(max-width: 480px)", false)
  const initialData = {
    newMessage: "",
  }
  const { mutateAsync: createMessageDetails } = useCreateMessageDetails()
  const { mutateAsync: deleteMessage } = useDeleteMessage()
  const { mutateAsync: blockMessage } = useBlockMessage()
  const [reset, setReset] = useState(initialData || {})
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)
  const { user } = useCurrentUser()

  const handleFormSubmit: SubmitHandler<{ newMessage: string }> = async (
    data: any
  ) => {
    const newMessageObject = {
      messageId: selectedContact.id,
      messageContent: data.newMessage,
      sender: user?.id,
      createdBy: user?.id,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev: any) => [...prev, newMessageObject])
    setShouldScrollToBottom(true)
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: data.newMessage,
        sender: user?.id,
        receiver:
          user?.id == selectedContact?.customerId
            ? selectedContact?.createdBy
            : selectedContact?.customerId,
        createdAt: new Date().toISOString(),
      }),
    })
    await createMessageDetails(newMessageObject)
  }

  async function handleDelete(id: string) {
    await deleteMessage(id)
    setMessages(messages.filter((message) => message.messageId !== id))
  }

  async function handleBlock(id: string, isBlock: boolean) {
    const updatedStatus = !isBlock
    await blockMessage({ id, data: updatedStatus })
    setMessages(messages.filter((message) => message.messageId !== id))
    setSelectedContact((prevContact:any) =>
      prevContact?.id === id ? { ...prevContact, isBlock: updatedStatus } : prevContact
    );
  }

  useEffect(() => {
    if (messagesEndRef.current && shouldScrollToBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages, shouldScrollToBottom])

  return (
    <div className="col-span-4 flex w-full flex-col">
      {selectedContact ? (
        <>
          <div className="flex w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:px-4 lg:px-6 rounded-tr-[16px]">
            <div className="flex items-center gap-4">
              <SelectedUserCell
                assignedTo={
                  user?.id == selectedContact?.customerId
                    ? selectedContact?.createdBy
                    : selectedContact?.customerId
                }
              />
            </div>
            <ActionMenu selectedContact={selectedContact} handleBlock={handleBlock} handleDelete={handleDelete} />
          </div>
          <div className="flex h-full">
            <div className="w-3/4 max-sm:w-full">
              <div
                className="space-y-4 overflow-y-auto p-6 max-sm:p-4 h-[60vh]"
                onScroll={(e) => {
                  handleScroll(e)
                  setShouldScrollToBottom(false)
                }}>
                {isLoadingMore && <div>{t("text-loading-more")}</div>}
                {messages.length > 0 &&
                  messages.map((message, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex flex-col ${
                          message?.sender == user?.id
                            ? "items-end"
                            : "items-start"
                        } space-y-1`}>
                        {message.sender == user?.id ? (
                          <div className="grid gap-2">
                            <span className="text-xs text-gray-500">
                              {message?.createdAt &&
                                dayjs(message?.createdAt)?.fromNow(true)}
                            </span>
                            <div className="break-words max-w-sm rounded-md bg-green-200 p-3 text-title dark:bg-[#C8FAD6] dark:text-gray-900">
                              {message?.messageContent}
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <OponentAvatar
                              id={
                                user?.id == selectedContact?.customerId
                                  ? selectedContact?.createdBy
                                  : selectedContact?.customerId
                              }
                            />
                            <div className="grid gap-2">
                              <span className="text-xs text-gray-500">
                                {message?.createdAt &&
                                  dayjs(message?.createdAt)?.fromNow(true)}
                              </span>
                              <div className="max-w-sm rounded-md bg-gray-200 p-3 text-title dark:bg-gray-700">
                                {message?.messageContent}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
              </div>
              <Form<{ newMessage: string }>
                className="flex items-center space-x-4 border-t p-4 dark:border-gray-700"
                onSubmit={handleFormSubmit}
                validationSchema={messageFormSchema}
                resetValues={reset}
                useFormProps={{
                  mode: "onChange",
                  defaultValues: initialData,
                }}>
                {({ register, formState: { errors }, handleSubmit, setValue }) => {
                  return (
                    <>
                      <span className="w-full">
                        <Textarea
                          readOnly={selectedContact?.isBlock}
                          placeholder={selectedContact?.isBlock ? t("text-user-is-blocked") : t("text-type-a-message")}
                          className="w-full"
                          autoComplete="off"
                          {...register("newMessage")}
                          textareaClassName={cn(
                            isMobile ? "w-[55vw]" : "w-[42.7vw] ",
                            "border-none outline-none text-title hover:border-none focus:border-none focus:ring-0 ring-0 [&.is-focus]:ring-0 w-full"
                          )}
                          labelClassName="mb-0 w-full"
                          error={errors?.newMessage?.message ? " " : undefined}
                          rows={1}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmit(async (data) => {
                                await handleFormSubmit(data);
                              })();
                              setValue("newMessage", "")
                            }
                          }}
                        />
                      </span>
                      <Button
                        type="submit"
                        disabled={selectedContact?.isBlock}
                        className="w-auto bg-transparent px-0 text-gray-500 hover:bg-transparent dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 pl-2 pt-2 pb-1 pr-1 !border-transparent hover:border-transparent">
                        <SendIcon className="size-6 dark:text-gray-500" />
                      </Button>
                    </>
                  )
                }}
              </Form>
            </div>
            <SelectedProfile
              id={
                user?.id == selectedContact.customerId
                  ? selectedContact.createdBy
                  : selectedContact.customerId
              }
            />
          </div>
        </>
      ) : (
        <Preview />
      )}
    </div>
  )
}