import cn from "@core/utils/class-names"

interface FormGroupProps {
  title: React.ReactNode
  className?: string
  childrenContainerClassName?: string
  description?: string
  children?: React.ReactNode
}

export default function FormGroup({
  title,
  className,
  childrenContainerClassName,
  description,
  children,
}: FormGroupProps) {
  return (
    <div className={cn("grid gap-5 @3xl:grid-cols-12", className)}>
      <div className="col-span-full @4xl:col-span-4">
        <h4 className="text-base font-medium md:text-xl md:font-semibold">
          {title}
        </h4>
        {description && <p className="mt-2">{description}</p>}
      </div>
      {children && (
        <div
          className={cn(
            "col-span-full grid gap-4 @2xl:grid-cols-2 @4xl:col-span-8 @4xl:gap-5 xl:gap-7",
            childrenContainerClassName
          )}>
          {children}
        </div>
      )}
    </div>
  )
}
