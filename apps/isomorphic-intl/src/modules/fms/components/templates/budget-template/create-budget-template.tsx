import CreateEditBudgetTemplateForm from "@/modules/fms/components/containers/budget-template/create-edit-budget-template-form"

export default function CreateBudgetTemplate({
  id,
  mode,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  return <CreateEditBudgetTemplateForm id={id} mode={mode} />
}
