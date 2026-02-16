import cn from "@core/utils/class-names"

export default function OrSeparation({
  title,
  className,
  isCenter = false,
}: {
  title: string
  className?: string
  isCenter?: boolean
}) {
  return (
    <div
      className={cn(
        "before:content-[' '] relative mt-0.5 flex items-center before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:border before:border-dotted before:border-gray-500/20",
        className,
        isCenter ? "justify-center" : "justify-start"
      )}>
      <span
        className={cn(
          "relative z-10 inline-block bg-paper text-sm font-medium text-gray-500/50 2xl:text-base dark:bg-gray-900",
          isCenter ? "px-2.5" : "pe-2.5"
        )}>
        {title}
      </span>
    </div>
  )
}
