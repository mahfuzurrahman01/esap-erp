import cn from "@core/utils/class-names"

type BoxContainerProps = {
  children: React.ReactNode
  className?: string
}

const BoxContainer = ({ children, className }: BoxContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-screen-2xl flex-col justify-between gap-7 divide-y divide-dashed divide-gray-500/20 px-5 pb-7 @2xl:gap-9 @2xl:pb-9 @3xl:gap-10 @3xl:pb-10",
        className
      )}>
      {children}
    </div>
  )
}

export default BoxContainer
