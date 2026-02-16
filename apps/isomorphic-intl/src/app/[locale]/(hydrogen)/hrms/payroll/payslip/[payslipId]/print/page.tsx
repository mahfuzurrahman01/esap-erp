import PayslipView from "@/components/templates/hrms/payroll/contract/payslip/payslip-view"
import { metaObject } from "@/config/site.config"
import PaymentView from "@/modules/fms/components/templates/payments/payment-view"

export const metadata = {
  ...metaObject("Print Payslip"),
}

export default async function PayslipPrintPage(props: {
  params: Promise<{ payslipId: number }>
}) {
  const params = await props.params
  return <PayslipView id={params.payslipId} />
}
