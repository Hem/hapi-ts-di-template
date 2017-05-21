import * as hapi from 'hapi';
import * as Joi from 'joi';

import { IAppModule, IModuleInfo, ModuleInfo } from '../../core';
import { injectable, inject } from 'inversify';
import { UserController } from './user-controller';


@injectable()
export class UserModule implements IAppModule {
    
    @inject(UserController)
    controller:UserController;


    public init(server: hapi.Server ) {
        
        server.bind(this.controller);


        server.route({
            method: 'POST',
            path: '/api/users',
            config: {
                handler: this.controller.findUsers,
                description: "finds all users matching filter criteria",
                tags: ['api', 'users'],
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
            path: '/api/user/{id}',
            config: {
                handler: this.controller.getUserById,
                description: "Returns a user object",
                tags: ['api', 'users'],
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            }
        });
    }

    public info(): IModuleInfo {
        return new ModuleInfo("User Module", "1.0.0");
    }
}