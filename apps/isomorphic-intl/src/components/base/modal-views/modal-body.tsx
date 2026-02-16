import cn from "@core/utils/class-names"

type Props = {
  children: React.ReactNode
  className?: string
}

const ModalBody = ({ children, className = "" }: Props) => {
  return (
    <div className={cn("bg-gray-200 p-6 dark:bg-gray-800", className)}>
      {children}
    </div>
  )
}

export default ModalBody
