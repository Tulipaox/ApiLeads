import { Handler } from "express";
import { CreateCampaingsRequestSchema, UpdateCampaingsRequestSchema } from "./schemas/CampaingsRequestSchema";
import { HttpError } from "../erros/HttpError";
import { CampaignServices } from "../services/CampaignsServices";

export class CampaignsController {
    constructor(private readonly campaignsServices: CampaignServices) {}

    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await this.campaignsServices.getAllCampaings()
            res.json(campaigns)
        } catch (error) {
            next(error)
        }
    }
    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaingsRequestSchema.parse(req.body)
            const newCampaing = await this.campaignsServices.createCampaign(body)
            res.status(201).json(newCampaing)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaign = await this.campaignsServices.getCampaignShow(+req.params.id)
            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateCampaingsRequestSchema.parse(req.body)
            const updateCampaing = await this.campaignsServices.upadateCamapign(+req.params.id, body)
            res.json(updateCampaing)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const deleteCampaing = await this.campaignsServices.deleteCampaign(+req.params.id)
            res.json({ message: "lead deleted successfully", deleteCampaing });
        } catch (error) {
            next(error)
        }
    }
}