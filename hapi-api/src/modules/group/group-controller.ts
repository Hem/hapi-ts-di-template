import * as hapi from 'hapi';
import { request } from 'https';
import { GroupRepository } from 'app-data';
import { IGroupRepository } from 'app-data-contracts';
import { injectable, inject } from 'inversify';


@injectable()
export class GroupController {
    
    @inject("IGroupRepository")
    repository:IGroupRepository;


    getAllGroups (request: hapi.Request, reply: any) {
        
        const filter = request.payload.filter;

        this.repository
            .find(filter, 1, 20)
                .then((records) => {
                        reply(records); 
                    })
                    .catch((err:Error) => { 
                        reply(err);
                     });
    }

    getGroupById ( request: hapi.Request, reply: any ) {
        
        var id = parseInt(request.params.id);

        this.repository
                .getById(id)
                    .then((records) => {
                        reply(records); 
                    })
                    .catch((err:Error) => { 
                        reply(err);
                     });
    }
}