import { GroupController } from './group/group-controller';
import { UserController } from './user/user-controller';
import { Container } from "inversify";
import { IAppModule } from '../core';
import { GroupModule } from "./group/group-module";
import { UserModule } from "./user/user-module";


export class ModuleDiSetup {    
    setup( container: Container): void {

        container.bind<GroupController>(GroupController).toSelf();
        container.bind<UserController>(UserController).toSelf()

        container.bind<IAppModule>("group").to(GroupModule);
        container.bind<IAppModule>("user").to(UserModule);

    }
}