"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Text } from "rizzui/typography";



import { Badge, Input, Select } from "@/components/ui";
import { evaluationCriteriaItemRowsAtom } from "@/modules/scm/store/global-store-state";
import { ScoreOptions } from "../option-field";
import { GetMenuListStyles } from "@/modules/scm/utils/select-options";





interface ColumnProps {
    isFieldDisabled: boolean
    onDelete: (index: number) => void
    setValue: (field: string, value: any) => void
}

export const useEvaluationCriteriaColumns = ({
    isFieldDisabled,
    onDelete,
}: ColumnProps) => {
    const t = useTranslations("form")

    const [, setEvaluationCriteriaItemRows] = useAtom(evaluationCriteriaItemRowsAtom)

    const baseColumns = [
        {
            id: "id",
            header: "SN",
            accessorKey: "id",
            cell: (props: any) => (
                <Text className="font-medium text-gray-900 dark:text-gray-0">
                    {props.row.index + 1}
                </Text>
            ),
        },
    ]

    const viewColumns = [
        {
            id: "criteriaName",
            header: t("form-criteria-name"),
            accessorKey: "criteriaName",
            cell: (props: any) => <Text className="text-title">{props.value}</Text>,
        },
        {
            id: "score",
            header: t("form-score"),
            accessorKey: "score",
            cell: (props: any) => <Text className="text-title">{props.value}</Text>,
        },
    ]

    const editColumns = [
        {
            id: "criteriaName",
            header: t("form-criteria-name"),
            accessorKey: "criteriaName",
            cell: (props: any) => (
                <Input
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    disabled={isFieldDisabled}
                />
            ),
        },
        {
            id: "score",
            header: t("form-score"),
            accessorKey: "score",
            cell: (props: any) => (
                <Select
                    labelClassName="text-title"
                    options={ScoreOptions}
                    value={
                        ScoreOptions.find((option) => option.value === props.value) || null
                    }
                    onChange={(selectedValue: any) => {
                        setEvaluationCriteriaItemRows((prev) => {
                            const newRows = [...prev]
                            newRows[props.row.index] = {
                                ...newRows[props.row.index],
                                score: selectedValue.value,
                            }
                            return newRows
                        })
                        return props.table.options.meta?.updateData(
                            props.row.index,
                            "score",
                            selectedValue.value
                        )
                    }}
                    placeholder={t("form-score")}
                    menuPortalTarget={document.body}
                    styles={GetMenuListStyles(ScoreOptions.length)}
                />
            ),
        },
        {
            id: "actions",
            header: "",
            accessorKey: "actions",
            cell: (props: any) => {
                if (isFieldDisabled) {
                    return null
                }
                return (
                    <Badge
                        variant="flat"
                        color="danger"
                        rounded="lg"
                        className="cursor-pointer"
                        onClick={() => {
                            onDelete(props.row.index)
                            setEvaluationCriteriaItemRows((prev) => {
                                const newRows = [...prev]
                                newRows.splice(props.row.index, 1)
                                return newRows
                            })
                        }}>
                        {t("form-delete")}
                    </Badge>
                )
            },
        },
    ]

    return [...baseColumns, ...(isFieldDisabled ? viewColumns : editColumns)]
}