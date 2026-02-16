"use client"

import React, { ReactNode, forwardRef, useState } from "react"

import ReactSelect, { Props as ReactSelectProps } from "react-select"
import { tv } from "tailwind-variants"

import { cn } from "@/utils/cn"

import { CaretDownIcon } from "../icons/caret-down"

const selectStyles = tv({
  slots: {
    wrapper: "relative",
    label:
      "block text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200 mb-2 [&[data-required=true]]:after:content-['*'] [&[data-required=true]]:after:ml-1 [&[data-required=true]]:after:text-orange-500",
    container: "relative",
    control: [
      "flex !min-h-10 w-full rounded-md border border-body/20 bg-transparent ps-3 pe-2",
      "text-sm text-gray-900 dark:text-white placeholder:text-muted",
      "hover:border-primary focus-within:border-primary focus-within:ring-0",
      "transition-colors duration-200",
    ],
    menu: [
      "absolute !z-[9999] w-full min-w-[8rem] max-h-40 rounded-md border border-transparent",
      "bg-paper dropdown-gr card-shadow",
      "mt-1",
    ],
    option: [
      "relative flex cursor-pointer select-none items-center px-3 py-2",
      "text-sm text-gray-900 dark:text-white",
      "hover:bg-gray-100 dark:hover:bg-gray-700",
      "focus:bg-gray-100 dark:focus:bg-gray-700",
      "active:bg-gray-200 dark:active:bg-gray-600",
    ],
    placeholder: "text-gray-500/70",
    singleValue: "text-gray-900 dark:text-white",
    multiValue: [
      "bg-gray-100 dark:bg-gray-700 rounded-md mr-1 py-0.5 px-2",
      "text-sm text-gray-900 dark:text-white",
    ],
    multiValueRemove: [
      "hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md ml-1",
      "text-gray-500 hover:text-red-600 dark:hover:text-red-400",
    ],
    clearIndicator:
      "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1",
    dropdownIndicator:
      "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1",
    indicatorSeparator: "bg-body/20",
  },
  variants: {
    hasError: {
      true: {
        control:
          "!border-red-500 hover:!border-red-600 focus-within:!border-red-600",
        label: "!text-red-500",
      },
    },
    isDisabled: {
      true: {
        control: [
          "!bg-gray-500/10 dark:!bg-gray-500/10 border-transparent",
          "!cursor-not-allowed",
          "[&>*]:!cursor-not-allowed",
          "!text-muted dark:!text-muted",
        ],
      },
    },
  },
})

export interface ExtendedSelectProps extends Omit<ReactSelectProps, "theme"> {
  label?: ReactNode | string
  error?: string
  labelClassName?: string
  containerClassName?: string
  controlClassName?: string
  showAddNewOption?: boolean
  isRequired?: boolean
  onSearch?: (query: string) => void
}

const Select = forwardRef<any, ExtendedSelectProps>(
  (
    {
      className,
      label,
      error,
      labelClassName,
      containerClassName,
      controlClassName,
      isDisabled,
      showAddNewOption,
      isMulti,
      isRequired,
      onSearch,
      ...props
    },
    ref
  ) => {
    const {
      wrapper,
      label: labelStyle,
      container,
      control,
      menu,
      option,
      placeholder,
      singleValue,
      multiValue,
      multiValueRemove,
      clearIndicator,
      dropdownIndicator,
      indicatorSeparator,
    } = selectStyles({
      hasError: !!error,
      isDisabled,
    })

    const options = props.options || []
    const addNewOption = showAddNewOption
      ? { label: "Add New", value: 0 }
      : null

    return (
      <div className={wrapper({ class: className })}>
        {label && (
          <label
            className={cn(labelStyle(), labelClassName)}
            data-required={isRequired}>
            {label}
          </label>
        )}
        <div className={cn(container(), containerClassName)}>
          <ReactSelect
            ref={ref}
            isDisabled={isDisabled}
            isMulti={isMulti}
            onInputChange={(newValue) => {
              if (onSearch) {
                onSearch(newValue);
              }
            }}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: isDisabled
                ? () => null
                : () => <CaretDownIcon className="size-5 text-gray-400" />,
            }}
            styles={{
              menuList: (base: any) => ({
                ...base,
                maxHeight: options.length > 4 ? "160px" : undefined,
                overflow: "auto",
              }),
            }}
            classNames={{
              control: () => cn(control(), controlClassName),
              menu: () => menu(),
              menuPortal: () => menu(),
              option: () => option(),
              placeholder: () => placeholder(),
              singleValue: () => singleValue(),
              multiValue: () => multiValue(),
              multiValueRemove: () => multiValueRemove(),
              clearIndicator: () => clearIndicator(),
              dropdownIndicator: () => dropdownIndicator(),
              indicatorSeparator: () => indicatorSeparator(),
            }}
            unstyled
            options={addNewOption ? [...options, addNewOption] : options}
            {...props}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      </div>
    )
  }
)

Select.displayName = "Select"

export default Select