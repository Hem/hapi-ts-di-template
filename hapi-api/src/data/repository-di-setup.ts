import { IGroupRepository, IUserRepository } from "../data-contracts";
import { GroupRepository, UserRepository } from './';
import { interfaces } from "inversify";



export class RepositoryDiSetup {    
    public setup( container : interfaces.Container ): void {
        container.bind<IUserRepository>("IUserRepository").to(UserRepository);
        container.bind<IGroupRepository>("IGroupRepository").to(GroupRepository);
    }
}