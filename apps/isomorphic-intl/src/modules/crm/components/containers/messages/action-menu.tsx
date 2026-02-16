import { useRouter } from "next/navigation"
import React from "react"

import { useTranslations } from "next-intl"

import ListPopover from "@/components/base/list-popover"
import { BlockIcon } from "@/components/icons/crm/block"
import { UserIcon } from "@/components/icons/crm/user"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useCurrentUser } from "@/hooks/auth/use-auth"

export default function ActionMenu({
  selectedContact,
  handleBlock,
  handleDelete,
}: any) {
  const t = useTranslations("crm")
  const router = useRouter()
  const { user } = useCurrentUser()
  return (
    <div className="flex items-center justify-end gap-3">
      <ListPopover>
        <Button
          size="sm"
          variant="text"
          className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
          onClick={() =>
            router.push(
              routes.crm.viewProfile(
                user?.id == selectedContact?.customerId
                  ? user?.id
                  : selectedContact?.customerId
              )
            )
          }>
          <UserIcon className="h-4 w-4" />
          {t("text-view-profile")}
        </Button>
        <Button
          size="sm"
          variant="text"
          className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
          onClick={() =>
            handleBlock(selectedContact?.id, selectedContact?.isBlock)
          }>
          <BlockIcon className="h-4 w-4" />
          {selectedContact?.isBlock ? t("text-unblock") : t("text-block")}
        </Button>
        <Button
          size="sm"
          variant="text"
          className="h-7 w-full justify-start gap-2 font-semibold text-title transition-colors hover:bg-gray-500/10"
          onClick={() => handleDelete(selectedContact?.id)}>
          <TrashIcon className="h-4 w-4" />
          {t("text-delete")}
        </Button>
      </ListPopover>
    </div>
  )
}
