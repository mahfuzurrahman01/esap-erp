"use client"

import { useCallback } from "react"

import { useQueryState } from "nuqs"

interface QueryParam<T> {
  key: keyof T
  defaultValue: T[keyof T]
  parse?: (value: string | null) => T[keyof T]
}

interface UseQueryParamsProps<T> {
  params: QueryParam<T>[]
}

export function useQueryParams<T extends Record<string, any>>({
  params,
}: UseQueryParamsProps<T>) {
  // Create a state hook for each param at the top level
  const queryStates = params.reduce(
    (acc, param) => {
       
      const [value, setValue] = useQueryState(param.key as string, {
        defaultValue: param.defaultValue,
        parse: param.parse || ((value) => value || param.defaultValue),
      })

      // @ts-ignore
      acc[param.key] = {
        value,
        setValue,
      }

      return acc
    },
    {} as Record<
      keyof T,
      { value: T[keyof T]; setValue: (value: T[keyof T]) => Promise<void> }
    >
  )

  // Create the params object from the state values
  const currentParams = Object.keys(queryStates).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = queryStates[key].value
    return acc
  }, {} as T)

  // Update function that handles multiple param updates
  const updateParams = useCallback(
    async (newParams: Partial<T>) => {
      const updates = Object.entries(newParams).map(([key, value]) => {
        const setter = queryStates[key]?.setValue
        if (setter) {
          return setter(value)
        }
        return Promise.resolve()
      })
      await Promise.all(updates)
    },
    [queryStates]
  )

  return {
    params: currentParams,
    updateParams,
  }
}
