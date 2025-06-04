import { Handler } from "express";
import { prisma } from "../database";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupsRequestSchema";
import { HttpError } from "../erros/HttpError";

export class GroupsController {
    index: Handler = async (req, res, next) => {
        try {
            const groups = await prisma.group.findMany()
            res.json(groups)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body)
            const newGroup = await prisma.group.create({ data: body })
            res.status(201).json(newGroup)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const group = await prisma.group.findUnique({
                where: { id: Number(req.params.id) },
                include: { leads: true }
            })

            if (!group) throw new HttpError(404, "Group not found!")
            res.json(group)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const groupsExist = await prisma.group.findUnique({ where: { id } })
            const body = UpdateGroupRequestSchema.parse(req.body)

            if (!groupsExist) throw new HttpError(404, "Group not found!")

            const updateGroup = await prisma.group.update({
                data: body,
                where: { id }
            })

            res.json(updateGroup)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const groupsExist = await prisma.group.findUnique({ where: { id } })
            if (!groupsExist) throw new HttpError(404, "Group not found!")
            const deleteGroup = await prisma.group.delete({ where: { id } })
            res.json(deleteGroup)
        } catch (error) {
            next(error)
        }
    }
}