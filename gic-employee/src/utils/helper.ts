import {NAME_FIELD_ERROR_MSG, EMAIL_FIELD_ERROR_MSG, GENDER_FIELD_ERROR_MSG, NUMBER_FIELD_ERROR_MSG} from './constants';

export const onCheckFieldValidation = (type: string, value: string) => {
    switch(type) {
        case "name" : return value === '' || !(/^.{6,10}$/.test(value)) ? NAME_FIELD_ERROR_MSG : '';
        case "email" : return value === '' ||  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? EMAIL_FIELD_ERROR_MSG: '';
        case "number": return value === '' ||  !/^\+65(6|8|9)\d{7}$/.test(value) ? NUMBER_FIELD_ERROR_MSG : '';
        case 'gender': return value === '' ? GENDER_FIELD_ERROR_MSG : '';
    };
};

export const onFindIsError = (data: any) : boolean => {
    let isError = false;
    for (const key in data) {
        if (data[key] !== '') {
            isError = true;
        };
    };
    return isError;
};