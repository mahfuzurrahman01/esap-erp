import ImportBankStatementForm from "@/modules/fms/components/containers/bank-statement-import/import-bank-statement-form"

export default function ImportBankStatement({
  id,
  mode,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  return <ImportBankStatementForm id={id} mode={mode} />
}
