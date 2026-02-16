"use client";

import { useEffect, useState } from "react";



import { Text } from "rizzui";



import { Input } from "@/components/ui";





type RangeCapacityFieldTypes = {
  label?: string
  value: string[];
  onChange: ([]: string[]) => void;
  onClear?: () => void
}

export default function RangeCapacityField({
  label = "Capacity",
  value,
  onChange,
}: RangeCapacityFieldTypes) {
  const [minCapacity, setMinCapacity] = useState(value[0] ?? "")
  const [maxCapacity, setMaxCapacity] = useState(value[1] ?? "")

  function handleMinCapacity(value: string) {
    setMinCapacity(() => value)
    onChange([value, maxCapacity])
  }

  function handleMaxCapacity(value: string) {
    setMaxCapacity(() => value)
    onChange([minCapacity, value])
  }


  function handleClearMin() {
    setMinCapacity("")
    onChange(["", maxCapacity])
  }

  function handleClearMax() {
    setMaxCapacity("")
    onChange([minCapacity, ""])
  }

  useEffect(() => {
    setMinCapacity(value[0] || "")
    setMaxCapacity(value[1] || "")
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
          inputClassName="w-24 h-10 border-gray-500/20 placeholder:text-gray-500 dark:placeholder:text-gray-600"
          type="number"
          placeholder="0"
          min={0}
          value={minCapacity}
          onChange={(event) => handleMinCapacity(event.target.value)}
          onClear={handleClearMin}
        />
        <Text as="span" className="mx-1.5 h-0.5 w-3 bg-gray-500" />
        <Input
          min={Number(minCapacity)}
          inputClassName="w-24 h-10 border-gray-500/20 placeholder:text-gray-500 dark:placeholder:text-gray-600"
          type="number"
          placeholder="100"
          value={maxCapacity}
          onChange={(event) => handleMaxCapacity(event.target.value)}
          disabled={minCapacity.length > 0 ? false : true}
          onClear={handleClearMax}
        />
      </div>
    </div>
  )
}