import PageHeader from "@/components/base/page-header"
import EyeIcon from "@/components/icons/eye"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditAssetRepairForm from "@/modules/fms/components/containers/asset-repair/create-edit-asset-repair-form"

export const metadata = {
  ...metaObject("View Asset Repair"),
}

const pageHeader = {
  title: "text-asset-repair",
  breadcrumb: [
    {
      href: routes.fms.assetRepair,
      name: "text-asset-repair",
    },
    {
      name: "text-view-asset-repair",
    },
  ],
}

export default async function AssetRepairDetailsPage(
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
            href={routes.fms.editAssetRepair(params.id)}
            title="text-edit"
            icon={<EyeIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <CreateEditAssetRepairForm id={params.id} mode="view" />
    </>
  )
}
