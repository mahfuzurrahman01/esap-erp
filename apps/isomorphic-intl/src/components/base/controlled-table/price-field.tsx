"use client"

import { useEffect, useState } from "react"

import { Text } from "rizzui"

import { Input } from "@/components/ui"

type PriceFieldTypes = {
  label?: string
  value: string[]
  onChange: ([]: string[]) => void
  onClear?: () => void
}

export default function PriceField({
  label = "Amount",
  value,
  onChange,
  onClear,
}: PriceFieldTypes) {
  const [minPrice, setMinPrice] = useState(value[0] ?? "")
  const [maxPrice, setMaxPrice] = useState(value[1] ?? "")

  function handleMinPrice(value: string) {
    setMinPrice(() => value)
    onChange([value, maxPrice])
  }

  function handleMaxPrice(value: string) {
    setMaxPrice(() => value)
    onChange([minPrice, value])
  }

  function handleClearMin() {
    setMinPrice("")
    onChange(["", maxPrice])
  }

  function handleClearMax() {
    setMaxPrice("")
    onChange([minPrice, ""])
  }

  useEffect(() => {
    setMinPrice(value[0] || "")
    setMaxPrice(value[1] || "")
  }, [value])

  return (
    <div className="price-field flex items-center">
      <Text
        as="span"
        className="mr-2 whitespace-nowrap font-medium text-gray-500">
        {label}
      </Text>
      <div className="flex items-center">
        <Input
          prefix={"$"}
          inputClassName="w-24 h-10 border-gray-500/20 placeholder:text-gray-500 dark:placeholder:text-gray-600 min-w-auto"
          type="number"
          placeholder="0.00"
          min={0}
          value={minPrice}
          onChange={(event) => handleMinPrice(event.target.value)}
          onClear={handleClearMin}
        />
        <Text as="span" className="mx-1.5 h-0.5 w-3 bg-gray-500" />
        <Input
          prefix={"$"}
          min={Number(minPrice) || 0}
          inputClassName="w-24 h-10 border-gray-500/20 placeholder:text-gray-500 dark:placeholder:text-gray-600"
          type="number"
          placeholder="100.00"
          value={maxPrice}
          onChange={(event) => handleMaxPrice(event.target.value)}
          disabled={minPrice.length > 0 ? false : true}
          onClear={handleClearMax}
        />
      </div>
    </div>
  )
}
