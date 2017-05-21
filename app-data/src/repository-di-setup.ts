import { Container } from "inversify";
import { IGroupRepository, IUserRepository } from "app-data-contracts";
import { GroupRepository, UserRepository } from './';



export class RepositoryDiSetup {    
    setup( container: Container): void {
        container.bind<IUserRepository>("IUserRepository").to(UserRepository);
        container.bind<IGroupRepository>("IGroupRepository").to(GroupRepository);
    }
}