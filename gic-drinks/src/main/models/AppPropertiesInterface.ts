
export interface EndpointProperties {
    url: string;
}

export interface EndpointInterface {
    endpoint_coffee: EndpointProperties;
    endpoint_beer: EndpointProperties;
    endpoint_coffee_image: EndpointProperties;
}

export interface AppPropertiesInterface {
    SERVER_PORT : number,
    ENDPOINTS: EndpointInterface,
    SUCCESS: string,
    FAILURE: string,
    SUCCESS_CODE: string
    FAILURE_CODE: string
}