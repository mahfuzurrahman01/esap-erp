import React from "react"

import { motion } from "framer-motion"
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  NodeProps,
} from "reactflow"
import "reactflow/dist/style.css"

interface FlowDiagramProps {
  moduleId: string
}

// Custom Node Component
const CustomNode = ({ data }: NodeProps) => (
  <div className="relative">
    {/* Index Badge */}
    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-sm">
      {data.index}
    </div>

    {/* Card Content */}
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-gray-900">{data.label}</div>
      <div className="text-sm text-gray-600">{data.description}</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {data?.tags?.map((tag: string, index: number) => (
          <span
            key={index}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
)

const employeeNodes = [
  {
    id: "1",
    position: { x: 100, y: 50 },
    data: {
      index: 1,
      label: "Employee Settings",
      description: "Configure dependencies",
      tags: ["Work Location", "Schedule Types", "Employment Types"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom", // Use custom node
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: {
      index: 2,
      label: "Work Configuration",
      description: "Address, Schedule, Types",
      tags: ["Work Address", "Shifts", "Departments", "Positions"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 100, y: 200 },
    data: {
      index: 3,
      label: "Employee Profile",
      description: "Basic Information",
      tags: ["Personal Info", "Contact Details", "Emergency Contact"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 400, y: 200 },
    data: {
      index: 4,
      label: "Work Information",
      description: "Job Details & Schedule",
      tags: ["Job Title", "Department", "Work Schedule", "Reports To"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "5",
    position: { x: 700, y: 200 },
    data: {
      index: 5,
      label: "Documents",
      description: "Resume & Certificates",
      tags: ["Resume", "Certificates", "ID Proof", "Contracts"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
]

const employeeEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#0891b2" },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
]

const attendanceNodes = [
  {
    id: "1",
    position: { x: 100, y: 50 },
    data: {
      index: 1,
      label: "Daily Attendance",
      description: "Check-in/Check-out",
      tags: ["Check-in", "Check-out", "Time Tracking"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: {
      index: 2,
      label: "Reconciliation Requests",
      description: "Attendance correction workflow",
      tags: ["Request Update", "Approve/Reject", "History"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 100, y: 200 },
    data: {
      index: 3,
      label: "Leave Management",
      description: "Leave allocation and types",
      tags: ["Leave Types", "Allocation", "Balance"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 400, y: 200 },
    data: {
      index: 4,
      label: "Leave Requests",
      description: "Leave application workflow",
      tags: ["Apply Leave", "Approve/Reject", "History"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "5",
    position: { x: 700, y: 50 },
    data: {
      index: 5,
      label: "Off Days",
      description: "Holiday and weekend",
      tags: ["Holidays", "Weekends", "Special Days"],
    },
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "6",
    position: { x: 700, y: 200 },
    data: {
      index: 6,
      label: "Leave Calendar",
      description: "Yearly leave overview",
      tags: ["Calendar View", "Team Leaves", "Planning"],
    },
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
]

const attendanceEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#0891b2" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
  {
    id: "e3-6",
    source: "3",
    target: "6",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#dc2626" },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#dc2626" },
  },
]

const saudizationNodes = [
  {
    id: "1",
    position: { x: 100, y: 50 },
    data: {
      index: 1,
      label: "Zone Status Dashboard",
      description: "Current compliance metrics",
      tags: ["Status Overview", "Metrics", "Analytics"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: {
      index: 2,
      label: "Status Monitoring",
      description: "Alert thresholds",
      tags: ["Alerts", "Notifications", "Thresholds"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 400, y: 200 },
    data: {
      index: 3,
      label: "Email Configuration",
      description: "Alert notifications",
      tags: ["Email Setup", "Admin Alerts", "Templates"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
]

const saudizationEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#0891b2" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
]

const recruitmentNodes = [
  {
    id: "1",
    position: { x: 100, y: 50 },
    data: {
      index: 1,
      label: "Job Description",
      description: "Create job postings",
      tags: ["Requirements", "Qualifications", "Responsibilities"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: {
      index: 2,
      label: "Application Review",
      description: "Process applications",
      tags: ["Screen", "Evaluate", "Shortlist"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 700, y: 50 },
    data: {
      index: 3,
      label: "Status Management",
      description: "Track application status",
      tags: ["Status Update", "Progress", "History"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 400, y: 200 },
    data: {
      index: 4,
      label: "Onboarding",
      description: "Initialize onboarding",
      tags: ["Documentation", "Setup", "Integration"],
    },
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
]

const recruitmentEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#0891b2" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#dc2626" },
  },
]

const payrollNodes = [
  {
    id: "1",
    position: { x: 100, y: 50 },
    data: {
      index: 1,
      label: "Payroll Configuration",
      description: "Basic setup",
      tags: ["Salary Categories", "Structure Types", "Rules"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: {
      index: 2,
      label: "Salary Rules",
      description: "Calculation rules",
      tags: ["Allowances", "Deductions", "Formulas"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 700, y: 50 },
    data: {
      index: 3,
      label: "Salary Structure",
      description: "Pay components",
      tags: ["Basic Salary", "Allowances", "Benefits"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 400, y: 200 },
    data: {
      index: 4,
      label: "Employee Contract",
      description: "Contract details",
      tags: ["Terms", "Salary Structure", "Benefits"],
    },
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "5",
    position: { x: 700, y: 200 },
    data: {
      index: 5,
      label: "Payslip Generation",
      description: "Monthly payslips",
      tags: ["Calculations", "Deductions", "Net Salary"],
    },
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
]

const payrollEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#0891b2" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#dc2626" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#dc2626" },
  },
]

const appraisalNodes = [
  {
    id: "1",
    position: { x: 100, y: 50 },
    data: {
      index: 1,
      label: "Appraisal Template",
      description: "Template creation",
      tags: ["Criteria", "Scoring", "Questions"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: {
      index: 2,
      label: "Appraisal Creation",
      description: "Assignment process",
      tags: ["Assignment", "Schedule", "Deadlines"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 700, y: 50 },
    data: {
      index: 3,
      label: "Feedback System",
      description: "Review feedback",
      tags: ["Manager", "Employee", "Comments"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 400, y: 200 },
    data: {
      index: 4,
      label: "Goal Management",
      description: "Employee goals",
      tags: ["Objectives", "KPIs", "Tracking"],
    },
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
]

const appraisalEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#0891b2" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#dc2626" },
  },
]

const fileManagementNodes = [
  {
    id: "1",
    position: { x: 100, y: 50 },
    data: {
      index: 1,
      label: "Folder Structure",
      description: "Organization setup",
      tags: ["Hierarchy", "Categories", "Access"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: {
      index: 2,
      label: "File Management",
      description: "Document handling",
      tags: ["Upload", "Download", "Share"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 700, y: 50 },
    data: {
      index: 3,
      label: "Access Control",
      description: "Permission management",
      tags: ["Roles", "Rights", "Security"],
    },
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
]

const fileManagementEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#0891b2" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#dc2626" },
  },
]

const trainingNodes = [
  {
    id: "1",
    position: { x: 100, y: 50 },
    data: {
      index: 1,
      label: "Training Programs",
      description: "Program management",
      tags: ["Courses", "Schedule", "Content"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: {
      index: 2,
      label: "Sessions",
      description: "Session planning",
      tags: ["Schedule", "Venue", "Trainer"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 700, y: 50 },
    data: {
      index: 3,
      label: "Participants",
      description: "Attendee management",
      tags: ["Registration", "Attendance", "Progress"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 400, y: 200 },
    data: {
      index: 4,
      label: "Feedback & Attendance",
      description: "Training evaluation",
      tags: ["Feedback", "Attendance", "Reports"],
    },
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
]

const trainingEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#0891b2" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#dc2626" },
  },
]

const reportsNodes = [
  {
    id: "1",
    position: { x: 100, y: 50 },
    data: {
      index: 1,
      label: "Employee Reports",
      description: "Monthly statistics",
      tags: ["Statistics", "Trends", "Analysis"],
    },
    style: {
      background: "#f0f9ff",
      border: "1px solid #0891b2",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: {
      index: 2,
      label: "Attendance Reports",
      description: "Daily tracking",
      tags: ["Attendance", "Leave", "Off-days"],
    },
    style: {
      background: "#ecfdf5",
      border: "1px solid #059669",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 700, y: 50 },
    data: {
      index: 3,
      label: "Compliance Reports",
      description: "Saudi & Expat tracking",
      tags: ["Saudi", "Expat", "Compliance"],
    },
    style: {
      background: "#fef2f2",
      border: "1px solid #dc2626",
      borderRadius: "8px",
      padding: "12px",
      width: 240,
    },
    type: "custom",
  },
]

const reportsEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#059669" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: "#dc2626" },
  },
]

const FlowDiagram = ({ moduleId }: FlowDiagramProps) => {
  const nodeTypes = {
    custom: CustomNode,
  }

  const getNodesAndEdges = (id: string) => {
    switch (id) {
      case "employees":
        return {
          nodes: employeeNodes,
          edges: employeeEdges,
        }
      case "attendance":
        return {
          nodes: attendanceNodes,
          edges: attendanceEdges,
        }
      case "saudization":
        return {
          nodes: saudizationNodes,
          edges: saudizationEdges,
        }
      case "recruitment":
        return {
          nodes: recruitmentNodes,
          edges: recruitmentEdges,
        }
      case "payroll":
        return {
          nodes: payrollNodes,
          edges: payrollEdges,
        }
      case "appraisal":
        return {
          nodes: appraisalNodes,
          edges: appraisalEdges,
        }
      case "fileManagement":
        return {
          nodes: fileManagementNodes,
          edges: fileManagementEdges,
        }
      case "training":
        return {
          nodes: trainingNodes,
          edges: trainingEdges,
        }
      case "reports":
        return {
          nodes: reportsNodes,
          edges: reportsEdges,
        }
      default:
        return { nodes: [], edges: [] }
    }
  }

  const { nodes, edges } = getNodesAndEdges(moduleId)

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default FlowDiagram
