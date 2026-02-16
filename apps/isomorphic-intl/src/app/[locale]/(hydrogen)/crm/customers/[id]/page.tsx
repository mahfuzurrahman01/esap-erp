import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CustomerDetailsTemplate from "@/modules/crm/components/templates/customers/view"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Customer Details"),
}

const pageHeader = {
  title: "text-customer-details",
  breadcrumb: [
    {
      href: routes.crm.dashboard,
      name: "text-sales",
    },
    {
      href: routes.crm.customers,
      name: "text-customers",
    },
    {
      name: "text-profile",
    },
  ],
}

export default async function CustomerProfile(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.editCustomer(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <CustomerDetailsTemplate id={params.id} />
      </div>
    </>
  )
}
