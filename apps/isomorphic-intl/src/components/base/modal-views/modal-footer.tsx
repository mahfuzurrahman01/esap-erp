import cn from "@core/utils/class-names"

type Props = {
  children: React.ReactNode
  className?: string
}

const ModalFooter = ({ children, className = "" }: Props) => {
  return (
    <div
      className={cn(
        "flex justify-end gap-3 p-4 dark:bg-gray-900 md:p-6",
        className
      )}>
      {children}
    </div>
  )
}

export default ModalFooter
