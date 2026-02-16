import EyeIcon from "@core/components/icons/eye"
import { useTranslations } from "next-intl"
import { ActionIcon, Tooltip } from "rizzui"

type Props = {
  onClick: () => void
  tooltipContent?: string
}

const ViewIconButton = ({ onClick, tooltipContent }: Props) => {
  const t = useTranslations("table")
  const _tooltipContent = tooltipContent ? tooltipContent : t("table-text-view")

  return (
    <Tooltip
      size="sm"
      content={_tooltipContent}
      placement="top"
      className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
      arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
      color="invert">
      <ActionIcon
        as="button"
        size="sm"
        variant="outline"
        className="h-6 w-7 border-gray-500/20"
        onClick={onClick}>
        <EyeIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  )
}

export default ViewIconButton
