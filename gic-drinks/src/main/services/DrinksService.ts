import { DrinksDataResponse, DrinksResponse } from "../models";
import { AppProperties } from "../resources";
import { Fetch, Helper } from "../utils";

export const getDrinksServiceByType = async (payload: any) : Promise<DrinksResponse> => {
    const responses = await Fetch.getData(Helper.onGetEndpointsByType(payload));
    return await getDrinksResponse(responses, payload);
};

export const getDrinksAllService = async () => {
    const responses = await Promise.all([
        Fetch.getData(Helper.onGetEndpointsByType('coffee')),
        Fetch.getData(Helper.onGetEndpointsByType('beer')),
    ]);
    return getDrinksResponse(responses, 'all');
};

const getDrinksResponse = async (response : any, type: string) : Promise<DrinksResponse>  => {
    let data : DrinksDataResponse[]; 
    data = await onProcessResponseByType(response, type);
    return {
        status: AppProperties.SUCCESS,
        code: AppProperties.SUCCESS_CODE,
        data: type === 'all' ? data.sort((c : DrinksDataResponse, b: DrinksDataResponse) => b.rating.average - c.rating.average) : data,
    };
}; 

const onProcessResponseByType = async (response: any, type: string) : Promise<DrinksDataResponse[]> => {
    if (type === 'coffee') {
        const promises = onGetCoffeeData(response);
        return Promise.all(promises);
    } else if (type === 'beer') { 
        return onGetBeerData(response);
    } else {
         return [...await onProcessResponseByType(response[0], 'coffee'), ...await onProcessResponseByType(response[1], 'beer') ];
    };
};


const onGetCoffeeData = (response: any) => {
    return response.map(async (drink: any) => {
        const image = await Fetch.getData(AppProperties.ENDPOINTS.endpoint_coffee_image.url);
        return {
            name: drink.title,
            price: '$' + Helper.randomPriceGeneration(1,20) + '.99',
            rating:  {
                average: Helper.randomRatingGeneration(1,5)
            },
            description: drink.description,
            image: image.file,
            id: Helper.generateUUID()
        }
    });
};

const onGetBeerData = (response: any) => {
    return response.map((drink: any) => {
        return {
            name: drink.name,
            price: drink.price,
            rating: drink.rating,
            description: Helper.findDescriptionByName(drink.name),
            image: drink.image,
            id: Helper.generateUUID()
        }
    });
};