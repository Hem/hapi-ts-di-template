import 'reflect-metadata';

import * as Hapi from 'hapi';
import * as Server from './server';
import { Container } from "inversify";

import { AppServer } from './server';
import { ModuleDiSetup } from './modules/module-di-setup';
import { PluginDiSetup } from './plugins/plugin-di-setup';
import { RepositoryDiSetup, DbConfig } from 'app-data';
import { IUserRepository } from 'app-data-contracts';



const DEFAULT_DB_CONFIG = require('../config/database.json');


const container = new Container();



container.bind<Container>(Container).toConstantValue(container);
container.bind<DbConfig>( "DefaultDbConfig" ).toConstantValue( new DbConfig( DEFAULT_DB_CONFIG ) );
container.bind<AppServer>( AppServer ).toSelf();


// register types...
new RepositoryDiSetup().setup(container);
new PluginDiSetup().setup(container);
new ModuleDiSetup().setup(container); 



const appServer:AppServer = container.get<AppServer>(AppServer);
var server = appServer.getHapiServer();


if (!module.parent) {

    server.start( (err ) => {
            
            if (err) {
                console.error('ERROR!!!', err);
            }

            server.connections.forEach((s) => {
                console.info(s.info);
            });
    });

}