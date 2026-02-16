export const initialValue = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  company: "",
  assignedTo: "",
  region: "",
  feedback: "",
  industry: "",
  title: "",
  leadStatus: "",
  description: "",
}
export const companyOptions = [
  { id: "Kimi Hardware", name: "Kimi Hardware" },
  { id: "Tech Solutions", name: "Tech Solutions" },
  { id: "Global Innovations", name: "Global Innovations" },
]

export const ratingOptions = [
  { value: 1, label: "Acquired" },
  { value: 2, label: "Active" },
  { value: 3, label: "Market Failed" },
  { value: 4, label: "Project Cancelled" },
  { value: 5, label: "Shut Down" }
];


export const industryOptions = [
  { value: "ASP (Application Service Provider)", label: "ASP (Application Service Provider)" },
  { value: "Data/Telecom OEM", label: "Data/Telecom OEM" },
  { value: "ERP (Enterprise Resource Planning)", label: "ERP (Enterprise Resource Planning)" },
  { value: "Government/Military", label: "Government/Military" },
  { value: "Large Enterprise", label: "Large Enterprise" },
  { value: "ManagementISV", label: "ManagementISV" },
  { value: "MSP (Management Service Provider)", label: "MSP (Management Service Provider)" },
  { value: "Network Equipment Enterprise", label: "Network Equipment Enterprise" },
  { value: "Non-management ISV", label: "Non-management ISV" },
  { value: "Optical Networking", label: "Optical Networking" },
  { value: "Service Provider", label: "Service Provider" },
  { value: "Small/Medium Enterprise", label: "Small/Medium Enterprise" },
  { value: "Storage Equipment", label: "Storage Equipment" },
  { value: "Storage Service Provider", label: "Storage Service Provider" },
  { value: "Systems Integrator", label: "Systems Integrator" },
  { value: "Wireless Industry", label: "Wireless Industry" },
  { value: "ERP", label: "ERP" },
  { value: "Management ISV", label: "Management ISV" }
];


export const leadStatusOptions = [
  { value: "1", label: "Attempted to Contact" },
  { value: "2", label: "Contact in Future" },
  { value: "3", label: "Contacted" },
  { value: "4", label: "Junk Lead" },
  { value: "5", label: "Lost Lead" },
  { value: "6", label: "Not Contacted" },
  { value: "7", label: "Pre-Qualified" },
  { value: "8", label: "Not Qualified" }
]
