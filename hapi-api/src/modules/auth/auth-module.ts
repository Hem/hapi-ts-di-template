import * as hapi from 'hapi';
import * as Joi from "joi";

import { IAppModule, IModuleInfo, ModuleInfo } from '../../core';
import { injectable, inject } from 'inversify';
import { AuthController } from './auth-controller';


@injectable()
export class AuthModule implements IAppModule {

    @inject(AuthController)
    controller: AuthController;


    public init(server: hapi.Server) {

        // no sure what this does, I'm guessing it changes the this scope!!!
        server.bind(this.controller);

        server.route({
            method: 'GET',
            path: '/api/authenticate',
            config: {
                auth: false,
                handler: this.controller.authenticateUser,
                tags: ['api', 'auth']
            }
        });

    }



    public info(): IModuleInfo {
        return new ModuleInfo("Auth Module", "1.0.0");
    }
}


