import { Compliance } from "@/modules/scm/types/compliance-and-risk/compliance-types"

export const defaultCompliance: Partial<Compliance> = {
  complianceArea: "",
  regulationStandard: "",
  taskName: "",
  assignedToId: 0,
  assignedToName: "",
  dueDate: "",
  completionStatus: "",
  proofDocumentUrl: "",
  comments: "",
}

export const complianceStatus = [
  {
    value: "compliant",
    label: "Compliant",
  },
  {
    value: "non-compliant",
    label: "Non-compliant",
  },
  {
    value: "pending",
    label: "Pending",
  },
]
