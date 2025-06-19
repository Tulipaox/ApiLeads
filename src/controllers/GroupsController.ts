import { Handler } from "express";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupsRequestSchema";
import { GroupsServices } from "../services/GroupsServices";

export class GroupsController {

    constructor(private readonly groupServices: GroupsServices) { }

    index: Handler = async (req, res, next) => {
        try {
            const groups = await this.groupServices.getAllGroups()
            res.json(groups)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body)
            const newGroup = await this.groupServices.createGroups(body)
            res.status(201).json(newGroup)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const group = await this.groupServices.getGroupsShow(+req.params.id)
            res.json(group)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateGroupRequestSchema.parse(req.body)
            const updateGroup = await this.groupServices.updateGroup(+req.params.id, body)
            res.json(updateGroup)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const deleteGroup = await this.groupServices.deleteGroup(+req.params.id)
            res.json(deleteGroup)
        } catch (error) {
            next(error)
        }
    }
}