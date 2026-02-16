export interface SideMenuData {
  id: number
  title: string
  icon: React.ReactNode
  count: number
  filterType: "all" | "read" | "unread" | "starred" | "important"
  onClick?: () => void
}