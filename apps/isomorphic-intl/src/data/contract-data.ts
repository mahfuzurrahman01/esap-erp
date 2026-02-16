export type ContractInfoType = {
  id: string
  supplierId: string
  contractName: string
  startDate: string // format: YYYY-MM-DD
  endDate: string // format: YYYY-MM-DD
  status: "active" | "inactive" | "pending" | "terminated" // Possible contract statuses
  contractValue: number // Value of the contract
  currency: "USD" | "SAR" | "EUR" // Currency options
  paymentTerms: string // e.g., Net 30, Net 60, etc.
  serviceLevelAgreement: {
    slaCriteria: string
    slaMetric: string
  }
}

export const ContractData: ContractInfoType[] = [
  {
    id: "b4df19a9-bfa7-42cc-89f1-51b6b1d5f7dwd",
    supplierId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    contractName: "Raw Materials Supply Contract",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    status: "active",
    contractValue: 1500000,
    currency: "USD",
    paymentTerms: "Net 30",
    serviceLevelAgreement: {
      slaCriteria: "On-time delivery",
      slaMetric: "98% within 24 hours",
    },
  },
  {
    id: "c5e6f7g8-h9i0-1234-5678-90abcdef1234",
    supplierId: "b2c3d4e5-f6g7-8901-2345-678901abcdef",
    contractName: "IT Services Contract",
    startDate: "2022-06-01",
    endDate: "2024-06-01",
    status: "active",
    contractValue: 250000,
    currency: "SAR",
    paymentTerms: "Net 60",
    serviceLevelAgreement: {
      slaCriteria: "System uptime",
      slaMetric: "99.9% availability",
    },
  },
  {
    id: "d6f7g8h9-i0j1-2345-6789-01abcdef2345",
    supplierId: "c3d4e5f6-g7h8-9012-3456-789012abcdef",
    contractName: "Transportation and Logistics Contract",
    startDate: "2021-10-01",
    endDate: "2023-10-01",
    status: "inactive",
    contractValue: 500000,
    currency: "EUR",
    paymentTerms: "Net 45",
    serviceLevelAgreement: {
      slaCriteria: "On-time delivery",
      slaMetric: "95% within agreed timeframe",
    },
  },
  {
    id: "e7g8h9i0-j1k2-3456-7890-12abcdef3456",
    supplierId: "d4e5f6g7-h8i9-0123-4567-890123abcdef",
    contractName: "Office Supplies Contract",
    startDate: "2023-03-01",
    endDate: "2025-03-01",
    status: "active",
    contractValue: 100000,
    currency: "SAR",
    paymentTerms: "Net 30",
    serviceLevelAgreement: {
      slaCriteria: "Order accuracy",
      slaMetric: "99.5% correct items",
    },
  },
  {
    id: "f8h9i0j1-k2l3-4567-8901-23abcdef4567",
    supplierId: "e5f6g7h8-i9j0-1234-5678-901234abcdef",
    contractName: "Consulting Services Contract",
    startDate: "2023-07-01",
    endDate: "2023-12-31",
    status: "active",
    contractValue: 50000,
    currency: "USD",
    paymentTerms: "Net 30",
    serviceLevelAgreement: {
      slaCriteria: "Project milestones",
      slaMetric: "100% on-time completion",
    },
  },
  {
    id: "g9i0j1k2-l3m4-5678-9012-34abcdef5678",
    supplierId: "f6g7h8i9-j0k1-2345-6789-012345abcdef",
    contractName: "Marketing Services Agreement",
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    status: "active",
    contractValue: 200000,
    currency: "EUR",
    paymentTerms: "Net 45",
    serviceLevelAgreement: {
      slaCriteria: "Campaign performance",
      slaMetric: "15% increase in engagement",
    },
  },
  {
    id: "h0i1j2k3-l4m5-6789-0123-45abcdef6789",
    supplierId: "g7h8i9j0-k1l2-3456-7890-123456abcdef",
    contractName: "Maintenance Services Contract",
    startDate: "2022-12-01",
    endDate: "2023-11-30",
    status: "pending",
    contractValue: 75000,
    currency: "USD",
    paymentTerms: "Net 30",
    serviceLevelAgreement: {
      slaCriteria: "Response time",
      slaMetric: "Within 4 hours for critical issues",
    },
  },
]
