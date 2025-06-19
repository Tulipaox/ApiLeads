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
import { GroupsServices } from "./services/GroupsServices";
import { CampaignServices } from "./services/CampaignsServices";
import { GroupLeadService } from "./services/GroupLeadServices";
import { CampaignsLeadsService } from "./services/CampaignsLeadsService";


export const leadsRepository = new PrismaLeadsRepository
export const groupsRepository = new PrismaGroupsRepository
export const campaignsRepository = new PrismaCampaignseRepository
export const campaignLeadsRepository = new PrismaCampaignsLeadsRepository

export const leadService = new LeadsService(leadsRepository)
export const groupService = new GroupsServices(groupsRepository)
export const campaignService = new CampaignServices(campaignsRepository)
export const groupLeadSerice = new GroupLeadService(groupsRepository, leadsRepository)
export const camapaignLeadService = new CampaignsLeadsService(campaignLeadsRepository, leadsRepository)

export const leadsController = new LeadsController(leadService)
export const groupsController = new GroupsController(groupService)
export const groupsLeadsController = new GroupLeadsController(groupLeadSerice)
export const campaignsController = new CampaignsController(campaignService)
export const campaignsLeadsController = new CampaignsLeadsController(camapaignLeadService)