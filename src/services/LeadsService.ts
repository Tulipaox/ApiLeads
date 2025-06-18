import { LeadStatus } from "@prisma/client"
import { CreateLeadAttributes, LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository"
import { HttpError } from "../erros/HttpError"

interface GetLeadsWithPaginationParams {
    page?: number,
    pageSize?: number,
    name?: string,
    status?: LeadStatus,
    sortBy?: "name" | "status" | "createdAt",
    order?: "asc" | "desc"
}

export class LeadsService {
    constructor(private readonly leadsRepository: LeadsRepository) { }
    async getAllLeadsPaginated(params: GetLeadsWithPaginationParams) {
        const { name, page = 1, pageSize = 10, status, sortBy, order } = params
        const limit = pageSize
        const offset = (page - 1) * limit

        const where: LeadWhereParams = {}

        if (name) where.name = { like: name, mode: "insensitive" }
        if (status) where.status = status

        const leads = await this.leadsRepository.find({ where, sortBy, order, limit, offset })
        const total = await this.leadsRepository.count(where)

        return {
            leads,
            meta: {
                page,
                pageSize,
                total,
                totalPage: Math.ceil(total / pageSize)
            }
        }
    }

    async createLead(params: CreateLeadAttributes) {
        if (!params.status) params.status = "New"
        const newLead = await this.leadsRepository.create(params)
        return newLead
    }

    async showLeads(id: number) {
        const lead = await this.leadsRepository.findById(id)
        if (!lead) throw new HttpError(404, "lead not found!")
        return lead
    }

    async updateLead(leadId: number, params: Partial<CreateLeadAttributes>) {
        const leadExist = await this.leadsRepository.findById(leadId)
        if (!leadExist) throw new HttpError(404, "lead not found!")

        if (leadExist.status === "New" && params.status !== undefined && params.status !== "Contacted") {
            throw new HttpError(400, "A new lead must be contacted before their status is updated ")
        }

        if (params.status && params.status === "Archived") {
            const now = new Date()
            const diffTime = Math.abs(now.getTime() - leadExist.updatedAt.getTime())
            const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            if (diffDay < 180) throw new HttpError(400, "A lead can only be archived after 6 months of inactivity")
        }

        const updateLead = await this.leadsRepository.updateById(leadId, params)
        return updateLead
    }

    async deleteLead(id: number) {
        const leadExist = await this.leadsRepository.findById(id)
        if (!leadExist) throw new HttpError(404, "lead not found!")
        const deleteLead = await this.leadsRepository.deleteById(id)
        return deleteLead
    }
}