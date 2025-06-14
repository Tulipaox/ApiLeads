import { Group } from "@prisma/client";
import { CreateGroupAttributes, GroupsRepository } from "../GroupsRepository";
import { prisma } from "../../database";

export class PrismaGroupsRepository implements GroupsRepository {
    find(): Promise<Group[]> {
        return prisma.group.findMany()
    }

    findById(id: number): Promise<Group | null> {
        return prisma.group.findUnique({
            where: { id },
            include: {
                leads: true
            }
        })
    }
    create(attributes: CreateGroupAttributes): Promise<Group> {
        return prisma.group.create({ data: attributes })
    }

    updateById(id: number, attributes: Partial<CreateGroupAttributes>): Promise<Group | null> {
        return prisma.group.update({ data: attributes, where: { id } })
    }

    deleteById(id: number): Promise<Group | null> {
        return prisma.group.delete({ where: { id } })
    }
}