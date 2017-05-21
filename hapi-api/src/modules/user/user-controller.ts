import * as Hapi from 'hapi';
import { IUserRepository } from "app-data-contracts";
import { UserRepository } from "app-data";
import { injectable, inject } from 'inversify';



@injectable()
export class UserController {
    
    @inject("IUserRepository")
    repository: IUserRepository;


    // POST: /api/users 
    // { filter: text, } 
    public findUsers( request: Hapi.Request, reply: any) {

            const filter = request.payload.filter;
            
            this.repository.find( filter, 1, 20 )
                .then( (value : any) => {
                        reply( value );
                })
                .catch( ( err : Error ) => {
                    reply(err);
                });
    }


    
    // GET: /api/user/{id}
    public getUserById (request:Hapi.Request, reply:any) {

        const id = parseInt(request.params.id, 10);

        this.repository.getById(id)
            .then((value) => {
                    reply( value );
            })
            .catch((err) => {
                reply(err);
            });
    }
}