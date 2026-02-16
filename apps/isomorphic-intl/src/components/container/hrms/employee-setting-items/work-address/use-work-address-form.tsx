import { useDrawer } from "@/components/base/drawer-views/use-drawer"

export const useWorkAddressForm = () => {
  const { closeDrawer } = useDrawer()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  return {
    handleCloseDrawer,
  }
}
