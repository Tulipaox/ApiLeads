import { LeadCampaign } from "@prisma/client";
import { CampaignLeadsRepository, CreateCampaingLeadsAtrributes, LeadCampaignStatus } from "../CampaignLeadsRepository";
import { prisma } from "../../database";

export class PrismaCampaignsLeadsRepository implements CampaignLeadsRepository {
    addLead(campaignId: number, attributes: CreateCampaingLeadsAtrributes): Promise<LeadCampaign> {
        return prisma.leadCampaign.create({
            data: {
                campaignId: campaignId,
                leadId: attributes.leadId,
                status: attributes.status
            }
        })
    }
    updateLeadStatus(campaignId: number, leadId: number, status: Partial<LeadCampaignStatus>): Promise<LeadCampaign | null> {
        return prisma.leadCampaign.update({
            data: {
                status: status
            },
            where: {
                leadId_campaignId: {
                    campaignId,
                    leadId
                }
            }
        })
    }

    deleteLead(campaignId: number, leadId: number): Promise<LeadCampaign | null> {
        return prisma.leadCampaign.delete({
            where: {
                leadId_campaignId: {
                    campaignId,
                    leadId
                }
            }
        })
    }
}