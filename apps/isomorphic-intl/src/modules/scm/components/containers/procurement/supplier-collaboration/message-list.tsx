"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";



import { useMedia } from "@core/hooks/use-media";
import SimpleBar from "@core/ui/simplebar";
import { LineGroup, Skeleton } from "@core/ui/skeleton";
import cn from "@core/utils/class-names";
import rangeMap from "@core/utils/range-map";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useDebounce } from "react-use";
import { Empty, Title } from "rizzui";



import { Input } from "@/components/ui";
import Avatar from "@/components/ui/avatar";
import { routes } from "@/config/routes";
import { useReadAsMarked } from "@/modules/scm/hooks/procurement/supplier/use-supplier-collaboration";
import { SupplierCollaboration, SupplierCollaborationQueryOptions } from "@/modules/scm/types/procurement/supplier/supplier-collaboration-types";



import { dataAtom } from "./side-menu";
import { truncateDescription } from "./utils";





interface MessageItemProps {
  message: SupplierCollaboration
  className?: string
}

export const messageIdAtom = atomWithStorage("messageId", "")

export function MessageItem({ className, message }: MessageItemProps) {
  const hoverRef = useRef(null)
  const router = useRouter()

  const isMobile = useMedia("(max-width: 1023px)", false)

  const [messageId, setMessageId] = useAtom(messageIdAtom)

  const isActive = messageId === String(message.id)

  const url = routes.support.messageDetails(messageId)

  useEffect(() => {
    setMessageId(String(message.id ?? "0"))
  }, [message])

  const { mutate: markAsRead } = useReadAsMarked()

  const handleMarkAsRead = async () => {
    await markAsRead({
      data: {
        id: Number(messageId),
        markedAsRead: true,
      },
    })
  }

  function handleChange() {
    setMessageId(String(message.id ?? 0))
    if (!message.markedAsRead) {
      handleMarkAsRead()
    }
    if (isMobile) {
      router.push(url)
    }
  }

  return (
    <div
      ref={hoverRef}
      onClick={handleChange}
      className={cn(
        className,
        "grid cursor-pointer grid-cols-[24px_1fr] items-start gap-4 border-t border-none p-5 hover:bg-gray-400/20 dark:hover:bg-gray-700/40",
        isActive &&
          "rounded-lg border-t-2 border-t-primary bg-gray-400/20 dark:bg-gray-700/40"
      )}>
      <Avatar src={message?.imageUrl as string} className="mr-2 !h-9 !w-9" />
      <div>
        <div className="flex items-center justify-between text-gray-900 dark:text-gray-0 lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center">
          <Title as="h4" className="flex items-center">
            <span className="text-sm font-semibold">
              {" "}
              {message?.subject && message.subject.length > 20
                ? `${message?.subject?.substring(0, 20)}..`
                : message?.subject}
            </span>
          </Title>
          {/* <span className="text-xs">{getRelativeTime(message.date)}</span> */}
        </div>
        <p className="mt-1 line-clamp-3 text-sm text-gray-900 dark:text-gray-0">
          {truncateDescription(message?.messageBody ?? "")}
        </p>
      </div>
    </div>
  )
}

interface InboxListProps {
  className?: string
  data?: any
  params?: SupplierCollaborationQueryOptions
  updateParams?: (newParams: Partial<SupplierCollaborationQueryOptions>) => void
  isLoading?: boolean
}

export default function MessageList({ className, params, updateParams, isLoading, data: supplierCollaborationData }: InboxListProps) {
  const [data, setData] = useAtom(dataAtom)
  const [searchQuery, setSearchQuery] = useState(params?.search ?? "")

   // Ensure data is always treated as an array
const safeData: SupplierCollaboration[] = Array.isArray(supplierCollaborationData)
  ? supplierCollaborationData as SupplierCollaboration[]
  : [];

  // Update data when supplierCollaboration changes
  useEffect(() => {
    if (safeData) {
      setData(safeData ?? [])
    } else {
      setData([])
    }
  }, [safeData, setData])

  useDebounce(
    () => {
      updateParams?.({ search: searchQuery, pageIndex: 1 })
    },
    500,
    [searchQuery]
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <>
      <div className={cn(className, "sticky")}>
        <div className="mb-7">
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onClear={() => handleSearch("")}
              onChange={(e) => handleSearch(e.target.value)}
              inputClassName="h-14 !w-[100%] lg:!w-[100%] xl:!w-[100%] 2xl:!w-[120%] 3xl:!w-[145%] 4xl:!w-[130%] rounded-lg border-gray-500/20 ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-600"
              prefix={<PiMagnifyingGlassBold className="h-6 w-6" />}
            />
          </div>
        </div>
         {isLoading ? (
          <div className="grid gap-4">
            {rangeMap(3, (i) => (
              <MessageLoader key={i} />
            ))}
          </div>
        ) : data?.length === 0 ? (
          <div className={cn(
            "!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center",
            className
          )}>
            <Empty
              text="No messages found"
              textClassName="mt-4 text-base text-gray-500"
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border !border-none">
            <SimpleBar className="max-h-[calc(100vh-356px)] md:max-h-[calc(100vh-311px)] lg:max-h-[calc(100vh-240px)] xl:max-h-[calc(100vh-230px)] 2xl:max-h-[calc(100vh-240px)] 3xl:max-h-[calc(100vh-270px)]">
              {data?.map((message: SupplierCollaboration) => (
                <MessageItem key={message.id} message={message} />
              ))}
            </SimpleBar>
          </div>
        )}
      </div>
    </>
  )
}

export function MessageLoader() {
  return (
    <div className="grid gap-3 border-t border-muted p-5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-3 w-32 rounded" />
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="ml-auto h-3 w-16 rounded" />
      </div>
      <LineGroup
        columns={6}
        className="grid-cols-6 gap-1.5"
        skeletonClassName="h-2"
      />
      <LineGroup
        columns={5}
        className="grid-cols-5 gap-1.5"
        skeletonClassName="h-2"
      />
      <LineGroup
        columns={4}
        className="grid-cols-4 gap-1.5"
        skeletonClassName="h-2"
      />
    </div>
  )
}