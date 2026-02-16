import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditAssetMaintenanceForm from "@/modules/fms/components/containers/asset-maintenance/create-edit-asset-maintenance-form"

export const metadata = {
  ...metaObject("View Asset Maintenance"),
}

const pageHeader = {
  title: "text-asset-maintenance",
  breadcrumb: [
    {
      href: routes.fms.assetMaintenance,
      name: "text-asset-maintenance",
    },
    {
      name: "text-view-asset-maintenance",
    },
  ],
}

export default async function AssetMaintenanceDetailsPage(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.editAssetMaintenance(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <CreateEditAssetMaintenanceForm id={params.id} mode="view" />
    </>
  )
}
