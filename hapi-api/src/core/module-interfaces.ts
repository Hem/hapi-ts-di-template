import { VERSION } from 'ts-node/dist';
import * as Hapi from 'hapi';

export interface IModuleInfo {
    name: string;
    version: string;
}

export class ModuleInfo implements IModuleInfo {
    
    constructor ( public name:string, public version:string ) {}

}

export interface IAppModule {

    init ( server: Hapi.Server ) : void;

    info (): IModuleInfo;
}

