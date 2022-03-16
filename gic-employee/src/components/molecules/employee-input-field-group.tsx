import React from 'react';
import { Constants } from '../../utils';
import { CustomTextField } from '../atoms';

const EmployeeInputFieldGroup = (props: any) => {

    return (
        <>
            <CustomTextField
                id="firstName"
                label={Constants.LABEL_FIRST_NAME}
                value={props.record.first_name}
                onChange = {props.onChange}
                error = {props.validateResult.first_name}
            />

            <CustomTextField
                id="lastName"
                label={Constants.LABEL_LAST_NAME}
                value={props.record.last_name}
                onChange = {props.onChange}
                error = {props.validateResult.last_name}
            />

            <CustomTextField
                id="email"
                label={Constants.LABEL_EMAIL}
                value={props.record.email}
                onChange = {props.onChange}
                error = {props.validateResult.email}
            />
            
            <CustomTextField
                id="phoneNumber"
                label={Constants.LABEL_NUMBER}
                value={props.record.number}
                onChange = {props.onChange}
                error = {props.validateResult.number}
            />
        </>
    );
}
export default EmployeeInputFieldGroup;