"use client"

import Image from "next/image"

import { VariantProps, tv } from "tailwind-variants"

import AvatarIcon from "@/components/icons/avatar"
import { cn } from "@/utils/cn"

const avatar = tv({
  base: "relative flex justify-center items-center overflow-hidden align-middle z-0",
  variants: {
    color: {
      primary: "ring-primary bg-primary text-white",
      secondary: "ring-secondary bg-secondary text-white",
      info: "ring-info bg-info text-white",
      neutral: "ring-neutral bg-neutral text-white",
      error: "ring-error bg-error text-white",
      warning: "ring-warning bg-warning text-white",
      success: "ring-success bg-success text-white",
    },
    size: {
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
      xl: "size-12",
      "2xl": "size-14",
      "3xl": "size-16",
    },
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      full: "rounded-full",
      none: "rounded-none",
    },
    offset: {
      none: "ring-offset-0",
      sm: "ring-offset-1",
      md: "ring-offset-2",
      lg: "ring-offset-4",
      xl: "ring-offset-8",
    },
  },
  defaultVariants: {
    size: "xl",
    rounded: "full",
    color: "primary",
    offset: "md",
  },
})

type AvatarVariants = VariantProps<typeof avatar>

export interface AvatarProps extends AvatarVariants {
  isBorder?: boolean
  isDisabled?: boolean
  className?: string
  name?: string
  src?: string
  max?: number
  icon?: React.ReactNode
  showFallback?: boolean
}

export default function Avatar(props: AvatarProps) {
  const {
    className,
    icon,
    name,
    src,
    isBorder,
    isDisabled,
    max,
    showFallback = true,
  } = props

  const renderContent = () => {
    if (src) {
      return (
        <Image
          fill
          src={src}
          alt="Image"
          className="size-full max-w-full object-cover"
        />
      )
    }

    if (icon) {
      return icon
    }

    if (name) {
      return (
        <span
          aria-label={name}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium text-inherit"
          role="img">
          {max ? name.slice(0, max) : name}
        </span>
      )
    }

    if (showFallback) {
      return <AvatarIcon className="size-full" />
    }

    return null
  }

  return (
    <span
      className={cn(
        avatar(props),
        isBorder && "ring-2",
        isDisabled && "opacity-50",
        className
      )}>
      {renderContent()}
    </span>
  )
}
