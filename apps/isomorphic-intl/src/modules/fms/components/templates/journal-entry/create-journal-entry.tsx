import CreateEditForm from "@/modules/fms/components/containers/journal-entry/create-edit-form"

export default function CreateJournalEntry({
  id,
  mode,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  return <CreateEditForm id={id} mode={mode} />
}
