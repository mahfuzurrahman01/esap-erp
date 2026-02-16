import { Text, Title } from "rizzui/typography"

// import DocumentWorkflowActivity from "@/modules/scm/components/base/document-workflow-activity"

import { financialManagementWorkflow } from "./activity-flow/accounting"

export default function FMSManagementOverflow() {
  return (
    <div className="mt-10 space-y-6">
      <Title as="h2" className="text-2xl font-bold text-title">
        FMS Management Overflow
      </Title>

      <Text>
        The Financial Management System (FMS) is designed to streamline and
        automate financial operations within an organization. It ensures
        accurate record-keeping, compliance with regulatory standards, and
        efficient management of financial resources. The system follows a
        structured workflow that includes data entry, validation, processing,
        reporting, and compliance auditing. The financial processes are
        seamlessly integrated across various modules, ensuring real-time data
        synchronization and accuracy. The system is divided into the following
        modules:
      </Text>

      {/* <DocumentWorkflowActivity activities={financialManagementWorkflow} /> */}
    </div>
  )
}
