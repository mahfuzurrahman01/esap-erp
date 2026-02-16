import cn from "@core/utils/class-names"
import { IconType } from "react-icons/lib"
import { PiCircleNotch } from "react-icons/pi"

type Props = Omit<IconType, "size"> & {
  size?: number
  className?: string
}

const Spinner = ({ size = 32, className, ...props }: Props) => {
  return (
    <PiCircleNotch
      size={size}
      className={cn("animate-spin", className)}
      {...props}
    />
  )
}

export default Spinner
