import { useTranslations } from "next-intl"

import { Button } from "@/components/ui"

type Props = {
  handleCloseDrawer: () => void
  isLoading?: boolean
  isEditForm?: boolean
  onSubmit?: () => void
}

const DrawerFormActions = ({
  handleCloseDrawer,
  isLoading = false,
  isEditForm = false,
  onSubmit,
}: Props) => {
  const t = useTranslations("form")
  return (
    <div className="sticky bottom-0 box-border flex justify-end gap-2 border-t border-dashed border-gray-500/20 bg-white px-5 py-6 dark:bg-paper">
      <Button
        className="h-9 w-auto"
        variant="outline"
        onClick={handleCloseDrawer}>
        {t("form-cancel")}
      </Button>
      <Button
        type="submit"
        isLoading={isLoading}
        className="h-9 w-auto"
        onClick={onSubmit}>
        {isEditForm ? t("form-save-changes") : t("form-submit")}
      </Button>
    </div>
  )
}

export default DrawerFormActions