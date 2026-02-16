import React, { useState, useMemo } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Input, Select } from "@/components/ui"
import SkeletonLoader from "@/components/base/skeleton-loader"
import UserCell from "./user-cell"
import { useCurrentUser } from "@/hooks/auth/use-auth"
import { useTranslations } from "next-intl"
import { PiMagnifyingGlass } from "react-icons/pi"
import { useSOTemplate } from "../sales-orders/so-template"
import cn from "@core/utils/class-names"
import { useMedia } from "react-use"
dayjs.extend(relativeTime)

export default function MessageList({
  selectedContact,
  setSelectedContact,
  isLoading,
  data,
  setCustomerId
}: any) {
  const t = useTranslations("crm")
  const isMobile = useMedia("(max-width: 480px)", false)
  const { user } = useCurrentUser()
  const { userOptions, isUserLoading } = useSOTemplate()
  const [searchQuery, setSearchQuery] = useState("")
  const filteredMessageList = useMemo(() => {
    if (!data) return []
    return data.filter((contact: any) => {
      const contactName = contact?.name || ""
      return (
        (contact.customerId === user?.id || contact.createdBy === user?.email) &&
        contactName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }, [data, user, searchQuery])

  return (
    <div className="w-full border-r py-5 dark:border-gray-700">
      <div className={cn(
        "mb-4 md:px-5 py-1",
        isMobile ? "px-1" : "px-3"
      )}>
      <Select
        isSearchable={true}
        placeholder={t("text-search-represetatives")}
        options={userOptions}
        isLoading={isUserLoading}
        isDisabled={isUserLoading}
        onChange={(option: any) => {
          setCustomerId(option?.value)
        }}
        controlClassName={cn(
          isMobile ? "p-1 text-xs" : "p-4"
        )}
      />
        {/* <Input
          type="text"
          placeholder={t("text-search-represetatives")}
          inputClassName="h-[54.56px] p-0 md:px-3.5"
          prefix={<PiMagnifyingGlass className="size-5 text-gray-500 max-sm:hidden" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
      </div>

      <div className="space-y-4 h-[60vh] overflow-y-scroll scroll-smooth">
        {isLoading && <SkeletonLoader row={2} />}
        {filteredMessageList.length > 0 ? (
          filteredMessageList.map((contact: any, index: number) => {
            const uniqueKey = contact?.id || `contact-${index}`
            return (
              <div
                key={uniqueKey}
                onClick={() => setSelectedContact(contact)}
                className={`flex cursor-pointer items-center justify-between dark:bg-gray-800 px-3 md:px-5 py-2 ${
                  selectedContact?.id === contact?.id ? "bg-gray-100 dark:bg-gray-600" : ""
                } `}>
                <div className="flex items-center space-x-3 py-1">
                  <UserCell
                    assignedTo={user?.id == contact.customerId ? contact.createdBy : contact.customerId}
                    messageContent={contact?.messageDetails?.[0]?.messageContent}
                  />
                </div>
                <div className="flex flex-col items-end gap-1 max-sm:hidden">
                  <div className="text-sm text-gray-500">
                    {contact?.messageDetails?.[0]?.createdAt &&
                      dayjs(contact?.messageDetails[0]?.createdAt)?.fromNow(true)}
                  </div>
                  {contact?.online && (
                    <span className="h-2 w-2 rounded-full bg-[#00B8D9]"></span>
                  )}
                </div>
              </div>
            )
          })
        ) : null}
      </div>
    </div>
  )
}