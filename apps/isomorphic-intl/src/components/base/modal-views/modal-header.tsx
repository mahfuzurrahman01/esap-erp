import cn from "@core/utils/class-names"

type Props = {
  children: React.ReactNode
  className?: string
}

const ModalHeader = ({ children, className = "" }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-6 dark:bg-gray-900",
        className
      )}>
      {children}
    </div>
  )
}

export default ModalHeader
