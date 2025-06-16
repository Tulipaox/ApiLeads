import { Handler } from "express";
import { Prisma } from "@prisma/client";
import { AddLeadRequesSchema, GetCampaignLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/CampaingsRequestSchema";
import { prisma } from "../database";
import { CampaignLeadsRepository } from "../repositories/CampaignLeadsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

export class CampaignsLeadsController {

    constructor(
        private readonly CampaignLeadsRepository: CampaignLeadsRepository,
        private readonly leadsRepository: LeadsRepository
    ) { }

    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignsId = +req.params.campaignId
            const query = GetCampaignLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const limit = Number(pageSize)
            const offset = (Number(page) - 1) * limit

            const where: LeadWhereParams = { campaignsId }

            if (name) where.name = { like: name, mode: "insensitive" }
            if (status) where.campaignsId

            const leads = await this.leadsRepository.find({ where, sortBy, order, limit, offset, include: { campaigns: true } })
            const total = await this.leadsRepository.count(where)

            res.json({
                leads,
                meta: {
                    page: Number(page),
                    pageSize: limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            })
        } catch (error) {
            next(error)
        }
    }

    addLead: Handler = async (req, res, next) => {
        try {
            const body = AddLeadRequesSchema.parse(req.body)
            await this.CampaignLeadsRepository.addLead(+req.params.campaignId, body)
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
            const updatedLeadCampaign = this.CampaignLeadsRepository.updateLeadStatus(campaignId, leadId, status)
            res.json(updatedLeadCampaign)
        } catch (error) {
            next(error)
        }
    }

    deleteLead: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const leadId = +req.params.leadId
            const removedLead = this.CampaignLeadsRepository.deleteLead(campaignId, leadId)
            res.json({ removedLead })
        } catch (error) {
            next(error)
        }
    }
}