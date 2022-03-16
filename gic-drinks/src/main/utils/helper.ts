import { AppProperties } from "../resources";
import { descriptionOfBeer } from "./constants";

export const randomPriceGeneration = (min:number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomRatingGeneration = (min:number, max: number) => {
    return Math.random() * (max - min) + min;
};

export const findDescriptionByName = (name: string) => {
    let words = ['ale', 'porter', 'stout', 'brown', 'pale',  'ipa'];
    let findWord = name ? name.toLowerCase().split(' ').find(function(w){return words.includes(w)}): '';
    return findWord ? descriptionOfBeer[findWord] : '';
};

export const generateUUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
};

export const generateUUIDForEmployee = () => {
    var dt = new Date().getTime();
    var uuid = 'UIxxxxxxx'.replace(/[x]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
};

export const onGetEndpointsByType = (payload: string) => {
    switch(payload) {
        case "coffee" : return AppProperties.ENDPOINTS.endpoint_coffee.url; 
        case "beer" : return AppProperties.ENDPOINTS.endpoint_beer.url; 
        default : return '';
    }   
};