import * as Hapi from 'hapi';
import {AuthCallback, GoogleAuthOptions, HapiGoogleAuthProvider} from '../../core/hapi-google-auth-provider';
import { injectable } from 'inversify';
import { IPlugin, IPluginInfo, PluginInfo } from '../../core';

@injectable()
export class GoogleAuthPlugin implements IPlugin {

    public customHandler(request:Hapi.Request, reply:Hapi.ReplyWithContinue, tokens:any, profile:any, error:any) :void {

        console.dir(profile);

        if(reply){

            if(error) {
                 reply(error).statusCode = 400;
                 return;
            }

            reply({tokens, profile});            
        }
    }

    public register(server: Hapi.Server): Promise<boolean> {

        const authOptions = new GoogleAuthOptions(
                                        process.env.GOOGLE_CLIENT_ID,
                                        process.env.GOOGLE_CLIENT_SECRET,
                                        process.env.BASE_URL,
                                        '/auth/google',

                                        [ 
                                            'https://www.googleapis.com/auth/contacts.readonly',
                                            'https://www.googleapis.com/auth/plus.me',
                                            'https://www.googleapis.com/auth/userinfo.email'
                                        ],
                                        'online',
                                        'auto',
                                        this.customHandler
                                            );

        const authProvider = new HapiGoogleAuthProvider(authOptions);  
        const registerOptions = {  
            auth: false,
            description: 'Google auth callback',
            notes: 'Handled by hapi-auth-google plugin',
            tags: ['api', 'auth', 'plugin']
        };

        
        authProvider.register(server, registerOptions);

        server.route({
                    method: 'GET',
                    path: '/',
                    config: {
                        auth:false,
                    },
                    handler: function(req, reply) {
                        const url = authProvider.getGoogleOAuth2Url();
                        const imgsrc = 'https://developers.google.com/accounts/images/sign-in-with-google.png';
                        const btn = '<a href="' + url +'"><img src="' +imgsrc +'" alt="Login With Google"></a>'
                        reply(btn);
                    } 
                });

        return Promise.resolve(true);

        
    }

    public info(): IPluginInfo {
        return new PluginInfo('Google Auth Plugin', '1.0.0');
    }
}