import * as Hapi from 'hapi';
import { IUserRepository, User } from "../../data-contracts";
import { UserRepository } from "../../data";
import { injectable, inject } from 'inversify';
import { apiMethod } from '../../core';



@injectable()
export class UserController {

    @inject("IUserRepository")
    repository: IUserRepository;

    // POST: /api/users 
    // { filter: text } 
    public findUsers = apiMethod(async request => {
        const filter = request.payload.filter;
        return await this.repository.find(filter, 1, 20);
    });

    
    // GET: /api/user/{id:number}
    public getUserById = apiMethod(async request => {
        const id = parseInt(request.params.id, 10);
        return this.repository.getById(id)
    });


}