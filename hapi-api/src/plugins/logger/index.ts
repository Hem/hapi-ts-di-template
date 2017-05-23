import { IPlugin, IPluginInfo, PluginInfo } from '../../core';
import * as Hapi from 'hapi';
import { injectable } from 'inversify';

@injectable()
export class LoggerPlugin implements IPlugin {


    public register(server: Hapi.Server): Promise<boolean> {

        const options = {
            ops: {
                interval: 500
            },
            reporters: {
                myConsoleReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ log: '*', response: '*' }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        };

        server.register({
            register: require('good'),
            options: options

        }, (error) => {
            if (error) {
                console.log('error', error);
            }
        });

        return Promise.resolve(true);
    }

    public info(): IPluginInfo {
        return new PluginInfo('Logger', '1.0.0');
    }
}