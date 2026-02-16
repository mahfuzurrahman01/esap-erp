import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import UserDetailsTemplate from "@/modules/crm/components/templates/users/view"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Profile"),
}

const pageHeader = {
  title: "text-profile",
  breadcrumb: [
    {
      href: routes.crm.dashboard,
      name: "text-home",
    },
    {
      href: routes.crm.users,
      name: "text-users",
    },
    {
      name: "text-profile",
    },
  ],
}

export default async function UserProfile(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.editProfile(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div> */}
      </PageHeader>

      <div className="@container">
        <UserDetailsTemplate id={params.id} />
      </div>
    </>
  )
}
