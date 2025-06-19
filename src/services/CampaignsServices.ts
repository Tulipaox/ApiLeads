import { HttpError } from "../erros/HttpError";
import { CampaignsRepository, CreateCampaignsAttributes } from "../repositories/CampaignsRepository";

export class CampaignServices {

    constructor(private readonly campaignsRepository: CampaignsRepository) { }

    async getAllCampaings() {
        return await this.campaignsRepository.find()
    }

    async createCampaign(params: CreateCampaignsAttributes) {
        return await this.campaignsRepository.create(params)
    }

    async getCampaignShow(id: number) {
        const campaign = await this.campaignsRepository.findById(id)
        if (!campaign) throw new HttpError(404, "campaing not found!")

        return campaign
    }

    async upadateCamapign(id: number, params: Partial<CreateCampaignsAttributes>) {
        const updateCampaing = this.campaignsRepository.updateById(id, params)
        if (!updateCampaing) throw new HttpError(404, "campaing not found!")

        return updateCampaing
    }

    async deleteCampaign(id: number) {
        const deleteCampaing = this.campaignsRepository.deleteById(id)
        if (!deleteCampaing) throw new HttpError(404, "campaing not found!")

        return deleteCampaing    
    }
}
