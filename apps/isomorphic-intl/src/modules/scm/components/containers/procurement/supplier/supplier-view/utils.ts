export type SupplierDetails = {
  // Basic Information
  first_name: ""
  middle_name: undefined
  last_name: ""
  company_name: ""
  industry_category: ""
  contact_email: ""
  company_website: undefined
  company_address: {
    street: ""
    city: ""
    state: ""
    zip_code: ""
    country: ""
  }
  contact_number: ""
  avatar: undefined

  // Compliance & Legal Information
  business_license_number: ""
  tax_identification_number: ""
  vat_registration_number: ""
  zakat_certificate: undefined
  compliance_certifications: undefined
  insurance_certificates: undefined
  anti_corruption_compliance: false
  ethical_sourcing_agreement: false
  supplier_code_of_conduct_agreement: false
  legal_representative_details: undefined
  commercial_registration: undefined
  duns_number: undefined

  // Financial Information
  bank_details: {
    bank_name: ""
    bank_branch_name: undefined
    bank_account_holder_name: ""
    bank_account_number: ""
    bank_country: ""
    bank_address: undefined
    currency: ""
    routing_number: undefined
  }
  payment_terms: ""
  account_verification_document: undefined

  // Contract Information
  contract_start_date: ""
  contract_end_date: ""
  contract_terms: undefined
  service_level_agreement: {
    sla_criteria: ""
    sla_metrics: 0
  }
  contract_value: 0
}
