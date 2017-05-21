import { Container } from "inversify";
import { SwaggerPlugin } from './swagger';
import { IPlugin } from '../core';


export class PluginDiSetup {    
    setup( container: Container): void {
        container.bind<IPlugin>("swagger").to(SwaggerPlugin);
    }
}