"use client"

import React, { ReactNode, forwardRef } from "react"

import { Input as RizzInput, InputProps as RizzInputProps } from "rizzui"
import { tv } from "tailwind-variants"

import { cn } from "@/utils/cn"

const inputStyles = tv({
  slots: {
    wrapper: "relative",
    label:
      "block text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200 mb-2 relative [&.required]:after:content-['*'] [&.required]:after:ml-1 [&.required]:after:text-orange-500",
    input:
      "border-body/20 hover:border-title focus:border focus:ring-0 ring-0 text-title [&.is-focus]:ring-0",
    error: "text-xs text-red-500 mt-1",
  },
  variants: {
    hasError: {
      true: {
        input: "border-red-500 hover:border-red-600 focus:border-red-600",
        label: "!text-red-500",
      },
    },
    disabled: {
      true: {
        input:
          "!border-transparent !bg-gray-500/10 text-title cursor-not-allowed hover:!border-transparent",
      },
    },
  },
})

export interface ExtendedInputProps extends Omit<RizzInputProps, "variant"> {
  label?: ReactNode | string
  error?: string
  labelClassName?: string
  inputClassName?: string
  isRequired?: boolean
}

const Input = forwardRef<HTMLInputElement, ExtendedInputProps>(
  (
    {
      className,
      label: labelText,
      labelClassName,
      inputClassName,
      error,
      disabled,
      isRequired,
      ...props
    },
    ref
  ) => {
    const {
      wrapper,
      label,
      input,
      error: errorStyle,
    } = inputStyles({
      hasError: !!error,
      disabled: !!disabled,
    })

    const combinedLabelClassName = cn(label(), labelClassName)
    const combinedInputClassName = cn(input(), inputClassName)

    return (
      <div className={wrapper({ class: className })}>
        <RizzInput
          ref={ref}
          label={labelText}
          labelClassName={cn(combinedLabelClassName, isRequired && "required")}
          inputClassName={combinedInputClassName}
          errorClassName={errorStyle()}
          error={error}
          disabled={disabled}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
