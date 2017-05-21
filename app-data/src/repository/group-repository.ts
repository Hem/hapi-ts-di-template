import { IGroupRepository, Group } from 'app-data-contracts';
import { AbstractRepository } from '../abstract-repository';

export class GroupRepository extends AbstractRepository implements IGroupRepository {
    
    tableName: string = 'groups';

    async getById(id: number): Promise<Group> {
        return await this.getTable()
                    .where({id: id})
                        .first();
    }

    async find(filter: string, pageNumber: number, count: number): Promise<Group[]> {
        return await this.getTable()
                        .where('name', 'like', `%${filter}%`)
                        .select();
    }

    create(dto: Group): Promise<Group> {
        throw new Error("Method not implemented.");
    }
    
    update(dto: Group): Promise<Group> {
        throw new Error("Method not implemented.");
    }


}