"use client"

import { useAtomValue } from "jotai"
import toast from "react-hot-toast"
import { Avatar, Loader, Text, Title } from "rizzui"

import SendDocumentDownload from "@/components/ui/send-document-download"
import { useSupplierCollaborationById } from "@/modules/scm/hooks/procurement/supplier/use-supplier-collaboration"
import { cn } from "@/utils/cn"

import { messageIdAtom } from "./message-list"
import { removeHtmlTags } from "./utils"

interface InboxListProps {
  className?: string
}

export default function MessageBody({ className }: InboxListProps) {
  const messageId = useAtomValue(messageIdAtom)

  const { data: message, isLoading: isMessageLoading } =
    useSupplierCollaborationById(Number(messageId))

  const initials = `${message?.supplierName?.charAt(0)}`

  const handleDownload = () => {
    toast.success("Download initiated")
    // Implement download logic here
  }

  if (isMessageLoading) {
    return <Loader />
  }

  return (
    <div>
      <div
        className={cn(
          "grid grid-cols-[32px_1fr] items-start gap-3 lg:gap-4 xl:grid-cols-[48px_1fr]",
          className
        )}>
        <Avatar
          name="John Doe"
          src={message?.imageUrl as string}
          initials={initials}
          className="!h-8 !w-8 bg-[#70C5E0] font-medium text-white xl:!h-11 xl:!w-11"
        />
        <div className="-mt-1.5 lg:mt-0">
          <div className="flex items-center gap-2">
            <Title
              as="h3"
              className="text-base font-bold text-gray-900 dark:text-gray-0">
              {message?.supplierName}
            </Title>
            <span className="flex items-center lowercase">
              {`<${message?.email}>`}
            </span>
          </div>
          <div className="mt-1.5 items-center gap-2 text-xs text-gray-500 lg:flex">
            <span className="mt-1.5 flex items-center lg:mt-0">
              {`To: ${message?.email}`}
            </span>
          </div>
        </div>
      </div>
      {message?.attachmentUrl && (
        <SendDocumentDownload url={message?.attachmentUrl} />
      )}

      <div className="ml-10 mt-3 grid gap-2 leading-relaxed text-gray-900 dark:text-gray-0 xl:ml-16 2xl:mt-4">
        <Text>{removeHtmlTags(message?.messageBody ?? "")}</Text>
        <Text>
          Regards, <br />
          {message?.supplierName}, <br />
          {message?.company}
        </Text>
      </div>
    </div>
  )
}
