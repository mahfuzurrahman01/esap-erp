import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditTermsAndConditionsForm from "@/modules/fms/components/containers/terms-and-conditions/create-edit-terms-and-conditions-form"

export const metadata = {
  ...metaObject("View Terms and Conditions"),
}

const pageHeader = {
  title: "text-view-terms-and-conditions",
  breadcrumb: [
    {
      href: routes.fms.termsAndConditions,
      name: "text-terms-and-conditions",
    },
    {
      name: "text-view-terms-and-conditions",
    },
  ],
}

export default async function TermsAndConditionsDetailsPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.editTermsAndConditions(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <CreateEditTermsAndConditionsForm id={params.id} mode="view" />
    </>
  )
}
