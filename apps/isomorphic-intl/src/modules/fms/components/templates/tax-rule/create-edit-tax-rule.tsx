import CreateEditTaxRuleForm from "../../containers/tax-rules/create-edit-tax-rule-form"

export default function CreateEditTaxRule({
  id,
  mode,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  return <CreateEditTaxRuleForm id={id} mode={mode} />
}
