"use client"

import BankAccountBalanceState from "@/modules/fms/components/containers/bank-account/view/bank-account-balance-state"
import BankAccountInformation from "@/modules/fms/components/containers/bank-account/view/bank-account-information"
import { useBankAccountById } from "@/modules/fms/hooks/use-bank-account"

export default function BankAccountView({ id }: { id: number }) {
  const { data } = useBankAccountById(id)
  return (
    <div>
      {/* <BankAccountBalanceState /> */}
      <BankAccountInformation data={data!} />
    </div>
  )
}
