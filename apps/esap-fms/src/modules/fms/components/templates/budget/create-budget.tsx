import CreateEditBudgetForm from "@/modules/fms/components/containers/budget/create-edit-budget-form"

export default function CreateBudget({
  id,
  mode,
}: {
  id?: number
  mode?: "view" | "create" | "edit"
}) {
  return <CreateEditBudgetForm id={id} mode={mode} />
}
