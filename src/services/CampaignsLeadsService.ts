import { CampaignLeadsRepository, CreateCampaingLeadsAtrributes, LeadCampaignStatus } from "../repositories/CampaignLeadsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";


export interface GetCampaignLeadWithPaginationParams {
    page?: number,
    pageSize?: number,
    name?: string,
    status?: LeadCampaignStatus,
    sortBy?: "name" | "status" | "createdAt",
    order?: "asc" | "desc"
}


export class CampaignsLeadsService {

    constructor(
        private readonly CampaignLeadsRepository: CampaignLeadsRepository,
        private readonly leadsRepository: LeadsRepository) { }

    async getAllCampaignLead(campaignsId: number, params: GetCampaignLeadWithPaginationParams) {
        const { name, page = 1, pageSize = 10, status, sortBy, order } = params
        const limit = Number(pageSize)
        const offset = (Number(page) - 1) * limit

        const where: LeadWhereParams = { campaignsId }

        if (name) where.name = { like: name, mode: "insensitive" }
        if (status) where.campaignsId

        const leads = await this.leadsRepository.find({ where, sortBy, order, limit, offset, include: { campaigns: true } })
        const total = await this.leadsRepository.count(where)

        return ({
            leads,
            meta: {
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    }

    async addLead(id:number, params: CreateCampaingLeadsAtrributes) {
        return await this.CampaignLeadsRepository.addLead(id, params)
    }

    async updateLeadStatus(campaignId: number, leadId: number, status: LeadCampaignStatus){
        return await this.CampaignLeadsRepository.updateLeadStatus(campaignId, leadId, status)
    }

    async deleteLead(campaignId:number, leadId: number){
         this.CampaignLeadsRepository.deleteLead(campaignId, leadId)
    }
}