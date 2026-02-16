import { ActionIcon } from "rizzui/action-icon"

import BankingIcon from "@/components/icons/banking"
import { cn } from "@/utils/cn"

interface TopBankAccountItemProps {
  title: string
  type: string
  isActive?: boolean
}

export default function TopBankAccountItem({
  title,
  type,
  isActive,
}: TopBankAccountItemProps) {
  // const TrendIcon =
  //   percentageChange >= 0 ? ArrowTrendUpIcon : ArrowTrendDownIcon
  // const trendColor = percentageChange >= 0 ? "primary" : "danger"
  // const activeBgColor = percentageChange >= 0 ? "bg-primary/15" : "bg-red/15"

  return (
    <div
      className={cn(
        "flex flex-col gap-8 rounded-[40px] p-4 @2xl:p-6 @3xl:gap-11 @3xl:pt-10",
        isActive && "bg-title dark:bg-background"
      )}>
      <div className="flex items-center gap-4">
        <ActionIcon
          size="lg"
          variant="flat"
          rounded="full"
          className={cn(
            "size-10 shrink-0 grow-0 basis-auto border-gray-500/20 bg-gray-500/20 @2xl:size-12 @3xl:size-[60px]",
            isActive && "text-white"
          )}>
          <BankingIcon className="size-10" />
        </ActionIcon>
        <div className="flex flex-col gap-1">
          <div
            className={cn(
              "max-w-[100px] truncate text-lg font-bold text-title @2xl:max-w-[120px] @2xl:text-xl @3xl:max-w-[135px] @3xl:text-2xl",
              isActive && "text-white"
            )}>
            {title}
          </div>
          <div className={cn("max-w-[100px] text-sm truncate", isActive && "text-white/50")}>
            {type}
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-between gap-2">
        <Badge
          rounded="pill"
          color={trendColor}
          variant="flat"
          className={cn(
            "gap-1.5 @2xl:text-lg font-semibold @2xl:h-8 @3xl:h-10 @3xl:px-3.5",
            isActive && activeBgColor
          )}>
          <span>{percentage}</span>
          <TrendIcon className="h-4 w-4" />
        </Badge>
        <div className={cn("text-sm text-title", isActive && "text-white")}>
          {lastMonth}
        </div>
      </div> */}
    </div>
  )
}
