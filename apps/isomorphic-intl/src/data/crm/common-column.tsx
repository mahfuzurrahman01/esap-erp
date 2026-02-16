export const options = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
]

export const typeLabels: Record<number, string> = {
  1: "Product",
  2: "Customer",
  3: "Campaigns",
  4: "Quotations",
  5: "Bill",
  6: "TargetGoal",
}

export const approvalTypeOptions = [
  { value: 1, label: "Product" },
  { value: 2, label: "Customer" },
  { value: 3, label: "Campaigns" },
  { value: 4, label: "Quotations" },
  { value: 5, label: "Bill" },
  { value: 6, label: "TargetGoal" },
]

export const approvalStatus = [
  { value: "Draft", label: "Draft" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Declined", label: "Declined" },
]

export const approvalListFilterStatus = [
  { value: "Pending", label: "Pending" },
  { value: "Hold", label: "Hold" },
  { value: "Approved", label: "Approved" },
  { value: "Declined", label: "Declined" },
]
