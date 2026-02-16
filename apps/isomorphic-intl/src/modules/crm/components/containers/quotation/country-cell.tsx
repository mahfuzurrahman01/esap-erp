import { useCountryById } from '@/modules/fms/hooks/use-country'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Text } from "rizzui"

export default function CountryCell({ countryId }: { countryId: number }) {
    const tableT = useTranslations("table")
    const { data: countryData, isLoading, error } = useCountryById(countryId)
    if (error)
    return (
        <span className="font-medium text-gray-900 dark:text-gray-0">
        ...
        </span>
    )
    if (isLoading)
    return (
        <span className="font-medium text-gray-900 dark:text-gray-0">
        {tableT("table-text-loading")}
        </span>
    )
    const countryName = countryData?.countryName || "-"
    return (
    <span className="font-medium text-title">
        {countryName}
    </span>
    )
}
