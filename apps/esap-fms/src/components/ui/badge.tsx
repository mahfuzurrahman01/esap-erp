import React from "react"

import { Badge as RizzBadge, BadgeProps as RizzBadgeProps } from "rizzui"
import { type VariantProps, tv } from "tailwind-variants"

const badge = tv({
  base: "inline-flex items-center",
  variants: {
    color: {
      black: "",
      default: "",
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
      info: "",
      gray: "",
      emerald: "",
      babypink: "",
      purple: "",
      pending: "",
      error: "",
      secondaryerror: "",
    },
    variant: {
      solid: "",
      flat: "",
      outline: "",
    },
    size: {
      sm: "px-1.5 py-0.5",
      md: "px-2.5 py-1",
      lg: "px-3 py-1.5",
      xl: "px-3 py-2",
    },
  },
  compoundVariants: [
    {
      color: "black",
      variant: "solid",
      class:
        "bg-gray-800 text-gray-100 hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-300",
    },
    {
      color: "black",
      variant: "flat",
      class:
        "bg-gray-200 text-title hover:bg-gray-200 dark:bg-gray-100/20 dark:text-title dark:hover:bg-paper/20",
    },
    {
      color: "black",
      variant: "outline",
      class:
        "border border-gray-800 text-gray-800 hover:bg-gray-100 dark:border-gray-100 dark:text-gray-100 dark:hover:bg-gray-800",
    },
    {
      color: "emerald",
      variant: "solid",
      class:
        "bg-emerald-600 text-emerald-50 hover:bg-emerald-600 dark:bg-emerald-600 dark:text-emerald-50 dark:hover:bg-emerald-600",
    },
    {
      color: "emerald",
      variant: "flat",
      class:
        "bg-primary/15 text-primary-dark dark:text-primary-light",
    },
    {
      color: "emerald",
      variant: "outline",
      class:
        "border border-primary-dark text-primary-dark dark:text-primary-light",
    },
    {
      color: "gray",
      variant: "solid",
      class:
        "bg-gray-600 text-white",
    },
    {
      color: "gray",
      variant: "flat",
      class:
        "bg-gray-300 text-gray-700",
    },
    {
      color: "gray",
      variant: "outline",
      class:
        "border border-gray-600 text-gray-600 dark:text-gray-50",
    },
    {
      color: "babypink",
      variant: "solid",
      class:
        "bg-pink-500 text-pink-50",
    },
    {
      color: "babypink",
      variant: "flat",
      class:
        "bg-pink-200 text-pink-800",
    },
    {
      color: "babypink",
      variant: "outline",
      class:
        "border border-pink-800 text-pink-800 dark:text-pink-50",
    },
    {
      color: "primary",
      variant: "solid",
      class:
        "bg-primary text-white",
    },
    {
      color: "primary",
      variant: "flat",
      class:
        "bg-primary/15 text-primary-dark dark:text-primary",
    },
    {
      color: "primary",
      variant: "outline",
      class:
        "border border-primary-dark text-primary-dark dark:text-primary",
    },
    {
      color: "success",
      variant: "solid",
      class:
        "bg-green text-white",
    },
    {
      color: "success",
      variant: "flat",
      class:
        "bg-green/15 text-green-dark dark:text-green",
    },
    {
      color: "success",
      variant: "outline",
      class:
        "border border-green-dark text-green-dark dark:text-green",
    },
    {
      color: "info",
      variant: "solid",
      class:
        "bg-blue text-white",
    },
    {
      color: "info",
      variant: "flat",
      class:
        "bg-blue/15 text-blue-dark dark:text-blue",
    },
    {
      color: "info",
      variant: "outline",
      class:
        "border border-blue-dark text-blue-dark dark:text-blue",
    },
    {
      color: "pending",
      variant: "solid",
      class:
        "bg-red text-white",
    },
    {
      color: "pending",
      variant: "flat",
      class:
        "bg-red/15 text-red",
    },
    {
      color: "pending",
      variant: "outline",
      class:
        "border border-red text-red",
    },
    {
      color: "error",
      variant: "solid",
      class:
        "bg-red-dark text-white",
    },
    {
      color: "error",
      variant: "flat",
      class:
        "bg-red-300 text-red-dark",
    },
    {
      color: "error",
      variant: "outline",
      class:
        "border border-red-dark text-red-dark",
    },
    {
      color: "secondaryerror",
      variant: "solid",
      class:
        "bg-red text-white",
    },
    {
      color: "secondaryerror",
      variant: "flat",
      class:
        "bg-red-200 text-red-dark",
    },
    {
      color: "secondaryerror",
      variant: "outline",
      class:
        "border border-red text-red",
    },
    {
      color: "purple",
      variant: "solid",
      class:
        "bg-secondary text-white",
    },
    {
      color: "purple",
      variant: "flat",
      class:
        "bg-secondary/15 text-secondary-dark dark:text-secondary",
    },
    {
      color: "purple",
      variant: "outline",
      class:
        "border border-secondary text-secondary",
    },
  ],
  defaultVariants: {
    color: "black",
    variant: "solid",
    size: "md",
  },
})

type BadgeVariants = VariantProps<typeof badge>

export interface BadgeProps
  extends Omit<RizzBadgeProps, "color" | "size">,
  BadgeVariants {
  color?: BadgeVariants["color"]
  size?: BadgeVariants["size"]
}

export default function Badge({
  children,
  color = "black",
  variant,
  size,
  className,
  ...props
}: BadgeProps) {
  const isBlackVariant = color === "black"
  const badgeClasses = badge({
    color: isBlackVariant ? "black" : color,
    variant,
    size,
    className,
  })

  return (
    <RizzBadge
      className={badgeClasses}
      {...props}
      color={isBlackVariant ? undefined : (color as RizzBadgeProps["color"])}
      variant={variant}>
      {children}
    </RizzBadge>
  )
}
