"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ResetPasswordForm from "@/modules/crm/components/containers/reset-password/form"

export default function ResetPasswordComponent() {
  const pageHeader = {
    title: "Reset Password",
    breadcrumb: [
      {
        href: routes.crm.resetPassword,
        name: "Reset Password",
      },
      {
        name: "Password Reset",
      },
    ],
  }

  return (
    <div className="container mx-auto h-full p-6">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {" "}
      </PageHeader>
      <ResetPasswordForm />
    </div>
  )
}
