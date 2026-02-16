import CreateEditForm from "@/modules/fms/components/containers/journal-entry-template/create-edit-form"

export default function CreateJournalEntryTemplate({
  id,
  mode,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  return <CreateEditForm id={id} mode={mode} />
}
