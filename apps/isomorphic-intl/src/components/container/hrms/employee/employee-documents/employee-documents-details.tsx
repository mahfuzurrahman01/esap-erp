import { useTranslations } from "next-intl"

import { EmployeeDetailsGroupContainer } from "@/components/container/hrms/employee/employee-details-group"
import { Button } from "@/components/ui"

type Props = {
  documents: any[]
}

const EmployeeDocumentsDetails = ({ documents }: Props) => {
  const t = useTranslations("hrms")
  const tCommon = useTranslations("common")

  return (
    <section id="documents">
      <EmployeeDetailsGroupContainer title={t("text-documents")}>
        <div className="flex max-w-[40rem] flex-col gap-4 p-6">
          {documents.map((document) => (
            <div
              className="group flex items-center justify-between gap-4 rounded-lg border px-4 py-2"
              key={document.id}>
              <span className="typography-primary line-clamp-1 text-sm font-medium">
                {document.fileName}
              </span>
              <Button
                variant="text"
                type="button"
                color="primary"
                className="group-hover:text-primary">
                {tCommon("text-download")}
              </Button>
            </div>
          ))}
        </div>
      </EmployeeDetailsGroupContainer>
    </section>
  )
}

export default EmployeeDocumentsDetails
