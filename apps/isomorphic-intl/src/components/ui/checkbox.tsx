"use client"

import { Checkbox as CheckboxPro, CheckboxProps } from "react-checkbox-pro"

import { cn } from "@/utils/cn"
import { ReactNode } from "react"

interface CheckboxProProps extends CheckboxProps {
  label?: ReactNode
}

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  size = "md",
  labelPlacement = "right",
  radius = "md",
  color = "primary",
  labelClassName,
  helperText,
}: CheckboxProProps) {
  return (
    <CheckboxPro
      className="border-gray-500/20 bg-transparent hover:checked:bg-primary focus:ring-0 focus:ring-offset-0 checked:focus:bg-primary disabled:cursor-not-allowed disabled:text-gray-500/20"
      labelClassName={cn("text-sm text-title", labelClassName)}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      labelPlacement={labelPlacement}
      helperText={helperText}
      size={size}
      radius={radius}
      color={color}
    >
      {label}
    </CheckboxPro>

  )
}
