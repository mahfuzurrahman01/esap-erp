import React from "react"

import { motion } from "framer-motion"

interface StepGuideProps {
  moduleId: string
}

const StepGuide = ({ moduleId }: StepGuideProps) => {
  const getSteps = (id: string) => {
    switch (id) {
      case "employees":
        return [
          {
            title: "Configure Employee Settings",
            description:
              "Set up work locations, schedules, and employment types in the Employee Settings section",
            icon: "⚙️",
          },
          {
            title: "Create Work Configurations",
            description:
              "Define work addresses, schedules, resume types, and employment categories",
            icon: "🏢",
          },
          {
            title: "Employee Profile Creation",
            description:
              "Add employee's personal information, contact details, and profile picture",
            icon: "👤",
          },
          {
            title: "Work Information Setup",
            description:
              "Configure job title, department, work schedule, and reporting structure",
            icon: "💼",
          },
          {
            title: "Document Management",
            description:
              "Upload and manage employee documents including resume, certificates, and other required paperwork",
            icon: "📄",
          },
        ]
      case "attendance":
        return [
          {
            title: "Daily Attendance Tracking",
            description:
              "Employees can mark their attendance with check-in and check-out times",
            icon: "⏰",
          },
          {
            title: "Attendance Reconciliation",
            description:
              "Process for correcting attendance records through approval workflow",
            icon: "🔄",
          },
          {
            title: "Leave Allocation",
            description:
              "Manage and view employee leave balances and allocations",
            icon: "📅",
          },
          {
            title: "Leave Request Management",
            description:
              "Submit and process leave requests with approval workflow",
            icon: "✋",
          },
          {
            title: "Off Days Configuration",
            description:
              "Set up holidays, weekends, and special non-working days",
            icon: "🏖️",
          },
          {
            title: "Leave Calendar Overview",
            description:
              "View and plan team leaves with yearly calendar visualization",
            icon: "📆",
          },
        ]
      case "saudization":
        return [
          {
            title: "Zone Status Dashboard",
            description:
              "Monitor current Saudization zone status and compliance metrics",
            icon: "📊",
          },
          {
            title: "Status Alerts",
            description:
              "Receive notifications when zone status falls below required levels",
            icon: "🚨",
          },
          {
            title: "Email Configuration",
            description:
              "Set up automated email alerts to admin for low zone status",
            icon: "📧",
          },
          {
            title: "Compliance Reports",
            description:
              "Generate and view detailed Saudization compliance reports",
            icon: "📈",
          },
        ]
      case "recruitment":
        return [
          {
            title: "Job Description Creation",
            description:
              "Create and publish detailed job descriptions for open positions",
            icon: "📝",
          },
          {
            title: "Applicant Requirements",
            description:
              "Define required qualifications, skills, and experience",
            icon: "✅",
          },
          {
            title: "Application Management",
            description: "Review and process incoming job applications",
            icon: "👥",
          },
          {
            title: "Candidate Status Tracking",
            description: "Track applicant status from applied to onboarding",
            icon: "📋",
          },
          {
            title: "Onboarding Initiation",
            description: "Start onboarding process for selected candidates",
            icon: "🎯",
          },
        ]
      case "payroll":
        return [
          {
            title: "Payroll Configuration Setup",
            description:
              "Configure basic payroll settings including salary categories and structure types",
            icon: "⚙️",
          },
          {
            title: "Salary Rules Definition",
            description:
              "Create calculation rules for allowances, deductions, and other salary components",
            icon: "📐",
          },
          {
            title: "Salary Structure Creation",
            description:
              "Build salary structures using defined rules and assign to employee groups",
            icon: "🏗️",
          },
          {
            title: "Employee Contract Management",
            description:
              "Create and manage employee contracts with assigned salary structures",
            icon: "📄",
          },
          {
            title: "Payslip Generation",
            description:
              "Generate monthly payslips based on contracts and salary structures",
            icon: "💰",
          },
          {
            title: "Payment Processing",
            description:
              "Process and distribute salary payments through configured payment methods",
            icon: "🏦",
          },
        ]
      case "appraisal":
        return [
          {
            title: "Appraisal Template Creation",
            description:
              "Create customizable templates with evaluation criteria and scoring",
            icon: "📋",
          },
          {
            title: "Appraisal Assignment",
            description:
              "Assign appraisals to employees with templates and deadlines",
            icon: "📝",
          },
          {
            title: "Feedback Management",
            description:
              "Collect and manage feedback from managers and employees",
            icon: "💭",
          },
          {
            title: "Goal Setting",
            description: "Set and track employee goals and objectives",
            icon: "🎯",
          },
          {
            title: "Performance Review",
            description: "Conduct performance reviews and track progress",
            icon: "📊",
          },
        ]
      case "fileManagement":
        return [
          {
            title: "Folder Structure Setup",
            description:
              "Create and organize individual folders for document management",
            icon: "📁",
          },
          {
            title: "File Upload",
            description: "Upload and store important documents and files",
            icon: "📤",
          },
          {
            title: "Access Control",
            description: "Manage file access permissions and sharing settings",
            icon: "🔒",
          },
          {
            title: "Document Versioning",
            description: "Track and maintain document versions and history",
            icon: "📑",
          },
        ]
      case "training":
        return [
          {
            title: "Training Programs",
            description: "Create and manage training programs and curricula",
            icon: "📚",
          },
          {
            title: "Session Management",
            description:
              "Schedule and organize training sessions and workshops",
            icon: "📅",
          },
          {
            title: "Participant Management",
            description:
              "Track and manage training participants and attendance",
            icon: "👥",
          },
          {
            title: "Training Feedback",
            description:
              "Collect and analyze participant feedback and evaluations",
            icon: "📊",
          },
          {
            title: "Training Attendance",
            description:
              "Record and monitor participant attendance for sessions",
            icon: "✓",
          },
        ]
      case "reports":
        return [
          {
            title: "Monthly Employee Report",
            description: "Generate comprehensive monthly employee statistics",
            icon: "📊",
          },
          {
            title: "Daily Attendance Report",
            description: "Track daily attendance and time records",
            icon: "⏰",
          },
          {
            title: "Leave Request Report",
            description: "Monitor and analyze leave requests and patterns",
            icon: "📅",
          },
          {
            title: "Yearly Off-days Report",
            description:
              "Overview of holidays and off-days throughout the year",
            icon: "🗓️",
          },
          {
            title: "Saudi Employee Monthly Report",
            description: "Track Saudi employee metrics and compliance",
            icon: "📈",
          },
          {
            title: "Expat Monthly Report",
            description: "Monitor expatriate employee statistics and status",
            icon: "📉",
          },
        ]
      default:
        return []
    }
  }

  const steps = getSteps(moduleId)

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Step-by-Step Guide
      </h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 rounded-lg bg-gray-100/80 p-4 backdrop-blur-sm transition-colors duration-200 dark:bg-gray-800/50">
            <span className="text-2xl">{step.icon}</span>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {step.title}
              </h4>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default StepGuide
