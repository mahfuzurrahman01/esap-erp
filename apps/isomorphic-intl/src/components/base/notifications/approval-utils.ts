// utils/approval.ts
import { UseMutationResult } from "@tanstack/react-query"

import { typeLabels } from "@/data/crm/common-column"

export async function sendForApproval(
  createApproval: UseMutationResult<any, Error, any, any>,
  createNotification: UseMutationResult<any, Error, any, any>,
  referenceId: string,
  referenceName: string,
  type: number
) {
  await createApproval.mutateAsync({
    type,
    referenceId,
    referenceName,
  })
  await createNotification.mutateAsync({
    title: `${typeLabels[type]} sent for approval`,
    type: typeLabels[type],
    referenceId,
    status: 2, // 2 for unread
  })
}

export async function responseForApproval(
  updateApproval: UseMutationResult<any, Error, any, any>,
  referenceId: string,
  approvalStatus: string,
  type: number
) {
  await updateApproval.mutateAsync({
    type,
    referenceId,
    approvalStatus,
  })
}

export async function responseForNotification(
  updateNotification: UseMutationResult<any, Error, any, any>,
  id: string
) {
  await updateNotification.mutateAsync({
    id,
    data: { status: "1" },
  })
}
