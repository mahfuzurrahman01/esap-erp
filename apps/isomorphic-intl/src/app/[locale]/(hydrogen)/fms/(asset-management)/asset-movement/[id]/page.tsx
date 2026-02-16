import EyeIcon from "@/components/icons/eye"
import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditAssetMovementForm from "@/modules/fms/components/containers/asset-movement/create-edit-asset-movement-form"

export const metadata = {
  ...metaObject("View Asset Movement"),
}

const pageHeader = {
  title: "text-asset-movement",
  breadcrumb: [
    {
      href: routes.fms.assetMovement,
      name: "text-asset",
    },
    {
      name: "text-view-asset-movement",
    },
  ],
}

export default async function AssetDetailsPage(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.editAssetMovement(params.id)}
            title="text-edit"
            icon={<EyeIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <CreateEditAssetMovementForm id={params.id} mode="view" />
    </>
  )
}
