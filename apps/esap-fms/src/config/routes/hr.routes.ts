export const hrRoutes = {
  dashboard: "/hrms/dashboard",
  //#region Employees
  employees: "/hrms/employees",
  employeeDetails: (id: string | number) => `/hrms/employees/${id}`,
  createEmployee: "/hrms/employees/create",
  editEmployee: (id: string | number) => `/hrms/employees/${id}/edit`,
  departments: "/hrms/employee-departments",
  createDepartment: "/hrms/employee-departments/create",
  editDepartment: (id: string | number) =>
    `/hrms/employee-departments/${id}/edit`,
  contracts: "/hrms/employee-contracts",
  employeeSettingItems: "/hrms/employee-setting-items/employee-types",
  employmentSettingItems: "/hrms/employee-setting-items/employment-types",
  activityPlans: "/hrms/employee-setting-items/activity-plans",
  createActivityPlan: "/hrms/employee-setting-items/activity-plans/create",
  editActivityPlan: (id: string | number) =>
    `/hrms/employee-setting-items/activity-plans/${id}/edit`,
  basicInformation: (id: string | number) => `/hrms/employees/${id}/edit`,
  resume: (id: string | number) => `/hrms/employees/${id}/edit/resume`,
  resumeTypeSettings: "/hrms/employee-setting-items/resume-types",
  workInformation: (id: string | number) =>
    `/hrms/employees/${id}/edit/work-information`,
  workingAddress: "/hrms/employee-setting-items/work-addresses",
  workingSchedule: "/hrms/employee-setting-items/work-schedules",
  privateInformation: (id: string | number) =>
    `/hrms/employees/${id}/edit/private-information`,
  hrSettings: (id: string | number) => `/hrms/employees/${id}/edit/hr-settings`,
  documents: (id: string | number) => `/hrms/employees/${id}/edit/documents`,
  jobPositions: "/hrms/employee-job-positions",

  //#region Attendance & Leave
  attendances: "/hrms/attendances",
  employeeAttendanceDetails: (id: number) => `/hrms/attendances/${id}`,
  employeeLeaveCalendar: (id: number) => `/hrms/attendances/${id}/calendar`,
  leaveTimeOff: "/hrms/time-off",
  holidayCalendar: "/hrms/holiday-calendar",
  offDays: "/hrms/off-days",
  createOffDays: "/hrms/off-days/add-off-days",
  leaveRequest: "/hrms/leave-requests",
  leaveAllocations: "/hrms/leave-allocations",
  reconciliationRequests: "/hrms/reconciliation-requests",
  attendanceSettingItems: "/hrms/attendance-setting-items/leave-types",
  leaveType: "/hrms/leave-types",
  leaveAllocationType: "/hrms/leave-allocation-types",
  //#endregion

  //#region Saudization
  saudization: "/hrms/saudization",
  saudizationSettings: "/hrms/saudization-settings",
  saudizationReports: "/hrms/saudization/reports",
  //#endregion

  //#region Recruitment & Onboarding
  recruitment: "/hrms/recruitment",
  addNewRecruitment: "/hrms/recruitment/add-new-recruitment",
  editRecruitment: (id: string | number) => `/hrms/recruitment/${id}/edit`,
  openPositions: "/hrms/recruitment/open-positions",
  applicants: "/hrms/recruitment/applicants",
  addNewApplicant: "/hrms/recruitment/add-new-applicant",
  editApplicant: (id: string | number) =>
    `/hrms/recruitment/applicants/${id}/edit`,
  recruitmentDetails: (id: string | number) =>
    `/hrms/recruitment/recruitment-details/${id}`,
  applications: "/hrms/recruitment/applications",
  addNewApplication: "/hrms/recruitment/add-new-application",
  applicationDetails: (id: string | number) =>
    `/hrms/recruitment/application-details/${id}`,
  salaryCategory: "/hrms/payroll-configuration/salary/salary-category",
  salaryRules: "/hrms/payroll-configuration/salary/salary-rules",
  salaryStructureType:
    "/hrms/payroll-configuration/salary/salary-structure-type",
  salaryStructures: "/hrms/payroll-configuration/salary/salary-structures",
  createSalaryStructure:
    "/hrms/payroll-configuration/salary/salary-structures/create",
  editSalaryStructure: (id: string | number) =>
    `/hrms/payroll-configuration/salary/salary-structures/${id}/edit`,
  employeeContracts: "/hrms/payroll/employee-contract",
  createContract: "/hrms/payroll/employee-contract/create",
  editContract: (id: string | number) =>
    `/hrms/payroll/employee-contract/${id}/edit`,
  viewContract: (id: string | number) =>
    `/hrms/payroll/employee-contract/${id}/view`,
  appraisals: "/hrms/appraisal/appraisals",
  appraisalTemplate: "/hrms/appraisal/appraisal-templates",
  createAppraisalTemplate: "/hrms/appraisal/appraisal-templates/create",
  editAppraisalTemplate: (id: string | number) =>
    `/hrms/appraisal/appraisal-templates/${id}/edit`,
  createAppraisal: "/hrms/appraisal/appraisals/create",
  editAppraisal: (id: string | number) =>
    `/hrms/appraisal/appraisals/${id}/edit`,
  appraisalFeedback: "/hrms/appraisal/appraisal-feedback",
  payslip: "/hrms/payroll/payslip",
  createPayslip: "/hrms/payroll/payslip/create",
  editPayslip: (id: string | number) => `/hrms/payroll/payslip/${id}/edit`,
  viewPayslip: (id: string | number) => `/hrms/payroll/payslip/view/${id}`,
  printPayslip: (id: string | number) => `/hrms/payroll/payslip/${id}/print`,
  goals: "/hrms/appraisal/goals",
  createGoal: "/hrms/appraisal/goals/create",
  editGoal: (id: string | number) => `/hrms/appraisal/goals/${id}/edit`,
  folders: "/hrms/file-management/folders",
  createFolder: "/hrms/file-management/folders/create",
  allFiles: (id: string | number) => `/hrms/file-management/${id}/files`,
  trainingProgram: "/hrms/training/training-program",
  createTrainingProgram: "/hrms/training/training-program/create",
  editTrainingProgram: (id: string | number) =>
    `/hrms/training/training-program/${id}/edit`,
  trainingSession: "/hrms/training/training-session",
  createTrainingSession: "/hrms/training/training-session/create",
  editTrainingSession: (id: string | number) =>
    `/hrms/training/training-session/${id}/edit`,
  paymentEntry: (id: string | number) => `/hrms/payroll/payment/${id}`,
  paymentRequest: (id: string | number) =>
    `/hrms/payroll/payment-request/${id}`,
  participants: "/hrms/training/participants",
  attendance: "/hrms/training/training-attendance",
  trainingFeedbacks: "/hrms/training/training-feedbacks",
  leaveCalendar: "/hrms/attendances/leave-calendar",
  editWorkAddress: (id: string | number) =>
    `/hrms/employee-setting-items/work-addresses/${id}`,
  createWorkAddress: "/hrms/employee-setting-items/work-addresses/create",
  viewWorkAddress: (id: string | number) =>
    `/hrms/employee-setting-items/work-addresses/${id}/details`,
  reports: "/hrms/reports",
  employeeMonthlyReport: "/hrms/reports/employee-monthly-report",
  employeeAttendanceReport: "/hrms/reports/employee-attendance-report",
  employeeLeaveRequestReport: "/hrms/reports/employee-leave-request-report",
  yearlyOffDaysReport: "/hrms/reports/yearly-off-days-report",
  saudiEmployeeMonthlyReport: "/hrms/reports/saudi-employee-monthly-report",
  expatriatesMonthlyReport: "/hrms/reports/expatriates-monthly-report",
  documentation: "/hrms/documentation",
  //#endregion
}
