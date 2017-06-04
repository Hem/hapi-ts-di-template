import { AuthController } from './auth/auth-controller';
import { AuthModule } from './auth/auth-module';
import { GroupController } from './group/group-controller';
import { UserController } from './user/user-controller';
import { interfaces } from "inversify";
import { IAppModule } from '../core';
import { GroupModule } from "./group/group-module";
import { UserModule } from "./user/user-module";


export class ModuleDiSetup {    
    setup( container: interfaces.Container): void {

        container.bind<IAppModule>("group").to(GroupModule);
        container.bind<GroupController>(GroupController).toSelf();

        container.bind<IAppModule>("user").to(UserModule);
        container.bind<UserController>(UserController).toSelf();

        container.bind<IAppModule>("auth").to(AuthModule);
        container.bind<AuthController>(AuthController).toSelf();

    }
}