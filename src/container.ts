import { LeadsController } from "./controllers/LeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignsController";
import { CampaignsLeadsController } from "./controllers/CampaignLeadsController";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";

export const leadsRepository = new PrismaLeadsRepository
export const leadsController = new LeadsController(leadsRepository)
export const groupsController = new GroupsController()
export const campaignsController = new CampaignsController()
export const campaignsLeadsController = new CampaignsLeadsController()