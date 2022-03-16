import { EndpointInterface } from "../models";

const baseUrl = "https://api.sampleapis.com/";

export const localEndpoints: EndpointInterface = {
    endpoint_coffee: {
        url: baseUrl + 'coffee/hot'
    },
    endpoint_beer: {
        url: baseUrl + 'beers/ale'
    },
    endpoint_coffee_image: {
        url: 'https://coffee.alexflipnote.dev/random.json'
    }
};
