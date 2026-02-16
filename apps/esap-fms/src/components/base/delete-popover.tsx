import { useTranslations } from "next-intl"
import { ActionIcon, Button, Popover, Text, Title } from "rizzui"

import TrashIcon from "@/components/icons/trash"

type DeletePopoverProps = {
  title: string
  description: string
  onDelete: () => void
  translationObjectName?: string
}

export default function DeletePopover({
  translationObjectName = "table",
  title,
  description,
  onDelete,
}: DeletePopoverProps) {
  const t = useTranslations(translationObjectName)

  return (
    <Popover
      placement="left"
      arrowClassName="dark:fill-paper [&>path]:stroke-transparent">
      <Popover.Trigger>
        <ActionIcon
          size="sm"
          variant="outline"
          aria-label={"Delete Item"}
          className="h-6 w-7 cursor-pointer border-gray-500/20">
          <TrashIcon className="h-4 w-4" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content className="dropdown-gr card-shadow z-10 border-none dark:bg-paper">
        {({ setOpen }) => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-700 dark:text-gray-0 sm:items-center">
              <TrashIcon className="me-1 h-[17px] w-[17px]" /> {t(title)}
            </Title>
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                className="me-1.5 h-7"
                onClick={() => {
                  onDelete()
                  setOpen(false)
                }}>
                {t("table-text-yes")}
              </Button>
              <Button
                size="sm"
                variant="flat"
                color="danger"
                className="h-7"
                onClick={() => setOpen(false)}>
                {t("table-text-no")}
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  )
}
