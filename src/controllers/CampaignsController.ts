import { Handler } from "express";
import { CreateCampaingsRequestSchema, UpdateCampaingsRequestSchema } from "./schemas/CampaingsRequestSchema";
import { HttpError } from "../erros/HttpError";
import { CampaignsRepository } from "../repositories/CampaignsRepository";

export class CampaignsController {
    constructor(private readonly campaignsRepository: CampaignsRepository) {}

    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await this.campaignsRepository.find()
            res.json(campaigns)
        } catch (error) {
            next(error)
        }
    }
    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaingsRequestSchema.parse(req.body)
            const newCampaing = await this.campaignsRepository.create(body)
            res.status(201).json(newCampaing)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaign = await this.campaignsRepository.findById(+req.params.id)
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
            const updateCampaing = this.campaignsRepository.updateById(id, body)
            if (!updateCampaing) throw new HttpError(404, "campaing not found!")
            res.json(updateCampaing)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const deleteCampaing = this.campaignsRepository.deleteById(+req.params.id)
            if (!deleteCampaing) throw new HttpError(404, "campaing not found!")
            res.json({ message: "lead deleted successfully", deleteCampaing });
        } catch (error) {
            next(error)
        }
    }
}