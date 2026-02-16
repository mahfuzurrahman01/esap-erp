import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { PiCommand, PiMagnifyingGlassBold } from "react-icons/pi"

type SearchTriggerProps = {
  placeholderClassName?: string
  icon?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function SearchTrigger({
  icon,
  className,
  placeholderClassName,
  ...props
}: SearchTriggerProps) {
  const t = useTranslations("common")
  return (
    <button
      aria-label="Search"
      className={cn(
        "group inline-flex items-center hover:border-primary focus:outline-none active:translate-y-px xl:h-10 xl:w-full xl:max-w-sm rounded-lg xl:rounded-lg xl:border xl:border-gray-500/20 py-2 ps-3 xl:py-2 xl:pe-2 xl:ps-3.5 xl:shadow-sm xl:backdrop-blur-md xl:transition-colors xl:duration-200",
        className
      )}
      {...props}>
      {icon ? (
        icon
      ) : (
        <PiMagnifyingGlassBold className="magnifying-glass me-2 h-4 w-4" />
      )}
      <span
        className={cn(
          "hidden text-sm font-semibold placeholder:text-gray-500/5 group-hover:text-gray-500 dark:group-hover:text-gray-500 xl:inline-flex",
          placeholderClassName
        )}>
        {t("text-search-your-page")}
      </span>
      <span className="search-command ms-auto items-center text-sm text-gray-600 rounded-md bg-primary px-1.5 py-1 font-semibold xl:justify-normal hidden xl:flex">
        <PiCommand strokeWidth={1.3} className="h-[15px] w-[15px]" />K
      </span>
    </button>
  )
}
