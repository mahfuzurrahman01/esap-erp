import cn from "@core/utils/class-names"

type Props = {
  title: string
  children: React.ReactNode
  className?: string
}

export const EmployeeDetailsGroupContainer = ({
  title,
  className,
  children,
}: Props) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="h6 px-6 pt-6 text-primary">{title}</span>
      {children}
    </div>
  )
}

export const EmployeeDetailsItemContainer = ({
  title,
  className,
  children,
}: Props) => {
  return (
    <div
      className={cn(
        "divider-color flex flex-col gap-4 border-b border-dashed p-6",
        className
      )}>
      <h3 className="subtitle2 typography-primary">{title}</h3>
      <div className="max-w-[40rem]">{children}</div>
    </div>
  )
}

type EmployeeDetailsItemGroupProps = {
  title: string
  containerClassName?: string
  data: Record<string, string | undefined>
}

export const EmployeeDetailsItemGroup = ({
  title,
  containerClassName,
  data,
}: EmployeeDetailsItemGroupProps) => {
  console.log(data)
  return (
    <EmployeeDetailsItemContainer title={title} className={containerClassName}>
      <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
        {Object.entries(data).map(([label, value]) => {
          return (
            <div key={label} className="flex flex-col @sm:flex-row @sm:gap-x-4">
              <span className="typography-disabled caption w-full basis-full @sm:w-[133px] @sm:max-w-[133px]">
                {label}
              </span>
              <span className="subtitle2 typography-primary line-clamp-2 w-full basis-full @sm:grow">
                {value}
              </span>
            </div>
          )
        })}
      </div>
    </EmployeeDetailsItemContainer>
  )
}
