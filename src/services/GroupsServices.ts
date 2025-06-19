import { HttpError } from "../erros/HttpError";
import { CreateGroupAttributes, GroupsRepository } from "../repositories/GroupsRepository";

export class GroupsServices {
    constructor(private readonly groupsRepository: GroupsRepository) { }

    async getAllGroups() {
        return await this.groupsRepository.find()
    }

    async createGroups(params: CreateGroupAttributes) {
        const newGroup = await this.groupsRepository.create(params)
        return newGroup
    }

    async getGroupsShow(id: number) {
        const group = await this.groupsRepository.findById(id)
        if (!group) throw new HttpError(404, "Group not found!")
        return group
    }

    async updateGroup(id: number, params: Partial<CreateGroupAttributes>) {
        const updateGroup = await this.groupsRepository.updateById(id, params)
        if (!updateGroup) throw new HttpError(404, "Group not found!")
        return updateGroup
    }

    async deleteGroup(id: number) {
        const deleteGroup = await this.groupsRepository.deleteById(id)
        if (!deleteGroup) throw new HttpError(404, "Group not found!")
        return deleteGroup    
    }
}