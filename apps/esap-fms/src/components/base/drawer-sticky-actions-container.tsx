import { ReactNode } from "react"

interface DrawerStickyActionsContainerProps {
  children: ReactNode
}

const DrawerStickyActionsContainer = ({
  children,
}: DrawerStickyActionsContainerProps) => {
  return (
    <div className="sticky bottom-0 box-border flex justify-end gap-2 border-t border-dashed border-gray-500/20 px-5 py-6">
      {children}
    </div>
  )
}

export default DrawerStickyActionsContainer
