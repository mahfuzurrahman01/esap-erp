"use client"

import { Fragment } from "react"

import { useScrollPosition } from "@core/hooks/use-Scroll-position"
import cn from "@core/utils/class-names"
import { flexRender } from "@tanstack/react-table"
import { isEmpty } from "lodash"
import { PiArrowUpFill } from "react-icons/pi"
import { Empty, Loader, Text, Title } from "rizzui"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table"
import {
  CustomBodyCellProps,
  CustomHeaderCellProps,
  MainTableProps,
  PinnedRowProps,
} from "@/components/base/table/main-table-types"
import { getColumnOptions } from "@/components/base/table/util"
import DownArrowIcon from "@/components/icons/down-arrow"

export default function MainTable<TData extends Record<string, any>>({
  table,
  dataIds,
  variant,
  classNames,
  columnOrder,
  isLoading = false,
  showLoadingText = false,
  components,
}: MainTableProps<TData>) {
  const { containerRef, tableRef, isLeftScrollable, isRightScrollable } =
    useScrollPosition()

  if (!table) return null

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[128px] flex-col items-center justify-center">
        <Loader variant="spinner" size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        ) : null}
      </div>
    )
  }

  const headerParam = {
    table,
    dataIds,
    columnOrder,
    isLeftScrollable,
    isRightScrollable,
  }

  const rowParam = {
    table,
    dataIds,
    columnOrder,
    isLeftScrollable,
    isRightScrollable,
  }

  const mainRows = table.getIsSomeRowsPinned()
    ? table.getCenterRows()
    : table.getRowModel().rows

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "custom-scrollbar w-full max-w-full overflow-x-auto",
          classNames?.container
        )}
        style={{ width: '100%' }}>
        <Table
          ref={tableRef}
          variant={variant}
          style={{
            width: "100%",
          }}>
          <Fragment>
            {components?.header ? (
              components.header(headerParam)
            ) : (
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => {
                  const headerCellParam = {
                    columnOrder,
                    headerGroup,
                    isLeftScrollable,
                    isRightScrollable,
                  }
                  return (
                    <TableRow key={headerGroup.id}>
                      {components?.headerCell ? (
                        components.headerCell(headerCellParam)
                      ) : (
                        <TableHeadBasic
                          headerGroup={headerGroup}
                          isLeftScrollable={isLeftScrollable}
                          isRightScrollable={isRightScrollable}
                        />
                      )}
                    </TableRow>
                  )
                })}
              </TableHeader>
            )}
          </Fragment>

          <TableBody>
            {table.getTopRows().map((row) => (
              <PinnedRow
                key={row.id}
                row={row}
                table={table}
                isLeftScrollable={isLeftScrollable}
                isRightScrollable={isRightScrollable}
              />
            ))}

            {components?.bodyRow ? (
              components.bodyRow(rowParam)
            ) : (
              <>
                {mainRows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => {
                        const bodyCellParam = {
                          cell,
                          columnOrder,
                          isLeftScrollable,
                          isRightScrollable,
                        }
                        return (
                          <Fragment key={cell.id}>
                            {components?.bodyCell ? (
                              components.bodyCell(bodyCellParam)
                            ) : (
                              <TableCellBasic
                                cell={cell}
                                isLeftScrollable={isLeftScrollable}
                                isRightScrollable={isRightScrollable}
                              />
                            )}
                          </Fragment>
                        )
                      })}
                    </TableRow>

                    {/* custom-expanded-component start  */}
                    {components?.expandedComponent && row.getIsExpanded() && (
                      <TableRow>
                        <TableCell
                          className="!p-0"
                          colSpan={row.getVisibleCells().length}>
                          {components.expandedComponent(row)}
                        </TableCell>
                      </TableRow>
                    )}
                    {/* customExpandedComponent end */}
                  </Fragment>
                ))}
              </>
            )}

            {table.getBottomRows().map((row) => (
              <PinnedRow
                key={row.id}
                row={row}
                table={table}
                isLeftScrollable={isLeftScrollable}
                isRightScrollable={isRightScrollable}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {isEmpty(table.getRowModel().rows) && (
        <div className="py-5 text-center lg:py-8">
          <Empty /> <Text className="mt-3">No Data</Text>
        </div>
      )}
    </>
  )
}

// Basic Header component
export function TableHeadBasic<TData extends Record<string, any>>({
  headerGroup,
  isLeftScrollable,
  isRightScrollable,
}: CustomHeaderCellProps<TData>) {
  if (!headerGroup) return null

  return (
    <>
      {headerGroup.headers.map((header) => {
        const { canResize, canPin, isPinned, isLeftPinned, isRightPinned } =
          getColumnOptions(header.column)

        return (
          <TableHead
            key={header.id}
            colSpan={header.colSpan}
            style={{
              left: isLeftPinned ? header.column.getStart("left") : undefined,
              right: isRightPinned
                ? header.column.getAfter("right")
                : undefined,
              width: header.getSize(),
            }}
            className={cn(
              "group",
              isPinned && canPin && "sticky z-10",
              !isPinned && canResize && "relative",
              isPinned && isLeftScrollable && "sticky-right",
              isPinned && isRightScrollable && "sticky-left"
            )}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}

            {header.column.getCanSort() ? (
              <button
                type="button"
                onClick={header.column.getToggleSortingHandler()}
                className="relative top-1 ms-1"
                aria-label="Sort by column">
                {{
                  asc: <PiArrowUpFill className="size-[18px]" />,
                  desc: <DownArrowIcon className="size-[18px]" />,
                }[header.column.getIsSorted() as string] ??
                  (header.column.columnDef.header !== "" && (
                    <DownArrowIcon className="size-[18px]" />
                  ))}
              </button>
            ) : null}

            {header.column.getCanResize() && (
              <div
                {...{
                  onDoubleClick: () => header.column.resetSize(),
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                }}
                className="absolute end-0 top-0 hidden h-full w-0.5 cursor-w-resize bg-gray-400 group-hover:block"
              />
            )}
          </TableHead>
        )
      })}
    </>
  )
}

// Basic Cell component
export function TableCellBasic<TData extends Record<string, any>>({
  cell,
  isLeftScrollable,
  isRightScrollable,
}: CustomBodyCellProps<TData>) {
  if (!cell) return null

  const { canResize, canPin, isPinned, isLeftPinned, isRightPinned } =
    getColumnOptions(cell.column)

  return (
    <TableCell
      style={{
        left: isLeftPinned ? cell!.column.getStart("left") : undefined,
        right: isRightPinned ? cell.column.getAfter("right") : undefined,
        width: cell.column.getSize(),
      }}
      className={cn(
        isPinned && canPin && "sticky z-10",
        !isPinned && canResize && "relative",
        isPinned && isLeftScrollable && "sticky-right",
        isPinned && isRightScrollable && "sticky-left"
      )}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  )
}

// Pinned Row Component
export function PinnedRow<TData extends Record<string, any>>({
  row,
  isLeftScrollable,
  isRightScrollable,
}: PinnedRowProps<TData>) {
  const isTopPinned = row.getIsPinned() === "top"
  const isBottomPinned = row.getIsPinned() === "bottom"
  return (
    <TableRow
      className={cn(
        "sticky z-20 bg-white dark:bg-gray-50",
        isTopPinned && "-top-px shadow-[0px_2px_2px_0px_#0000000D]",
        isBottomPinned && "-bottom-0.5 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]"
      )}>
      {row.getVisibleCells().map((cell) => {
        return (
          <TableCellBasic
            key={cell.id}
            cell={cell}
            isLeftScrollable={isLeftScrollable}
            isRightScrollable={isRightScrollable}
          />
        )
      })}
    </TableRow>
  )
}
