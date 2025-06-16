import { Campaign } from "@prisma/client";
import { CampaignsRepository, CreateCampaignsAttributes } from "../CampaignsRepository"
import { prisma } from "../../database";

export class PrismaCampaignseRepository implements CampaignsRepository {
    find(): Promise<Campaign[]> {
        return prisma.campaign.findMany()
    }
    findById(id: number): Promise<Campaign | null> {
        return prisma.campaign.findUnique({ 
            where: { id },
            include:{
                leads: true
            }
        })
    }
    create(attributes: CreateCampaignsAttributes): Promise<Campaign> {
        return prisma.campaign.create({ data: attributes })
    }
    updateById(id: number, attributes: Partial<CreateCampaignsAttributes>): Promise<Campaign | null> {
        return prisma.campaign.update({
            data: attributes,
            where: { id }
        })
    }
    deleteById(id: number): Promise<Campaign | null> {
        return prisma.campaign.delete({ where: { id } })
    }

}