import { apiMethod } from '../../core';
import * as hapi from 'hapi';
import { request } from 'https';
import { GroupRepository } from '../../data';
import { IGroupRepository } from '../../data-contracts';
import { injectable, inject } from 'inversify';


@injectable()
export class GroupController {
    
    @inject("IGroupRepository")
    repository:IGroupRepository;


    // POST: /api/users 
    // { filter: text } 
    public findGroups = apiMethod(async request => {
        const filter = request.payload.filter;
        return await this.repository.find(filter, 1, 20);
    });

    
    // GET: /api/user/{id:number}
    public getGroupById = apiMethod(async request => {
        const id = parseInt(request.params.id, 10);
        return this.repository.getById(id)
    });


}