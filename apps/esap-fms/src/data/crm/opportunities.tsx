export const typeOptions = [
  { value: "New Business", label: "New Business" },
  { value: "Existing Business", label: "Existing Business" },
]

export const protocolOptions = [
  { value: 1, label: "SMTP" },
  { value: 2, label: "Microsoft_OAuth" },
  { value: 3, label: "Google_OAuth" },
  { value: 4, label: "Send_Mail" },
  { value: 5, label: "Mail" },
]

export const leadSourceOptions = [
  { value: "-None-", label: "-None-" },
  { value: "Advertisement", label: "Advertisement" },
  { value: "Cold Call", label: "Cold Call" },
  { value: "Employee Referral", label: "Employee Referral" },
  { value: "External Referral", label: "External Referral" },
  { value: "Online Store", label: "Online Store" },
  { value: "Partner", label: "Partner" },
  { value: "Public Relations", label: "Public Relations" },
  { value: "Sales Email Alias", label: "Sales Email Alias" },
  { value: "Seminar Partner", label: "Seminar Partner" },
  { value: "Internal Seminar", label: "Internal Seminar" },
  { value: "Trade Show", label: "Trade Show" },
  { value: "Web Download", label: "Web Download" },
  { value: "Web Research", label: "Web Research" },
  { value: "Chat", label: "Chat" },
];

export const stageOptions = [
  { value: "Qualification", label: "Qualification" },
  { value: "Needs Analysis", label: "Needs Analysis" },
  { value: "Value Proposition", label: "Value Proposition" },
  { value: "Identify Decision Makers", label: "Identify Decision Makers" },
  { value: "Proposal/Price Quote", label: "Proposal/Price Quote" },
  { value: "Negotiation/Review", label: "Negotiation/Review" },
  { value: "Closed Won", label: "Closed Won" },
  { value: "Closed Lost", label: "Closed Lost" },
  { value: "Closed Lost to Competition", label: "Closed Lost to Competition" },
];

export const statusOptions = [
  { id: "Open", name: "Open" },
  { id: "Closed", name: "Closed" },
]

export const initialValue = {
  lead_id: "",
  customer_id: "",
  closeDate: "",
  amount: "",
  probability: "",
  type: "",
  description: "",
  stage: "",
  status: "",
}
