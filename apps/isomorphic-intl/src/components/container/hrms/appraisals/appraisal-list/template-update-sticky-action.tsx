
import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui"

type Props = {
  onUpdate: () => void
  className?: string
  isEmployeeFeedback?: boolean
  isLoading?: boolean
}

const TemplateUpdateStickyActions = ({
  onUpdate,
  className,
  isEmployeeFeedback = true,
  isLoading = false,
}: Props) => {
  const t = useTranslations("form")
  return (
    <div
      className={cn(
        "divider-color sticky bottom-0 box-border flex h-[76px] w-auto justify-end gap-2 rounded-b-2xl border-t border-dashed bg-gray-0 px-5 py-6 dark:bg-gray-800",
        className
      )}>
      <div className="flex gap-2">
        {/* <Link href={routes.hr.appraisals}>
          <Button type="button" className="h-9 w-auto" variant="outline">
            {t("form-back-to-list")}
          </Button>
        </Link> */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="h-9 w-auto"
          onClick={onUpdate}>
          {isEmployeeFeedback
            ? t("form-save-employee-feedback")
            : t("form-save-manager-feedback")}
        </Button>
      </div>
    </div>
  )
}

export default TemplateUpdateStickyActions
