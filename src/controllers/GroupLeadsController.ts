import { Handler } from "express";
import { GetLeadsRequestSchema } from "./schemas/LeadsrequestSchema";
import { AddLeadRequestSchema } from "./schemas/GroupsRequestSchema";
import { GroupLeadService } from "../services/GroupLeadServices";

export class GroupLeadsController {
    constructor(private readonly groupsLeadsServices: GroupLeadService) { }

    getLeads: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params.groupId)
            const query = GetLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query
            
            const result = await this.groupsLeadsServices.getAllGroupsLeads(groupId, {
                name,
                status,
                page: +page,
                pageSize: +pageSize,
                sortBy,
                order
            })

            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    addLead: Handler = async (req, res, next) => {
        try {
            const { leadId } = AddLeadRequestSchema.parse(req.body)
            const groupId = +req.params.groupId
            const updatedGroup = await this.groupsLeadsServices.addLead(groupId, leadId)
            res.status(201).json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }
    removeLead: Handler = async (req, res, next) => {
        try {
            const groupId = +req.params.groupId
            const leadId = +req.params.leadId
            const updatedGroup = await this.groupsLeadsServices.removeLead(groupId, leadId)
            res.json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }
}