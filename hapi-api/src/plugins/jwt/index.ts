import { resolve } from 'uri-js/dist/esnext';
import { IPlugin, IPluginInfo, PluginInfo } from '../../core';
import * as Hapi from 'hapi';
import { injectable } from 'inversify';


const validateJwtToken = (decoded: any, request: Hapi.Request, callback: any): void => {
    console.info("Validating Token!!!");
    console.dir(decoded, { colors: true })

    return callback(null, true);
};

@injectable()
export class JwtPlugin implements IPlugin {



    public register(server: Hapi.Server): Promise<boolean> {

        return new Promise((resolve, reject) => {

            server.state('token',
                {
                    ttl: null, // expires when the browser closes
                    encoding: 'none',       // we already used JWT to encode 
                    isSecure: false,        // true:- sent over HTTPS, false= sent over HTTP(s)
                    isHttpOnly: true,       // prevent client alteration 
                    clearInvalid: true,     // remove invalid cookies 
                    strictHeader: true,     // don't allow violations of RFC 6265
                    isSameSite: 'Strict'
                });

            server.register(require('hapi-auth-jwt2'), function (err) {
                if (err) {
                    console.log(err);
                }

                server.auth.strategy('jwt', 'jwt', {
                    key: process.env.JWT_SECRET,
                    validateFunc: validateJwtToken,
                    verifyOptions: { "algorithms": ['HS256'] }
                })

                server.auth.default('jwt');

                resolve(true);
            });

        })
    }


    public info(): IPluginInfo {
        return new PluginInfo('JWT Plugin', '1.0.0');
    }
}