export interface DrinksResponse {
    status: string,
    code: string,
    message?: string;
    data?: DrinksDataResponse[];
};

export interface DrinksDataResponse {
    name: string,
    price: string,
    rating: Rating,
    description: string,
    image: string,
    id: string
};

export interface Rating {
    average: number,
    reviews?: number
};
