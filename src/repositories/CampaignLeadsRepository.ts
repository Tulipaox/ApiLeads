import { LeadCampaign } from "@prisma/client";

export type LeadCampaignStatus =  "New" | "Engaged" | "FolloUp_Scheduled" | "Contacted" | "Qualified" | "Converted" | "Unresponsive" | "Disqualified" | "Re_Engaged" | "Opted_Out"

export interface CreateCampaingLeadsAtrributes {
    leadId: number
    status?: LeadCampaignStatus 
}

export interface CampaignLeadsRepository {
    addLead: (campaignId: number, attributes: CreateCampaingLeadsAtrributes) => Promise<LeadCampaign>
    updateLeadStatus: (campaignId: number, leadId: number, status: Partial<LeadCampaignStatus>) => Promise<LeadCampaign | null>
    deleteLead: (campaignId: number, leadId: number) => Promise<LeadCampaign | null>
}