"use client"

import { useParams } from "next/navigation"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useModal } from "@/components/base/modal-views/use-modal"
import PageHeader from "@/components/base/page-header"
import FileCardContainer from "@/components/container/hrms/file-management/files/file-card-container"
import FileUploadModal from "@/components/container/hrms/file-management/files/file-upload-modal"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-files",
  breadcrumb: [
    {
      href: routes.hr.folders,
      name: "text-folders",
    },
    {
      name: "text-files",
    },
  ],
}

const FilesPage = () => {
  const { folderId } = useParams()
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
              view: (
                <FileUploadModal
                  isOpen={true}
                  onClose={() => {}}
                  folderId={Number(folderId)}
                />
              ),
            })
          }>
          <PiPlusBold className="me-1.5 h-4 w-4" />
          {t("form-add-new")}
        </Button>
      </div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <FileCardContainer />
    </div>
  )
}

export default FilesPage
