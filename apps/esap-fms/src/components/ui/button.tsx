import React from "react"

import { Button as RizzButton, ButtonProps as RizzButtonProps } from "rizzui"
import { type VariantProps, tv } from "tailwind-variants"

const button = tv({
  base: "font-bold transition-colors",
  variants: {
    variant: {
      solid: "",
      flat: "",
      outline: "",
      text: "",
    },
    color: {
      black: "",
      default: "",
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
      info: "",
    },
    size: {
      xm: "h-6 px-2",
      sm: "h-8 px-3",
      md: "h-9 px-3",
      lg: "h-12 px-4",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "black",
      class:
        "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200",
    },
    {
      variant: "solid",
      color: "primary",
      class: "bg-primary text-white hover:bg-primary-dark hover:text-gray-0",
    },
    {
      variant: "solid",
      color: "secondary",
      class:
        "bg-secondary text-white hover:bg-secondary-dark hover:text-gray-0",
    },
    {
      variant: "solid",
      color: "success",
      class: "bg-green text-white hover:bg-green-dark hover:text-gray-0",
    },
    {
      variant: "solid",
      color: "warning",
      class: "bg-orange text-white hover:bg-orange-dark hover:text-gray-0",
    },
    {
      variant: "solid",
      color: "danger",
      class: "bg-red text-white hover:bg-red-dark hover:text-gray-0",
    },
    {
      variant: "solid",
      color: "info",
      class: "bg-blue text-white hover:bg-blue-dark hover:text-gray-0",
    },
    {
      variant: "flat",
      color: "black",
      class:
        "bg-gray-200 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    },
    {
      variant: "flat",
      color: "primary",
      class:
        "bg-primary/20 text-primary hover:bg-primary-dark hover:text-gray-0",
    },
    {
      variant: "flat",
      color: "secondary",
      class:
        "bg-secondary/20 text-secondary hover:bg-secondary-dark hover:text-gray-0",
    },
    {
      variant: "flat",
      color: "success",
      class:
        "bg-green/40 text-green-700 hover:bg-green/50 hover:text-green-800 dark:bg-green-400 dark:text-green-700",
    },
    {
      variant: "flat",
      color: "warning",
      class: "bg-orange/20 text-orange hover:bg-orange-dark hover:text-gray-0",
    },
    {
      variant: "flat",
      color: "info",
      class: "bg-blue/20 text-blue hover:bg-blue-dark hover:text-gray-0",
    },
    {
      variant: "outline",
      color: "black",
      class:
        "border border-gray-500/40 text-title hover:bg-gray-100 dark:hover:bg-gray-900",
    },
    {
      variant: "outline",
      color: "primary",
      class:
        "border border-primary text-primary hover:bg-primary-dark hover:text-gray-0",
    },
    {
      variant: "outline",
      color: "secondary",
      class:
        "border border-secondary text-secondary hover:bg-secondary-dark hover:text-gray-0 ",
    },
    {
      variant: "outline",
      color: "success",
      class:
        "border border-green text-green hover:bg-green-dark hover:text-gray-0",
    },
    {
      variant: "outline",
      color: "warning",
      class:
        "border border-orange text-orange hover:bg-orange-dark hover:text-gray-0",
    },
    {
      variant: "outline",
      color: "info",
      class:
        "border border-blue text-blue hover:bg-blue-dark hover:text-gray-0",
    },
    {
      variant: "outline",
      color: "danger",
      class: "border border-red text-red hover:bg-red-dark hover:text-gray-0",
    },
    {
      variant: "text",
      color: "black",
      class:
        "text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800",
    },
    {
      variant: "text",
      color: "primary",
      class: "text-primary hover:bg-primary-dark hover:text-gray-0",
    },
    {
      variant: "text",
      color: "secondary",
      class: "text-secondary hover:bg-secondary-dark hover:text-gray-0",
    },
    {
      variant: "text",
      color: "success",
      class: "text-green hover:bg-green-dark hover:text-gray-0",
    },
    {
      variant: "text",
      color: "warning",
      class: "text-orange hover:bg-orange-dark hover:text-gray-0",
    },
    {
      variant: "text",
      color: "info",
      class: "text-blue hover:bg-blue-dark hover:text-gray-0",
    },
    {
      variant: "text",
      color: "danger",
      class: "text-red hover:bg-red-dark hover:text-gray-0",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "black",
    size: "md",
  },
})

type ButtonVariants = VariantProps<typeof button>

export interface ButtonProps
  extends Omit<RizzButtonProps, "size" | "color">,
    ButtonVariants {
  color?: ButtonVariants["color"]
  size?: ButtonVariants["size"]
}

export default function Button({
  children,
  color,
  rounded = "lg",
  size = "md",
  variant,
  className,
  ...props
}: ButtonProps) {
  const isBlackVariant = color === "black"
  const buttonClasses = button({
    color: isBlackVariant ? "black" : color,
    size,
    variant,
    className,
  })

  return (
    <RizzButton
      className={buttonClasses}
      color={isBlackVariant ? undefined : (color as RizzButtonProps["color"])}
      rounded={rounded}
      {...props}
      variant={variant}>
      {children}
    </RizzButton>
  )
}
