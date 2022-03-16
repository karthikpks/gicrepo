'use strict';

import * as hapi from '@hapi/hapi';
import { CafePlugin, DrinksSearchPlugin } from './plugins';

const init = async () => {

    const server = new hapi.Server({
        port: 8000,
        host: 'localhost'
    });

    server.route({
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {
            return '404 Error! Page Not Found!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    await server.register(DrinksSearchPlugin);
    await server.register(CafePlugin);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();