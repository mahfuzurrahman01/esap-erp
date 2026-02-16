import { z } from "zod"

export const trainingFeedbackFormSchema = z.object({
  id: z.number().optional(),
  sessionId: z.number({
    required_error: "form-session-id-is-required",
  }),
  participantId: z.number({
    required_error: "form-participant-id-is-required",
  }),
  trainerId: z.number({
    required_error: "form-trainer-id-is-required",
  }),
  rating: z.enum(["Not Good", "Good", "Better", "Best"], {
    required_error: "form-rating-is-required",
  }),
  comments: z.string().optional(),
})

export type TrainingFeedbackFormInput = z.infer<
  typeof trainingFeedbackFormSchema
>
