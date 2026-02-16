"use client"

// Appraisal
export {
  useAppraisalList,
  useCreateAppraisal,
  useUpdateAppraisal,
  useDeleteAppraisal,
} from "./appraisal/use-appraisal"

export {
  useGoalList,
  useCreateGoal,
  useUpdateGoal,
  useDeleteGoal,
} from "./appraisal/use-goals"

export {
  useAppraisalTemplateList,
  useCreateAppraisalTemplate,
  useUpdateAppraisalTemplate,
  useDeleteAppraisalTemplate,
} from "./appraisal/use-appraisal-templates"

// Saudization
export {
  useSaudization,
  useSendSaudizationEmail,
} from "./saudization/use-saudization"

// Attendance and Leave
export {
  useLeaveTypeList,
  useCreateLeaveType,
  useUpdateLeaveType,
  useDeleteLeaveType,
} from "./attendance-and-leave/use-leave-type"

export {
  useReconciliationList,
  useReconciliationById,
  useCreateReconciliation,
  useReconciliationApproval,
  useDeleteReconciliation,
  useBulkDeleteReconciliation,
} from "./attendance-and-leave/use-reconciliation"

export {
  useOffDayList,
  useCreateOffDay,
  useUpdateOffDay,
  useDeleteOffDay,
} from "./attendance-and-leave/use-off-day"

export {
  useLeaveRequestList,
  useCreateLeaveRequest,
  useLeaveRequestApproval,
  useDeleteLeaveRequest,
} from "./attendance-and-leave/use-leave-request"

export {
  useLeaveAllocationList,
  useCreateLeaveAllocation,
  useUpdateLeaveAllocation,
  useDeleteLeaveAllocation,
} from "./attendance-and-leave/use-leave-allocation"

export {
  useAttendanceList,
  useAttendanceById,
  useCreateAttendanceCheckIn,
  useCreateAttendanceCheckOut,
  useUpdateAttendance,
  useDeleteAttendance,
  useBulkDeleteAttendance,
} from "./attendance-and-leave/use-attendance-list"

export { useEmployeeAttendanceList } from "./attendance-and-leave/use-employee-attendance"

// Employee
export {
  useEmployeeList,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
} from "./employee/use-employee"

export {
  useWorkingScheduleList,
  useCreateWorkingSchedule,
  useUpdateWorkingSchedule,
  useDeleteWorkingSchedule,
  useBulkDeleteWorkingSchedule
} from "./employee/use-work-schedule"

export {
  useWorkAddressList,
  useCreateWorkAddress,
  useUpdateWorkAddress,
  useDeleteWorkAddress,
  useBulkDeleteWorkAddress
} from "./employee/use-work-address"

export {
  useJobPositionList,
  useCreateJobPosition,
  useUpdateJobPosition,
  useDeleteJobPosition,
} from "./employee/use-job-positions"

export {
  useResumeTypeList,
  useCreateResumeType,
  useUpdateResumeType,
  useDeleteResumeType,
} from "./employee/use-resume-type"

export {
  useEmploymentTypeList,
  useCreateEmploymentType,
  useUpdateEmploymentType,
  useDeleteEmploymentType,
} from "./employee/use-employment-type"

export {
  useEmployeeTypeList,
  useCreateEmployeeType,
  useUpdateEmployeeType,
  useDeleteEmployeeType,
} from "./employee/use-employee-type"

export {
  useDepartmentList,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
} from "./employee/use-department"

export {
    useWorkInfoById,
  useCreateWorkInfo,
  useUpdateWorkInfo,
} from "./employee/use-work"

export {
  useResumeById,
  useCreateResume,
  useUpdateResume,
  useDeleteResume,
} from "./employee/use-resume"

export {
  usePrivateInfoById,
  useCreatePrivateInfo,
  useUpdatePrivateInfo,
} from "./employee/use-private"

// Payroll
export {
  useEmployeeContractList,
  useCreateEmployeeContract,
  useEmployeeContractById,
  useEmployeeContractByEmployeeId,
  useUpdateEmployeeContract,
  useDeleteEmployeeContract,
} from "./payroll/use-employee-contract"

export {
  usePayslipList,
  usePayslipById,
  useCreatePayslip,
  useUpdatePayslip,
  useDeletePayslip,
} from "./payroll/use-payslip"

// Payroll Configuration
export {
  useSalaryStructureList,
  useCreateSalaryStructure,
  useUpdateSalaryStructure,
  useDeleteSalaryStructure,
} from "./payroll-configuration/use-salary-structures"

export {
  useSalaryStructureTypeList,
  useCreateSalaryStructureType,
  useUpdateSalaryStructureType,
  useDeleteSalaryStructureType,
} from "./payroll-configuration/use-salary-structure-type"

export {
  useSalaryCategoryList,
  useCreateSalaryCategory,
  useUpdateSalaryCategory,
  useDeleteSalaryCategory,
} from "./payroll-configuration/use-salary-category"

export {
  useSalaryRuleList,
  useCreateSalaryRule,
  useUpdateSalaryRule,
  useDeleteSalaryRule,
} from "./payroll-configuration/use-salary-rules"

// Recruitment
export {
  useApplicationList,
  useCreateApplication,
  useUpdateApplicationStatus,
  useDeleteApplication,
} from "./recruitment/use-applications"

export {
  useRecruitmentList,
  useCreateRecruitment,
  useUpdateRecruitment,
  useDeleteRecruitment,
} from "./recruitment/use-recruitment"

// Common Hooks
export { useTimezoneOptions } from "../use-timezone-options"
export { useCountryList } from "../use-countries"
export { default as useDebounce } from "../use-debounce"
export { useQueryParams } from "../use-query-params"
export { useSelectOptions } from "../use-select-options"
export { useTableDelete } from "../use-table-delete"
export { useUniqueSelectOptions } from "../use-unique-select-options"
