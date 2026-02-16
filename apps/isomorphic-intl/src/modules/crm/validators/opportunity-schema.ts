import { z } from "zod";

import { messages } from "@/config/messages";

export const opportunityFormSchema = z.object({
  leadId: z.string().optional(),
  customerId: z.string().optional(),
  closingDate: z.string().optional(),
  amount: z.any().optional(),
  probability: z.any().optional(),
  type: z.string().min(1, messages.thisFieldIsRequired),
  status: z.string().optional(),
  description: z.string().optional(),
  primaryContact: z.string().optional(),
  stage: z.string().optional(),
  dealOwner: z.string().min(1, messages.thisFieldIsRequired),
  name: z.string().min(1, messages.thisFieldIsRequired),
  leadSource: z.string().optional(),
  campaignId: z.string().optional(),
  nextStep: z.string().optional(),
  forecastedRevenue: z.any().optional(),
});

export type OpportunityFormTypes = z.infer<typeof opportunityFormSchema>;