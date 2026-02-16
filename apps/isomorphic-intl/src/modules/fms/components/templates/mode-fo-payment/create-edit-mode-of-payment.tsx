import CreateEditModeOfPaymentForm from "@/modules/fms/components/containers/mode-of-payment/create-edit-mode-of-payment-form"

export default function CreateEditModeOfPayment({
  id,
  mode,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  return <CreateEditModeOfPaymentForm id={id} mode={mode} />
}
