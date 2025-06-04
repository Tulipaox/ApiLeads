import { Handler } from "express";
import { CreateCampaingsRequestSchema, UpdateCampaingsRequestSchema } from "./schemas/CampaingsRequestSchema";
import { Prisma } from "@prisma/client";
import { prisma } from "../database";
import { HttpError } from "../erros/HttpError";

export class CampaignsController {
    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await prisma.campaign.findMany()
            res.json(campaigns)
        } catch (error) {
            next(error)
        }
    }
    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaingsRequestSchema.parse(req.body)
            const newCampaing = await prisma.campaign.create({
                data: body
            })
            res.status(201).json(newCampaing)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaign = await prisma.campaign.findUnique({
                where: { id: +req.params.id },
                include: {
                    leads: {
                        include: {
                            lead: true
                        }
                    }
                }
            })

            if (!campaign) throw new HttpError(404, "campaing not found!")

            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const body = UpdateCampaingsRequestSchema.parse(req.body)
            const campaingExist = await prisma.campaign.findUnique({ where: { id } })

            if (!campaingExist) throw new HttpError(404, "campaing not found!")

            const updateCampaing = await prisma.campaign.update({
                data: body,
                where: { id }
            })
            res.json(updateCampaing)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const campaingExist = await prisma.campaign.findUnique({ where: { id: +req.params.id } })
            if (!campaingExist) throw new HttpError(404, "campaing not found!")

            const deleteCampaing = await prisma.campaign.delete({
                where: { id: +req.params.id }
            })
            res.json({ message: "lead deleted successfully", deleteCampaing });
        } catch (error) {
            next(error)
        }
    }
}