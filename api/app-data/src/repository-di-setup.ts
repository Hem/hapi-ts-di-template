import { interfaces } from "inversify";
import { IGroupRepository, IUserRepository } from "@myorg/app-data-contracts";
import { GroupRepository, UserRepository } from './';



export class RepositoryDiSetup {    
    setup( container: interfaces.Container): void {
        container.bind<IUserRepository>("IUserRepository").to(UserRepository);
        container.bind<IGroupRepository>("IGroupRepository").to(GroupRepository);
    }
}