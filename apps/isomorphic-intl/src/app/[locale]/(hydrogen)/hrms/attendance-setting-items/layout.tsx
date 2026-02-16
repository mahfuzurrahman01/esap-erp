import PageHeader from "@/components/base/page-header"
import TabRouteNavigation from "@/components/container/tab-route-navigation"

const pageHeader = {
  title: "text-attendance-and-leave-setting-items",
  breadcrumb: [
    {
      href: "/hrms",
      name: "text-dashboard",
    },
    {
      name: "text-attendance-and-leave-setting-items",
    },
  ],
}

const menuItems = [
  {
    label: "text-leave-types",
    value: "/attendance-setting-items/leave-types",
  },
]

const EmployeeSettingItemsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <TabRouteNavigation menuItems={menuItems} translationObjectName="hrms" />
      {children}
    </>
  )
}

export default EmployeeSettingItemsLayout
