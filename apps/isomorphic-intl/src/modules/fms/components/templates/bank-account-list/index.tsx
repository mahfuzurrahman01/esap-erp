import CreateEditBankAccountForm from "@/modules/fms/components/containers/bank-account/create-edit-bank-form"

export default function BankAccountList({ id }: { id?: number }) {
  return <CreateEditBankAccountForm id={id} />
}
