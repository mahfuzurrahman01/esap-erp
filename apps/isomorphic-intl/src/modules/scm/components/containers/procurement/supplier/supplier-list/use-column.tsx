"use client"

import Link from "next/link"
import { useMemo } from "react"

import AvatarCard from "@core/ui/avatar-card"
import { createColumnHelper } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import ListPopover from "@/components/base/list-popover"
import EyeIcon from "@/components/icons/eye"
import PencilIcon from "@/components/icons/pencil"
import ContractIcon from "@/components/icons/scm/contract-icon"
import { GeneratePoIcon } from "@/components/icons/scm/generate-po-icon"
import TrashIcon from "@/components/icons/trash"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"

const columnHelper = createColumnHelper<Supplier>()

export const useSupplierColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")
  const { hasAnyRole } = useCurrentRole()
  const isDeleteVisible = hasAnyRole(["Super Admin", "SCM Admin"])

  const columns = useMemo(() => {
    const companyName = t("form-company-name")
    const contactPerson = t("form-full-name")
    const industryCategory = t("form-industry-category")
    const location = t("form-company_address-country")
    const contactNumber = t("form-contact-number")
    const contactEmail = t("form-contact-email")
    // const companyWebsite = t("form-company-website")
    const companyAddress = t("form-company-address")
    const street = t("form-street")
    const city = t("form-city")
    const state = t("form-state")
    const zipCode = t("form-zip-code")

    return [
      columnHelper.accessor("id", {
        id: "id",
        size: 300,
        header: ({ table }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select all rows"
              checked={table.getIsAllPageRowsSelected()}
              onChange={() => table.toggleAllPageRowsSelected()}
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-500">
              {companyName}
            </Text>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              className="h-[18px] w-[18px]"
              inputClassName="w-[18px] h-[18px] border-gray-600 dark:border-gray-500"
              iconClassName="w-[18px] h-[18px]"
            />
            <AvatarCard
              src={row.original.imageUrl as string}
              name={row.original.companyName || "-"}
              className="ml-2"
            />
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor((row) => `${row.supplierName}`, {
        id: "supplierName",
        size: 240,
        header: contactPerson,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("categoryName", {
        id: "categoryName",
        size: 240,
        header: industryCategory,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("countryName", {
        id: "countryName",
        size: 240,
        header: location,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("contactNumber", {
        id: "contactNumber",
        size: 240,
        header: contactNumber,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("contactEmail", {
        id: "contactEmail",
        size: 240,
        header: contactEmail,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("companyAddress", {
        id: "companyAddress",
        size: 240,
        header: companyAddress,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("street", {
        id: "street",
        size: 240,
        header: street,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("city", {
        id: "city",
        size: 240,
        header: city,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("state", {
        id: "state",
        size: 240,
        header: state,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("zipCode", {
        id: "zipCode",
        size: 140,
        header: zipCode,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("id", {
        id: "action",
        size: 60,
        header: "",
        enablePinning: true,
        enableSorting: false,
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end">
            <ListPopover>
              <Link
                href={routes.scm.procurement.suppliers.editSupplier(
                  row.original.id ?? ""
                )}
                aria-label="View Supplier"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <PencilIcon className="h-4 w-4" />
                {tableT("table-text-edit")}
              </Link>
              <Link
                href={routes.scm.procurement.suppliers.supplierDetails(
                  row.original.id ?? ""
                )}
                aria-label="Edit Supplier"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <EyeIcon className="h-4 w-4" />
                {tableT("table-text-view")}
              </Link>
              <Link
                href={routes.scm.procurement.suppliers.contract(
                  row.original.id ?? ""
                )}
                aria-label="Contract"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <ContractIcon className="h-4 w-4" />
                {tableT("table-text-contract")}
              </Link>
              <Link
                href={routes.scm.supplierRelationship.evaluationHistory.createEvaluationHistory(
                  Number(row.original.id)
                )}
                aria-label="Create Evaluation"
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-gray-500/10">
                <GeneratePoIcon className="h-4 w-4" />
                {tableT("table-text-create-evaluation")}
              </Link>
              {
                isDeleteVisible && (
                  <Button
                    size="sm"
                    variant="text"
                    color="danger"
                    className="h-7 w-full justify-start gap-2 !px-2.5 font-semibold text-title hover:bg-red/20 hover:text-red"
                onClick={() => {
                  meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
                }}>
                <TrashIcon className="h-4 w-4" />
                  {tableT("table-text-delete")}
                </Button>
              )}
            </ListPopover>
          </div>
        ),
      }),
    ]
  }, [t, tableT])
  return columns
}
