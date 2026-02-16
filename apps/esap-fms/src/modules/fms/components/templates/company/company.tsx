"use client"

import ActivityLog from "@/components/base/activity-log"
import CompanyForm from "@/modules/fms/components/containers/accounting/company/company-form"
import activities from "@/components/base/activity-log/activities.json"

interface CompanyPageTemplateProps {
  id?: number
  mode?: "view" | "edit" | "create"
}

export function CompanyPageTemplate({ id, mode }: CompanyPageTemplateProps) {
  return (
    <div className="container mx-auto mb-5">
      <CompanyForm id={id} mode={mode} />
      {/* <ActivityLog activities={activities} /> */}
    </div>
  )
}