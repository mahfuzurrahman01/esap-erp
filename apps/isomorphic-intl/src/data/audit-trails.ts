export type AuditTrailTypes = {
  AuditID: string
  SupplierID: string
  AuditName: string
  ExpectedPerformance: string
  ActualPerformance: string
  Status: "compliant" | "non-compliant"
  CreatedBy: string
  Comments: string
}

// Example array of audit trails
export const AuditTrails: AuditTrailTypes[] = [
  {
    AuditID: "AUD001",
    SupplierID: "SUP-12345",
    AuditName: "John Cena",
    ExpectedPerformance: "Within 5 days, 95% Quality",
    ActualPerformance: "6 days, 92% Quality",
    Status: "non-compliant",
    CreatedBy: "Sept 17, 2024",
    Comments: "Supplier missed deadline due to shipment delay",
  },
  {
    AuditID: "AUD002",
    SupplierID: "SUP-12345",
    AuditName: "John Cena",
    ExpectedPerformance: "Pass all inspections, 100% compliance",
    ActualPerformance: "Pass, 98% compliance",
    Status: "compliant",
    CreatedBy: "Sept 10, 2024",
    Comments: "Minor deviation in waste disposal, promptly corrected.",
  },
  {
    AuditID: "AUD003",
    SupplierID: "SUP-12345",
    AuditName: "Roman Reigns",
    ExpectedPerformance: "95% of shipments within agreed timeframes",
    ActualPerformance: "90% of shipments within timeframe",
    Status: "non-compliant",
    CreatedBy: "Sept 20, 2024",
    Comments:
      "Shipment delays in Q2 due to port congestion affected performance.",
  },
  {
    AuditID: "AUD004",
    SupplierID: "SUP-12345",
    AuditName: "Roman Reigns",
    ExpectedPerformance: "Renew contract within 30 days of expiration",
    ActualPerformance: "Renewed contract in 25 days",
    Status: "compliant",
    CreatedBy: "Sept 5, 2024",
    Comments: "Contract process completed ahead of schedule.",
  },
  {
    AuditID: "AUD005",
    SupplierID: "SUP-12345",
    AuditName: "The Rock (Final Boss)",
    ExpectedPerformance: "100% adherence to ethical sourcing policy",
    ActualPerformance:
      "99% adherence, minor issue in sourcing origin verification",
    Status: "compliant",
    CreatedBy: "Sept 18, 2024",
    Comments:
      "Supplier provided satisfactory explanation and corrected the sourcing issue.",
  },
]
