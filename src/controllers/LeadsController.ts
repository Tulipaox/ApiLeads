import { Handler } from "express";
import { HttpError } from "../erros/HttpError";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadsrequestSchema";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

export class LeadsController {
    private leadsRepository: LeadsRepository 

    constructor(leadsRepository: LeadsRepository) {
        this.leadsRepository = leadsRepository
    }

    index: Handler = async (req, res, next) => {
        try {
            const query = GetLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const limit = Number(pageSize)
            const offset = (Number(page) - 1) * limit

            const where: LeadWhereParams= {}

            if (name) where.name = { like: name, mode: "insensitive" }
            if (status) where.status = status

            const leads = await this.leadsRepository.find({ where, sortBy, order, limit, offset })
            const total = await this.leadsRepository.count( where )

            // const leads = await prisma.lead.findMany({
            //     where,
            //     skip: (pageNumber - 1) * pageSizeNumber,
            //     take: pageSizeNumber,
            //     orderBy: { [sortBy]: order } // exm: orderBy: "name": order: "asc"
            // })

            // const total = await prisma.lead.count({ where })

            res.json({
                data: leads,
                meta: {
                    page: Number(page),
                    pageSize: limit,
                    total,
                    totalPage: Math.ceil(total / limit)
                }
            })
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSchema.parse(req.body)
            if(!body.status) body.status = "New"
            const newLead = await this.leadsRepository.create(body)
            // const newLead = await prisma.lead.create({
            //     data: body
            // })
            res.status(201).json(newLead)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const lead = await this.leadsRepository.findById(+req.params.id)
            // const lead = await prisma.lead.findUnique({
            //     where: { id: +req.params.id },
            //     include: {
            //         group: true,
            //         campaigns: true
            //     }
            // })

            if (!lead) throw new HttpError(404, "lead not found!")

            res.json(lead)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const body = UpdateLeadRequestSchema.parse(req.body)
            // const leadExist = await prisma.lead.findUnique({ where: { id } })
            const leadExist = await this.leadsRepository.findById(id)

            if (!leadExist) throw new HttpError(404, "lead not found!")

            if(leadExist.status === "New" && body.status !== undefined && body.status !== "Contacted"){
                throw new HttpError(400, "A new lead must be contacted before their status is updated ")
            }    

            if(body.status && body.status === "Archived") {
                const now = new Date()
                const diffTime = Math.abs(now.getTime() - leadExist.updatedAt.getTime())
                const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                if(diffDay < 180) throw new HttpError(400, "A lead can only be archived after 6 months of inactivity")
            }

            const updateLead = await this.leadsRepository.updateById(id, body)
            // const updateLead = await prisma.lead.update({
            //     data: body,
            //     where: { id }
            // })
            res.json(updateLead)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const leadExist = await this.leadsRepository.findById(+req.params.id)
            if (!leadExist) throw new HttpError(404, "lead not found!")
            
            const deleteLead = await this.leadsRepository.deleteById(+req.params.id)   
            // const deleteLead = await prisma.lead.delete({
            //     where: { id: +req.params.id }
            // })
            res.json({ message: "lead deleted successfully", deleteLead });
        } catch (error) {
            next(error)
        }
    }
}

