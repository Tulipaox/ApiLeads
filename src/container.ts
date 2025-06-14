import { LeadsController } from "./controllers/LeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignsController";
import { CampaignsLeadsController } from "./controllers/CampaignLeadsController";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";
import { PrismaGroupsRepository } from "./repositories/prisma/PrismaGroupsRepository";

export const leadsRepository = new PrismaLeadsRepository
export const groupsRepository = new PrismaGroupsRepository

export const leadsController = new LeadsController(leadsRepository)
export const groupsController = new GroupsController(groupsRepository)
export const campaignsController = new CampaignsController()
export const campaignsLeadsController = new CampaignsLeadsController()