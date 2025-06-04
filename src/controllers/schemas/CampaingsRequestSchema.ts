import { z } from "zod";

export const CreateCampaingsRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date()
})

export const UpdateCampaingsRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
})