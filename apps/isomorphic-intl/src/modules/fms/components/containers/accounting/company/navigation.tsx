import TabRouteNavigationInner from "@/components/container/tab-route-navigation-inner"
import { routes } from "@/config/routes"

export default function CompanyNavigation({
  id,
  children,
}: {
  id: number
  children: React.ReactNode
}) {
  const menuItems = [
    {
      label: "text-details",
      value: routes.fms.editCompany(id),
    },
    {
      label: "text-accounts",
      value: routes.fms.editCompanyAccounts(id),
    },
    {
      label: "text-buying-and-selling",
      value: routes.fms.editCompanyBuyingAndSelling(id),
    },
    {
      label: "text-stock-and-manufacturing",
      value: routes.fms.editCompanyStockAndManufacturing(id),
    },
  ]
  return (
    <section className="card-shadow flex grow flex-col rounded-2xl bg-gray-0 dark:bg-gray-800 md:mt-6">
      <TabRouteNavigationInner
        menuItems={menuItems}
        translationObjectName="common"
      />
      {children}
    </section>
  )
}
