import { PiTrashFill } from "react-icons/pi"
import { Button, Text, Title } from "rizzui"

type DeleteOptionProps = {
  title: string
  description: string
  onDelete: () => void
}

export default function DeleteOption({
  title,
  description,
  onDelete,
}: DeleteOptionProps) {
  //   const t = useTranslations('table');

  return (
    <div className="rounded-lg bg-paper p-6 text-left text-gray-900 @container dark:bg-paper dark:text-gray-0 rtl:text-right">
      <Title
        as="h6"
        className="mb-0.5 flex items-start text-sm sm:items-center">
        <PiTrashFill className="me-1 h-[17px] w-[17px]" />
        {title}
      </Title>

      <Text className="mb-2 leading-relaxed text-gray-500">{description}</Text>

      <div className="flex items-center justify-end">
        <Button size="sm" className="me-1.5 h-7" onClick={onDelete}>
          {"Yes"}
        </Button>
      </div>
    </div>
  )
}
