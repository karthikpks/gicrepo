'use strict';
import * as hapi from '@hapi/hapi';
import { AppProperties } from '../resources';
import { DrinksService } from '../services';

export const DrinksSearchPlugin = {
    name: 'DrinksSearchPlugin',
    version: '1.0.0',
    register: async function (server : hapi.Server, options: any) {
        server.route({
            method: 'GET',
            path: '/drinks',
            handler: async function (request, h) {
                const { type } = request.query
                if (['coffee', 'beer'].includes(type)) {
                    return await DrinksService.getDrinksServiceByType(type);
                } else if (type === '' || type === undefined) {
                    return await DrinksService.getDrinksAllService();
                } else {
                    return {
                        status: AppProperties.FAILURE,
                        code: AppProperties.FAILURE_CODE,
                        message: 'No data available for the type'
                    }
                }
            }
        });
    }
};