import { AbstractRepository } from '../abstract-repository';
import { IUserRepository, User } from 'app-data-contracts';
import { injectable } from "inversify";


@injectable()
export class UserRepository extends AbstractRepository implements IUserRepository {

    // Set the table name to users
    tableName: string = "users";


    async getById(id: number): Promise<User> {
        
        return await this.getTable()
                            .where({id: id})
                                .first();
    }

    async find(filter: string, pageNumber: number = 1, count: number = 20): Promise<User[]> {
        return await this.getTable().where( 'name', 'like', `%${filter}%` ).select();
    }

    async create(dto: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
    async update(dto: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

}