"use client"

import { useRouter } from "next/navigation"

import { useTranslations } from "next-intl"

import ListPopover from "@/components/base/list-popover"
import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import CreateEditAssetForm from "@/modules/fms/components/containers/asset/create-edit-asset-form"
import { useAssetById } from "@/modules/fms/hooks/use-asset"

import TranslatableButton from "../../base/translatable-button"

interface AssetViewProps {
  id: number
  pageHeader: PageHeaderTypes
}

export default function AssetDetailsPage({ id, pageHeader }: AssetViewProps) {
  const t = useTranslations("common")
  const router = useRouter()
  const { data: assetById } = useAssetById(Number(id))

  const handleTransferAsset = () => {
    router.push(`${routes.fms.transferAsset(id)}`)
  }

  const handleRepairAsset = () => {
    router.push(`${routes.fms.repairAsset(id)}`)
  }

  const handleMaintainAsset = () => {
    router.push(`${routes.fms.maintainAsset(id)}`)
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ListPopover
            placement="bottom-end"
            triggerButton={
              <div>
                <Button variant="outline">{t("text-action")}</Button>
              </div>
            }>
            <Button
              size="sm"
              variant="text"
              className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-gray-500/10 dark:hover:bg-gray-500/10"
              onClick={handleTransferAsset}>
              {t("text-transfer-asset")}
            </Button>
            <Button
              size="sm"
              variant="text"
              className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-gray-500/10 dark:hover:bg-gray-500/10"
              onClick={() => {}}>
              {t("text-scrap-asset")}
            </Button>
            <Button
              size="sm"
              variant="text"
              className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-gray-500/10 dark:hover:bg-gray-500/10"
              onClick={handleRepairAsset}>
              {t("text-repair-asset")}
            </Button>
            {assetById?.isMaintenanceRequired === true && (
              <Button
                size="sm"
                variant="text"
                className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-gray-500/10 dark:hover:bg-gray-500/10"
                onClick={handleMaintainAsset}>
                {t("text-maintain-asset")}
              </Button>
            )}
            <Button
              size="sm"
              variant="text"
              className="h-7 w-full justify-start gap-2 font-semibold text-title hover:bg-gray-500/10 dark:hover:bg-gray-500/10"
              onClick={() => {}}>
              {t("text-adjust-asset-value")}
            </Button>
          </ListPopover> */}
          <TranslatableButton
            href={routes.fms.editAsset(id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
          {/* <Button onClick={() => router.back()}>{t("text-cancel")}</Button> */}
        </div>
      </PageHeader>
      <CreateEditAssetForm id={id} mode="view" />
    </>
  )
}
