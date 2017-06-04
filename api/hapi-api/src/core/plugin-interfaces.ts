import * as Hapi from "hapi";


export interface IPluginInfo {

    name: string;

    version: string;
}


export interface IPlugin {

    register(server: Hapi.Server):Promise<boolean>;

    info(): IPluginInfo;
}


export class PluginInfo implements IPluginInfo {

    constructor(public name: string, public version: string) { }

}