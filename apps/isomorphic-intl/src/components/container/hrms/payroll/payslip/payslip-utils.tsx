import { Payslip } from "@/types/hrms/payroll/payslip.types"

export const earningsColumns = (payslip: Payslip, t: any) => {
  return [
    {
      id: "ruleName",
      header: t("form-description"),
      accessorKey: "salaryRuleName",
    },
    {
      id: "amount",
      header: t("form-amount"),
      accessorKey: "amount",
      cell: ({ row }: { row: any }) => {
        const rule = row.original
        let amount = 0

        if (rule.computationType === "FixedAmount") {
          amount = Number(rule.amount || 0)
        } else if (
          rule.computationType === "Formula" &&
          rule.formula &&
          rule.salaryCategory?.transactionType === "Credit"
        ) {
          // Find basic salary rule
          const basicRule =
            payslip?.employeeContract?.salaryStructure?.salaryRules?.find(
              (r) =>
                r.salaryCategory?.salaryCategoryName?.toLowerCase() === "basic"
            )

          if (basicRule?.amount) {
            const basicSalary = Number(basicRule.amount)
            // Extract percentage from formula (e.g., "0.09" from "BaseSalary * 0.09")
            const percentageMatch = rule.formula.match(/\*\s*([\d.]+)/)
            if (percentageMatch) {
              const percentage = Number(percentageMatch[1])
              amount = basicSalary * percentage
            }
          }
        }
        return (
          <span className="font-medium">
            {amount.toFixed(2)}{" "}
            {
              payslip?.employeeContract?.employee?.privateInformation?.currency
                ?.currencyName
            }
          </span>
        )
      },
    },
  ]
}

export const deductionsColumns = (payslip: Payslip, t: any) => [
  {
    id: "ruleName",
    header: t("form-description"),
    accessorKey: "salaryRuleName",
  },
  {
    id: "amount",
    header: t("form-amount"),
    accessorKey: "amount",
    cell: ({ row }: { row: any }) => {
      const rule = row.original
      let amount = 0

      if (rule.computationType === "FixedAmount") {
        amount = Number(rule.amount || 0)
      } else if (
        rule.computationType === "Formula" &&
        rule.formula &&
        rule.salaryCategory?.transactionType === "Debit"
      ) {
        // Find basic salary rule
        const basicRule =
          payslip?.employeeContract?.salaryStructure?.salaryRules?.find(
            (r) =>
              r.salaryCategory?.salaryCategoryName?.toLowerCase() === "basic"
          )

        if (basicRule?.amount) {
          const basicSalary = Number(basicRule.amount)
          // Extract percentage from formula (e.g., "0.09" from "BaseSalary * 0.09")
          const percentageMatch = rule.formula.match(/\*\s*([\d.]+)/)
          if (percentageMatch) {
            const percentage = Number(percentageMatch[1])
            amount = basicSalary * percentage
          }
        }
      }

      return (
        <span className="font-medium">
          {amount.toFixed(2)}{" "}
          {
            payslip?.employeeContract?.employee?.privateInformation?.currency
              ?.currencyName
          }
        </span>
      )
    },
  },
]
