import { Handler } from "express";
import { prisma } from "../database";
import { HttpError } from "../erros/HttpError"; 
import { Prisma } from "@prisma/client";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadsrequestSchema";

export class LeadsController {
    index: Handler = async (req, res, next) => {
        try {
            const query = GetLeadsRequestSchema.parse(req.query)
            const { page= "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const pageNumber = Number(page)
            const pageSizeNumber = Number(pageSize)

            const where: Prisma.LeadWhereInput = {}

            if(name) where.name = { contains: name, mode: "insensitive" }
            if(status) where.status = status

            const leads = await prisma.lead.findMany({
                where,
                skip: (pageNumber -1) * pageSizeNumber,
                take: pageSizeNumber,
                orderBy: { [sortBy]: order } // exm: orderBy: "name": order: "asc"
            })

            const total = await prisma.lead.count({ where })

            res.json({
                data: leads,
                meta: {
                    page: pageNumber,
                    pageSize: pageSizeNumber,
                    total,
                    totalPage: Math.ceil(total / pageSizeNumber)
                }
            })
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSchema.parse(req.body)
            const newLead = await prisma.lead.create({
                data: body
            })
            res.status(201).json(newLead)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const lead = await prisma.lead.findUnique({
                where: { id: +req.params.id },
                include: {
                    group: true,
                    campaigns: true
                }
            })

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
            const leadExist = await prisma.lead.findUnique({ where: { id } })

            if (!leadExist) throw new HttpError(404, "lead not found!")

            const updateLead = await prisma.lead.update({
                data: body,
                where: { id }
            })
            res.json(updateLead)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const leadExist = await prisma.lead.findUnique({ where: { id: +req.params.id } })
            if (!leadExist) throw new HttpError(404, "lead not found!")

            const deleteLead = await prisma.lead.delete({
                where: { id: +req.params.id }
            })
            res.json({ message: "lead deleted successfully", deleteLead });
        } catch (error) {
            next(error)
        }
    }
}

