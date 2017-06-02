import { GoogleAuthPlugin } from './google-auth/google-auth';
import { JwtPlugin } from './jwt';
import { LoggerPlugin } from './logger';
import { interfaces } from "inversify";
import { SwaggerPlugin } from './swagger';
import { IPlugin } from '../core';


export class PluginDiSetup {    
    setup( container: interfaces.Container ): void {
        container.bind<IPlugin>("jwt").to(JwtPlugin);
        container.bind<IPlugin>("logger").to(LoggerPlugin);
        container.bind<IPlugin>("swagger").to(SwaggerPlugin);
        container.bind<IPlugin>("googleAuth").to(GoogleAuthPlugin);
    }
}