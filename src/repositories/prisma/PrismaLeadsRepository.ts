import { Lead } from "@prisma/client";
import { CreateLeadAttributes, FindLeadsParams, LeadsRepository, LeadWhereParams } from "../LeadsRepository";
import { prisma } from "../../database";

export class PrismaLeadsRepository implements LeadsRepository {
    async find(params: FindLeadsParams): Promise<Lead[]> {
        return prisma.lead.findMany({
            where: {
                name: {
                    contains: params.where?.name?.like,
                    equals: params.where?.name?.equals,
                    mode: params.where?.name?.mode
                },
                status: params.where?.status,
                group:{
                    some: {
                        id: params.where?.groupId
                    }
                },
                campaigns: {
                    some: {
                        campaignId: params.where?.campaignsId
                    }
                }
            },
            orderBy: { [params.sortBy ?? "name"]: params.order },
            skip: params.offset,
            take: params.limit,
            include: {
                group: params.include?.groups,
                campaigns: params.include?.campaigns
            }
        })
    }

    async findById(id: number): Promise<Lead | null> {
        return prisma.lead.findUnique({
           where: {id},
           include: {
            campaigns: true,
            group: true
           } 
        })
    }

    async count(where: LeadWhereParams): Promise<number>{
        return prisma.lead.count({
            where: {
                name: {
                    contains: where?.name?.like,
                    equals: where?.name?.equals,
                    mode: where?.name?.mode
                },
                status: where?.status,
                group: {
                    some: {
                        id: where?.groupId
                    }
                }
        }})
    }

    async create(attributes: CreateLeadAttributes): Promise<Lead>{
        return prisma.lead.create({
            data: attributes
        })
    }

    async updateById(id: number, attributes: Partial<CreateLeadAttributes>): Promise<Lead | null>{
        return prisma.lead.update({
            data: attributes,
            where: { id }
        })
    }

    async deleteById(id: number): Promise<Lead | null>{
        return prisma.lead.delete({
            where: { id }
        })
    }

}