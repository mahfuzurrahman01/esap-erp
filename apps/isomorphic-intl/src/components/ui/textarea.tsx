"use client"

import React, { forwardRef, useState } from "react"

import cn from "@core/utils/class-names"
import {
  Textarea as RizzTextarea,
  TextareaProps as RizzTextareaProps,
} from "rizzui"
import { tv } from "tailwind-variants"

const textareaStyles = tv({
  slots: {
    wrapper: "relative",
    label: "block text-sm font-medium text-title",
    textarea:
      "border-body/20 text-title hover:border-title focus:border focus:border-title ring-0 [&.is-focus]:ring-0",
    helperText: "mt-1 text-xs text-gray-500 dark:text-gray-400",
  },
  variants: {
    floating: {
      true: {
        label:
          "absolute left-3 transition-all duration-200 pointer-events-none ring-0",
      },
      false: {
        label: "mb-2",
      },
    },
    isFloating: {
      true: {
        label:
          "transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] bg-background px-2 text-primary",
      },
      false: {
        label: "top-6 -translate-y-1/2",
      },
    },
    disabled: {
      true: {
        textarea:
          "!border-transparent !bg-gray-500/10 text-title cursor-not-allowed hover:!border-transparent",
      },
    },
  },
  compoundVariants: [
    {
      floating: false,
      isFloating: false,
      class: {
        label: "static transform-none",
      },
    },
  ],
})

export interface ExtendedTextareaProps
  extends Omit<RizzTextareaProps, "variant"> {
  label?: string
  helperText?: string
  variant?: RizzTextareaProps["variant"] | "floating"
  disabled?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, ExtendedTextareaProps>(
  (
    {
      variant,
      className,
      label: labelText,
      labelClassName,
      placeholder,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
    }

    const isFloating = variant === "floating" && (isFocused || hasValue)
    const showFloatingLabel = variant === "floating"

    const { wrapper, label, textarea } = textareaStyles({
      floating: showFloatingLabel,
      isFloating,
      disabled: !!disabled,
    })

    const combinedLabelClassName = cn(
      label(),
      isFloating ? labelClassName || "" : ""
    )

    return (
      <div className={wrapper()}>
        {labelText && <label className={label()}>{labelText}</label>}
        <RizzTextarea
          ref={ref}
          labelClassName={combinedLabelClassName}
          textareaClassName={textarea({ class: className })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={showFloatingLabel && !isFocused ? "" : placeholder}
          variant={variant === "floating" ? "outline" : variant}
          disabled={disabled}
          {...props}
        />
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export default Textarea
