import { AppPropertiesInterface, EndpointInterface } from "../models";
import { localEndpoints } from "./PropertiesLocal"; 

const AllEndponst: any = {
    local: localEndpoints
};

const getEndpoinst = () : EndpointInterface => {
    const env = process.env.ENV;
    
    if (env === undefined) {
        throw new Error('no ENV defined in current environment');
    }

    const endpoints : EndpointInterface = AllEndponst[env];
   
    if (endpoints === undefined) {
        throw new Error('wrong ENV defined in current environment');
    }
    return endpoints;
}


const AppProperties : AppPropertiesInterface = {
    SERVER_PORT : 8000, 
    ENDPOINTS : getEndpoinst(),
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    SUCCESS_CODE: '200',
    FAILURE_CODE: '404'
}


export { AppProperties }