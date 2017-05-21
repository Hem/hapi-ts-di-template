import { register } from 'ts-node/dist';
import * as path from 'path';
import * as Hapi from 'hapi';
import { IAppModule, IPlugin, IPluginInfo } from './core';
import { Container, injectable, inject } from 'inversify';

@injectable()
export class AppServer {

    private server: Hapi.Server;

    private pluginsToLoad:string[] = ['swagger'];

    private modulesToLoad:string[] = ['user', 'group'];



    constructor( @inject(Container) private container:Container  ) {

        this.server = new Hapi.Server();

        this.server.connection({
            host: '0.0.0.0',
            port: 8080,
            labels: 'api',
            routes: {
                cors: true
            }
        });

        this.register();
    }


    public getHapiServer() : Hapi.Server {
        return this.server;
    }



    public register():void {
        console.info( "Register Plugins" );
        this.registerPlugins();

        console.info( "Register Modules" );
        this.registerModules();
    }


    private registerPlugins():void {

        this.pluginsToLoad.forEach((pluginName: string) => {
                
                let plugin:IPlugin = this.container.get<IPlugin>(pluginName);
                
                    console.log(`Registering Plugin ${plugin.info().name} v${plugin.info().version}`);

                    plugin.register(this.server);

        });

    }

    private registerModules():void {

        this.modulesToLoad.forEach( (moduleName:string) => {
            
            let module:IAppModule =  this.container.get<IAppModule>(moduleName);

            console.log(`Registering module ${module.info().name} v${module.info().version} `);

            module.init(this.server);
        });

    }

}

