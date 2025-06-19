
import { GroupsRepository } from "../repositories/GroupsRepository";
import { LeadsRepository, LeadWhereParams} from "../repositories/LeadsRepository";
import { GetLeadsWithPaginationParams } from "./LeadsService";


export class GroupLeadService {
    constructor(
        private readonly groupsRepository: GroupsRepository,
        private readonly leadsRepository: LeadsRepository
    ) { }


    async getAllGroupsLeads(groupId: number, params: GetLeadsWithPaginationParams) {
        const { name, page = 1, pageSize = 10, status, sortBy, order } = params
        const limit = Number(pageSize)
        const offset = (Number(page) - 1) * limit

        const where: LeadWhereParams = { groupId }
        if (name) where.name = { like: name, mode: "insensitive" }
        if (status) where.status = status


        const leads = await this.leadsRepository.find({ where, sortBy, order, limit, offset, include: { group: true } })
        const total = await this.leadsRepository.count(where)

        console.log(where)

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

    async addLead(groupId: number, leadId: number) {
        return await this.groupsRepository.addLead(groupId, leadId)
    }

    async removeLead(groupId: number, leadId: number) {
        return await this.groupsRepository.removeLead(groupId, leadId)
    }
}