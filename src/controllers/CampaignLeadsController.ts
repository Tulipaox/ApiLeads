import { Handler } from "express";
import { AddLeadRequesSchema, GetCampaignLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/CampaingsRequestSchema";
import { CampaignsLeadsService } from "../services/CampaignsLeadsService";

export class CampaignsLeadsController {

    constructor(private readonly campaignLeadService: CampaignsLeadsService) {}

    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignsId = +req.params.campaignId
            const query = GetCampaignLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query
            
            const result = await this.campaignLeadService.getAllCampaignLead(campaignsId, {
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
            const body = AddLeadRequesSchema.parse(req.body)
            await this.campaignLeadService.addLead(+req.params.campaignId, body)
            res.status(201).end()
        } catch (error) {
            next(error)
        }
    }

    updateLeadStatus: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const leadId = +req.params.leadId
            const { status } = UpdateLeadRequestSchema.parse(req.body)
            const updatedLeadCampaign = this.campaignLeadService.updateLeadStatus(campaignId, leadId, status)
            res.json(updatedLeadCampaign)
        } catch (error) {
            next(error)
        }
    }

    deleteLead: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const leadId = +req.params.leadId
            const removedLead = this.campaignLeadService.deleteLead(campaignId, leadId)
            res.json({ removedLead })
        } catch (error) {
            next(error)
        }
    }
}