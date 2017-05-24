import * as Hapi from 'hapi';
import { injectable } from 'inversify';
import { IPlugin, IPluginInfo, PluginInfo } from "../../core";

@injectable()
export class SwaggerPlugin implements IPlugin {

    register(server: Hapi.Server): Promise<boolean> {
        var opts = {
            register: require('hapi-swagger'),
            options: {
                info: {
                    title: 'Task Api',
                    description: 'Task Api Documentation',
                    version: '1.0'
                },
                tags: [
                    {
                        'name': 'tasks',
                        'description': 'Api tasks interface.'
                    }
                ],
                documentationPage: true,
                documentationPath: '/apidocs'
            }
        };

        return new Promise<boolean>((resolve, reject) => {
            server.register([
                require('inert'),
                require('vision'),
                opts
            ],
                (error) => {
                    if (error) {
                        console.log('error', error);
                        return reject(error);
                    }
                    return resolve(true);
                });
        });



    }

    /**
     * Get the plugin information
     */
    info(): IPluginInfo {
        return new PluginInfo("Swagger Plugin Wrapper", "1.0");
    }

}
