import { useState } from "react"

import cn from "@core/utils/class-names"
import { type Table as ReactTableType } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { PiMagnifyingGlassBold, PiTextColumns } from "react-icons/pi"
import { useMedia } from "react-use"
import {
  ActionIcon,
  Badge,
  Button,
  Input,
  Popover,
  Text,
  Title,
} from "rizzui"

import FilterIcon from "@/components/icons/filter"
import { Checkbox } from "@/components/ui"

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>
  searchTerm: string | null
  setSearchTerm: (term: string) => void
  fetchTableData: (status: string | null, search: string | null) => void
}

export default function TableToolbar<TData extends Record<string, any>>({
  table,
  searchTerm,
  setSearchTerm,
  fetchTableData,
}: TableToolbarProps<TData>) {
  const t = useTranslations("table")
  // const isFiltered =
  //   table.getState().globalFilter || table.getState().columnFilters.length > 0
  const [filterEnabled, setFilterEnabled] = useState(false)
  const isMediumScreen = useMedia("(max-width: 1860px)", false)
  // const [status, setStatus] = useState("")

  // const handleStatusChange = (newStatus: any) => {
  //   setStatus(newStatus || "")
  //   fetchTableData(newStatus, searchTerm)
  // }

  const handleClear = () => {
    if (filterEnabled) {
      // //console.log("handleClear")
      // setStatus("")
      setSearchTerm("")
      fetchTableData("", "")
    }
    setFilterEnabled(!filterEnabled)
  }

  return (
    <div className="flex w-full items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Input
          type="search"
          placeholder="Search"
          value={searchTerm || ""}
          onClear={() => {
            setSearchTerm("")
            table.setGlobalFilter("")
          }}
          onChange={(e) => {
            // //console.log("e.target.value", e.target.value)
            setSearchTerm(e.target.value)
            table.setGlobalFilter(e.target.value)
          }}
          inputClassName="h-10 rounded-lg border-gray-500/20 ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-600"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
        {/* {filterEnabled && (
          <>
            <Select
              options={statusOptions}
              value={status}
              onChange={handleStatusChange}
              getOptionValue={(option: any) => option.value}
              placeholder="Status..."
              className={"w-32"}
            />
          </>
        )} */}
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={handleClear}
          className={cn(
            "h-[36px] rounded-lg border-gray-500/20 pe-3 ps-2.5 text-title dark:text-gray-0",
            !isMediumScreen && filterEnabled && "border-gray-500/20"
          )}>
          <FilterIcon className="me-1.5 h-[18px] w-[18px]" />
          {filterEnabled ? "Hide Filters" : "Show Filters"}
        </Button>

        {table && (
          <Popover shadow="sm" placement="bottom-end">
            <Popover.Trigger>
              <ActionIcon
                variant="outline"
                title={"Toggle Columns"}
                className="h-auto w-auto rounded-lg border-gray-500/20 p-1 px-3 text-title dark:text-gray-0">
                <PiTextColumns strokeWidth={3} className="size-6" />
              </ActionIcon>
            </Popover.Trigger>
            <Popover.Content className="card-shadow relative z-0 overflow-hidden rounded-lg border-transparent bg-paper before:absolute before:-end-4 before:-top-4 before:size-[80px] before:rounded-full before:bg-blue/50 before:blur-[80px] after:absolute after:-bottom-4 after:-start-4 after:size-[80px] after:rounded-full after:bg-red/50 after:blur-[80px] dark:bg-paper dark:text-title">
              <div className="p-2 text-left rtl:text-right">
                <Title as="h6" className="mb-6 px-0.5 text-sm font-semibold">
                  {t("table-text-toggle-columns")}
                </Title>
                <div className="grid grid-cols-2 gap-6">
                  {table.getAllLeafColumns().map((column) => {
                    return (
                      typeof column.columnDef.header === "string" &&
                      column.columnDef.header.length > 0 && (
                        <Checkbox
                          key={column.id}
                          label={<>{column.columnDef.header}</>}
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          iconClassName="h-5 w-5"
                          className="z-30"
                        />
                      )
                    )
                  })}
                </div>
              </div>
            </Popover.Content>
          </Popover>
        )}
      </div>
    </div>
  )
}

export function renderOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case "pending":
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {value}
          </Text>
        </div>
      )
    case "paid":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      )
    case "overdue":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {value}
          </Text>
        </div>
      )
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            {value}
          </Text>
        </div>
      )
  }
}
