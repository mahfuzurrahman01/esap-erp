import Link from "next/link"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

type Props = {
  className?: string
  isEditForm?: boolean
  isLoading?: boolean
  disabled?: boolean
}

const PayslipFormStickyActions = ({
  className,
  isEditForm = false,
  isLoading = false,
  disabled = false,
}: Props) => {
  const t = useTranslations("form")
  return (
    <div
      className={cn(
        "divider-color sticky bottom-0 box-border flex h-[76px] w-auto justify-end gap-2 rounded-b-2xl border-t border-dashed bg-gray-0 px-5 py-6 dark:bg-gray-800",
        className
      )}>
      <div className="flex gap-2">
        <Link href={routes.hr.payslip}>
          <Button type="button" className="h-9 w-auto" variant="outline">
            {t("form-back-to-list")}
          </Button>
        </Link>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={disabled}
          className="h-9 w-auto">
          {isEditForm ? t("form-save-changes") : t("form-submit")}
        </Button>
      </div>
    </div>
  )
}

export default PayslipFormStickyActions
