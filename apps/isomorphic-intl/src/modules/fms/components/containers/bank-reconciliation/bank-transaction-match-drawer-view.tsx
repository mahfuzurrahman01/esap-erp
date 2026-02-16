"use client"

import { useEffect, useState, useCallback } from "react"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"
import SimpleBar from "simplebar-react"
import Checkbox from "@/components/ui/checkbox"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import FormGroup from "@/components/base/form-group"
import { useBankReconciliation, useBankReconciliationUpdate, useUnreconciledPayments } from "@/modules/fms/hooks/use-bank-reconciliation"
import { useJournalEntryList } from "@/modules/fms/hooks/use-journal-entry"
import { voucherFilterAtom } from "@/modules/fms/store/voucher-filter-store"
import { filteredVoucherListAtom } from "@/modules/fms/store/voucher-filter-store"
import {
  transformJournalEntry,
  transformPayment,
  voucherMatchListAtom,
} from "@/modules/fms/store/voucher-match-store"
import { VoucherMatchItem } from "@/modules/fms/store/voucher-match-store"
import { bankReconciliationQueryOptionsAtom } from "@/modules/fms/store/bank-reconciliation-store"
import { useUpdateBankClearanceBatch } from "@/modules/fms/hooks"

import BankTransactionDetails from "./bank-transaction-details"
import VouchersMatchTable from "./vouchers-match-table/table"
import { useBankTransactionById } from "@/modules/fms/hooks/use-bank-transaction"

interface BankTransactionMatchDrawerViewProps {
  id: number
  refetch?: () => Promise<any>
}

export default function BankTransactionMatchDrawerView({ id, refetch }: BankTransactionMatchDrawerViewProps) {
  const t = useTranslations("form")
  const { closeDrawer } = useDrawer()
  const { data: journalEntryList } = useJournalEntryList({
    journalTypeId: 1,
  })
  const [queryOptions] = useAtom(bankReconciliationQueryOptionsAtom)
  const { data: unreconciledPayments, refetch: refetchUnreconciledPayments } = useUnreconciledPayments({
    companyId: queryOptions.companyId!,
    companyBankAccountId: queryOptions.bankAccountId!,
  })
  const { data: bankTransactionById } = useBankTransactionById(id)
  const { mutate: updateReconciliation, isPending: isUpdating } = useBankReconciliationUpdate()
  const { mutate: updateBankClearanceBatch } = useUpdateBankClearanceBatch()

  const [voucherMatchList, setVoucherMatchList] = useAtom(voucherMatchListAtom)
  const [filters, setFilters] = useAtom(voucherFilterAtom)
  const [filteredVoucherList] = useAtom(filteredVoucherListAtom)
  const [selectedRows, setSelectedRows] = useState<VoucherMatchItem[]>([])

  useEffect(() => {
    if (journalEntryList?.data && unreconciledPayments) {
      const transformedData = [
        ...journalEntryList.data.map(transformJournalEntry),
        ...unreconciledPayments.map(transformPayment),
      ]
      if (JSON.stringify(transformedData) !== JSON.stringify(voucherMatchList)) {
        setVoucherMatchList(transformedData)
      }
    }
  }, [journalEntryList?.data, unreconciledPayments, voucherMatchList])

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const handleFilterChange = useCallback((filterKey: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }))
  }, [setFilters])

  const handleSelectionChange = useCallback((rows: VoucherMatchItem[]) => {
    setSelectedRows(rows)
  }, [])

  const onSubmit = async () => {
    if (!bankTransactionById || selectedRows.length === 0) return

    const remainingUnallocatedAmount = bankTransactionById.totalUnAllocatedAmount
    const totalSelectedAmount = selectedRows.reduce((sum, row) => sum + row.amount, 0)

    const payload = selectedRows.map(row => {
      const allocatedAmount = totalSelectedAmount > remainingUnallocatedAmount!
        ? (row.amount / totalSelectedAmount) * remainingUnallocatedAmount!
        : row.amount

      return {
        paymentType: row.documentType,
        paymentCode: row.documentNumber,
        allocatedAmount
      }
    })

    updateReconciliation(
      {
        id: bankTransactionById.id,
        data: payload
      },
      {
        onSuccess: async () => {
          const batchUpdates = selectedRows.map(item => ({
            id: Number(item.id),
            paymentStatus: "Cleared",
            bankClearenceDate: item.referenceDate,
          }))
          await updateBankClearanceBatch(batchUpdates)
          await refetch?.()
          await refetchUnreconciledPayments?.()
          closeDrawer()
        }
      }
    )
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <DrawerHeader
          heading={t("form-match-against-voucher")}
          onClose={handleCloseDrawer}
          headerClassName="mb-0"
        />

        <SimpleBar className="h-0 grow">
          <div className="flex min-h-[767px] flex-col gap-4 px-5 py-6">
            <FormGroup
              title={t("form-filters")}
              className="mb-6"
              childrenContainerClassName="grid-cols-1 @4xl:col-span-12">
              <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                <Checkbox
                  label={t("form-journal-entry")}
                  aria-label="Select row"
                  checked={filters.showJournalEntry}
                  onChange={() => handleFilterChange("showJournalEntry")}
                />
                <Checkbox
                  label={t("form-payment-entry")}
                  aria-label="Select row"
                  checked={filters.showPaymentEntry}
                  onChange={() => handleFilterChange("showPaymentEntry")}
                />
              </div>
            </FormGroup>

            {filteredVoucherList.length > 0 ? (
              <VouchersMatchTable
                data={filteredVoucherList}
                isLoading={false}
                onSelectionChange={handleSelectionChange}
              />
            ) : (
              <>
                <div className="flex h-40 items-center justify-center">
                  <Text className="text-gray-500">
                    {t("form-no-matching-vouchers")}
                  </Text>
                </div>
              </>
            )}

            {bankTransactionById && (
              <BankTransactionDetails data={bankTransactionById} />
            )}
          </div>
        </SimpleBar>

        <DrawerFormActions
          handleCloseDrawer={handleCloseDrawer}
          isLoading={isUpdating}
          isEditForm={false}
          onSubmit={onSubmit}
        />
      </div>
    </>
  )
}