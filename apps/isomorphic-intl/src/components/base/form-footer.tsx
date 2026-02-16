import cn from "@core/utils/class-names"

import { Button } from "@/components/ui"
import type { ButtonProps } from "@/components/ui/button"

interface FormFooterProps {
  className?: string
  altBtnText?: string
  altBtnColor?: ButtonProps["color"]
  submitBtnText?: string
  isLoading?: boolean
  isDisabled?: boolean
  handleAltBtn?: () => void
}

export default function FormFooter({
  isLoading,
  altBtnText,
  altBtnColor = "black",
  submitBtnText = "Submit",
  className,
  handleAltBtn,
  isDisabled,
}: FormFooterProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 box-border flex h-[76px] w-auto justify-end gap-2 rounded-b-2xl border-t border-dashed border-gray-500/20 bg-gray-0 px-5 py-6 dark:bg-gray-800",
        className
      )}>
      {altBtnText && (
        <Button
          variant="outline"
          color={altBtnColor}
          className="w-full @xl:w-auto"
          onClick={handleAltBtn}>
          {altBtnText}
        </Button>
      )}
      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full @xl:w-auto"
        disabled={isDisabled}>
        {submitBtnText}
      </Button>
    </div>
  )
}
