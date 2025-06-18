import { LeadsController } from "./controllers/LeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { CampaignsController } from "./controllers/CampaignsController";
import { CampaignsLeadsController } from "./controllers/CampaignLeadsController";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";
import { PrismaGroupsRepository } from "./repositories/prisma/PrismaGroupsRepository";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { PrismaCampaignseRepository } from "./repositories/prisma/PrismaCampaignsRepository";
import { PrismaCampaignsLeadsRepository } from "./repositories/prisma/PrismaCampaignsLeadsRepository";
import { LeadsService } from "./services/LeadsService";

export const leadsRepository = new PrismaLeadsRepository
export const groupsRepository = new PrismaGroupsRepository
export const campaignsRepository = new PrismaCampaignseRepository
export const campaignLeadsRepository = new PrismaCampaignsLeadsRepository

export const leadService = new LeadsService(leadsRepository)

export const leadsController = new LeadsController(leadService)
export const groupsController = new GroupsController(groupsRepository)
export const groupsLeadsController = new GroupLeadsController(groupsRepository, leadsRepository)
export const campaignsController = new CampaignsController(campaignsRepository)
export const campaignsLeadsController = new CampaignsLeadsController(campaignLeadsRepository, leadsRepository)