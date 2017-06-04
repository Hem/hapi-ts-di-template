
import * as Hapi from 'hapi';
export const googleapis = require('googleapis');


/**
 * Method signature called on authentication....
 */
export type AuthCallback = (request:Hapi.Request, reply:Hapi.ReplyWithContinue, token:string, profile:any, error:any) => void;


export class GoogleAuthOptions {
    constructor(
        public clientId: string,
        public clientSecret: string,
        public baseUrl: string,
        public redirectUrl: string,
        public scope: string[],
        public accessType: string = 'offline',
        public approvalPrompt: string = 'force',
        public handlerCallback: AuthCallback
        ) {}

}

export class HapiGoogleAuthProvider {


    constructor( private options: GoogleAuthOptions ) {  }


    /**
     * This can be private...
     * Making this public because...
     */
    public getOauthClient() {
        return new googleapis.auth.OAuth2(
            this.options.clientId,
            this.options.clientSecret,
            this.options.baseUrl + this.options.redirectUrl
        );
    }


    public getGooglePlus() {
        return googleapis.plus('v1');
    }

    /**
     * @param scope 
     */
    public getGoogleOAuth2Url(scope?: string | string[]):string {        
        return this.getOauthClient().generateAuthUrl({
            access_type: this.options.accessType || 'offline',
            approval_prompt: this.options.approvalPrompt || 'force',
            scope: scope || this.options.scope
        });
    }


    public register(server:Hapi.Server, routeConfig: any = {}) : void {

        server.method('getGoogleOAuthUrl', this.getGoogleOAuth2Url);


        // allow for non authenticated user to access this url!
        routeConfig.auth = false;

        server.route([{
            method: 'GET',
            path: this.options.redirectUrl,            
            config: routeConfig,
            
            handler:  (request:Hapi.Request, reply: Hapi.ReplyWithContinue) => {
                const query:any = request.query;
                const code = query.code;
                const googleAuthClient = this.getOauthClient();

                googleAuthClient.getToken(code, (error:any, tokens:any) => {

                    if (error) {
                        console.error(error);
                        return this.options.handlerCallback(request, reply, tokens, "ERROR", error);
                    }


                    // the user's authentication token....
                    googleAuthClient.setCredentials(tokens);

                    const plus:any = this.getGooglePlus();
                    
                    plus.people.get({
                        userId: 'me',
                        auth: googleAuthClient
                    },  (err:any, profile:any) => {              
                        if(err) {
                            console.error(err);
                            return this.options.handlerCallback(request, reply, tokens, null, err);
                        }

                        this.options.handlerCallback(request, reply, tokens, profile, null);
                    })


                });

            }

        }]);

    }

}
