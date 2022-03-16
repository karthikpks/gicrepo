import fetch from "node-fetch";

export const getData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};