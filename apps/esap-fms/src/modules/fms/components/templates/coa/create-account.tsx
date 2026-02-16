import ActivityLog from "@/components/base/activity-log"
import activities from "@/components/base/activity-log/activities.json"
import CreateEditForm from "@/modules/fms/components/containers/accounting/coa/create-edit-form"

export default function CreateAccount({
  id,
  mode,
}: {
  id?: number
  mode?: "view" | "edit" | "create"
}) {
  return (
    <>
      <CreateEditForm id={id} mode={mode} />
      {/* {mode === "view" && <ActivityLog activities={activities} />} */}
    </>
  )
}
