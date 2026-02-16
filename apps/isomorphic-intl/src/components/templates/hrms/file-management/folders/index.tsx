"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useModal } from "@/components/base/modal-views/use-modal"
import PageHeader from "@/components/base/page-header"
import FolderCardContainer from "@/components/container/hrms/file-management/folders/folder-card-container"
import FolderFormModalView from "@/components/container/hrms/file-management/folders/folders-create-form-view"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-folders",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.folders,
      name: "text-folders",
    },
    {
      name: "text-list",
    },
  ],
}

const Folders = () => {
  const { openModal } = useModal()
  const t = useTranslations("form")
  return (
    <div>
      <div className="mt-6 flex justify-end md:mt-0">
        <Button
          type="button"
          color="black"
          onClick={() =>
            openModal({
              view: <FolderFormModalView isOpen={true} onClose={() => {}} />,
            })
          }>
          <PiPlusBold className="me-1.5 h-4 w-4" />
          {t("form-add-new")}
        </Button>
      </div>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <FolderCardContainer />
    </div>
  )
}

export default Folders
