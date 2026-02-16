export interface SendEmailTypes {
  requisitionId?: number
  to?: string
  subject: string
  messageBody: string
  attachmentFile?: File
}
