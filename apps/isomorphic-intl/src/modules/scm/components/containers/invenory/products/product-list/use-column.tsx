"use client";

import Link from "next/link";
import { useMemo } from "react";



import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ActionIcon, Checkbox, Text, Tooltip } from "rizzui";



import DeletePopover from "@/components/base/delete-popover";
import { useDrawer } from "@/components/base/drawer-views/use-drawer";
import ViewIconButton from "@/components/base/view-icon-button";
import PencilIcon from "@/components/icons/pencil";
import { routes } from "@/config/routes";
import { Product } from "@/modules/scm/types/inventory/products/products-types";
import { formatDate } from "@/utils/format-date";



import ProductViewDrawer from "./product-view-drawer";
import { useCurrentRole } from "@/hooks/use-current-role";





const columnHelper = createColumnHelper<Product>()

export const useProductColumn = () => {
  const t = useTranslations("form")
  const tableT = useTranslations("table")

  const { openDrawer } = useDrawer()
  const { hasAnyRole } = useCurrentRole()
  const isAuthority = hasAnyRole(["Super Admin", "SCM Admin"])


  const columns = useMemo(
    () => [
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
              {t("form-product-name")}
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
            <Text className="ms-2 font-medium text-gray-900 dark:text-gray-0">
              {row.original.productName}
            </Text>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("productCategoryName", {
        id: "productCategoryName",
        size: 240,
        enableSorting: true,
        header: t("form-product-category"),
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("productCode", {
        id: "productCode",
        size: 240,
        header: t("form-product-code"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("productType", {
        id: "productType",
        size: 240,
        header: t("form-product-type"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("description", {
        id: "description",
        size: 240,
        header: t("form-description"),
        enableSorting: true,
        cell: (info) => {
          const rawText = info.renderValue() || "-"
          const textWithoutHtml = rawText.replace(/<[^>]*>/g, "")
          // const words = textWithoutHtml.split(" ")
          const truncatedText =
            textWithoutHtml.length > 20
              ? `${textWithoutHtml.substring(0, 20)}...`
              : textWithoutHtml

          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {truncatedText}
            </Text>
          )
        },
      }),
      columnHelper.accessor("cost", {
        id: "cost",
        size: 240,
        header: t("form-cost"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("sellingPrice", {
        id: "sellingPrice",
        size: 240,
        header: t("form-selling-price"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("purchasePrice", {
        id: "purchasePrice",
        size: 240,
        header: t("form-purchase-price"),
        enableSorting: true,
        cell: (info) => (
          <Text className="font-medium text-gray-900 dark:text-gray-0">
            {info.renderValue() || "-"}
          </Text>
        ),
      }),
      columnHelper.accessor("createdDate", {
        id: "createdDate",
        size: 240,
        header: t("form-created-date"),
        enableSorting: true,
        cell: ({ row }) => {
          const date = row.original.createdDate
            ? new Date(row.original.createdDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("updatedDate", {
        id: "updatedDate",
        size: 240,
        header: t("form-updated-date"),
        enableSorting: true,
        cell: ({ row }) => {
          const date = row.original.updatedDate
            ? new Date(row.original.updatedDate)
            : null
          return (
            <Text className="font-medium text-gray-900 dark:text-gray-0">
              {date ? formatDate(date, "DD/MM/YYYY") : "-"}
            </Text>
          )
        },
      }),
      columnHelper.accessor("avatarFile", {
        id: "action",
        size: 100,
        header: "",
        cell: ({
          row,
          table: {
            options: { meta },
          },
        }) => (
          <div className="flex items-center justify-end gap-3 pe-3">
            <Tooltip
              size="sm"
              content={tableT("table-text-edit")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Link
                href={routes.scm.inventory.products.editProduct(
                  Number(row.original.id)
                )}
                aria-label="go to stock edit">
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  rounded="lg"
                  className="h-6 w-7 border-gray-500/20">
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
            <ViewIconButton
              onClick={() => {
                openDrawer({
                  view: <ProductViewDrawer initialData={row.original} />,
                  placement: "right",
                  containerClassName: "overflow-auto",
                })
              }}
            />
           {
            isAuthority && (
               <DeletePopover
              title="table-text-delete"
              description={`Are you sure you want to delete this product #${row.original.id}?`}
              onDelete={() => {
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }}
            />
            )
           }
          </div>
        ),
      }),
    ],
    [t, tableT]
  )

  return columns
}