import { SVGProps } from "react"

import cn from "@core/utils/class-names"

type CaretDownIconProps = Omit<React.ComponentProps<'svg'>, "height" | "width"> & {
  className?: string
}

export const CaretDownIcon: React.FC<CaretDownIconProps> = ({
  className,
  ...props
}) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("size-5", className)}
    {...props}>
    <path
      fill="currentColor"
      d="M10 12.916a.83.83 0 0 1-.533-.191l-5-4.167a.834.834 0 0 1 1.067-1.283L10 11.008l4.467-3.6a.834.834 0 0 1 1.175.125.833.833 0 0 1-.117 1.217l-5 4.025a.83.83 0 0 1-.525.141"></path>
  </svg>
)
