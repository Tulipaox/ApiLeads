import { Handler } from "express";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupsRequestSchema";
import { HttpError } from "../erros/HttpError";
import { GroupsRepository } from "../repositories/GroupsRepository";

export class GroupsController {

    constructor(private readonly groupsRepository: GroupsRepository) { }

    index: Handler = async (req, res, next) => {
        try {
            const groups = await this.groupsRepository.find()
            res.json(groups)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body)
            const newGroup = await this.groupsRepository.create(body)
            res.status(201).json(newGroup)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const group = await this.groupsRepository.findById(+req.params.id)
            if (!group) throw new HttpError(404, "Group not found!")
            res.json(group)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const body = UpdateGroupRequestSchema.parse(req.body)
            const updateGroup = await this.groupsRepository.updateById(id, body)
            if (!updateGroup) throw new HttpError(404, "Group not found!")
            res.json(updateGroup)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const deleteGroup = await this.groupsRepository.deleteById(id)
            if (!deleteGroup) throw new HttpError(404, "Group not found!")
            res.json(deleteGroup)
        } catch (error) {
            next(error)
        }
    }
}