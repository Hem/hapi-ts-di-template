import * as hapi from 'hapi';
import * as Joi from "joi";

import { IAppModule, IModuleInfo, ModuleInfo } from '../../core';
import { GroupController } from './group-controller';
import { injectable, inject } from 'inversify';




@injectable()
export class GroupModule implements IAppModule {

    @inject(GroupController)
    controller:GroupController;


    public init(server: hapi.Server ) {
            
            // no sure what this does, I'm guessing it changes the this scope!!!
            server.bind(this.controller);

            server.route({
                method: 'POST',
                path: '/api/groups',
                config: {
                    handler: this.controller.getAllGroups,
                    description: "Lists all groups",
                    tags: ['api', 'groups'],
                    validate: {
                        payload: {
                            filter: Joi.string(),
                            pageSize: Joi.number().default(20),
                            pageIndex: Joi.number().default(1)
                        }
                    }
                }
            });


            server.route({
                method: 'GET',
                path: '/api/group/{id}',
                config: {
                    handler: this.controller.getGroupById,
                    description: "Returns a group object",
                    tags: ['api', 'groups'],
                    validate: {
                        params: {
                            id: Joi.string().required()
                        }
                    }
                }
            });
    }


    
    public info(): IModuleInfo {
        return new ModuleInfo("Group Module", "1.0.0");
    }
}


