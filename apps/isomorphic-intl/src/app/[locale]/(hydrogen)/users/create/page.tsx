import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import UserEditComponent from "@/modules/crm/components/templates/users/edit"

export const metadata = {
  ...metaObject("Create User"),
}

const pageHeader = {
  title: "text-create-user",
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
      name: "text-create",
    },
  ],
}

export default async function UserProfile(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <UserEditComponent id={params.id} mode="create" />
    </>
  )
}
