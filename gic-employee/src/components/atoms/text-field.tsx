import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

interface CustomTextFieldProps {
    id: string;
    label: string;
    name?: string;
    error?: string | boolean;
    value: string;
    helperText?: string;
    onChange: (field: string, value: string) => void;
};

const CustomTextField = (props: CustomTextFieldProps) => {
    const [value , setValue] = useState(props.value);
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={props.id}
            label={props.label}
            value = {value || ""}
            onChange={(event) => {
              setValue(event.target.value);
              props.onChange(props.id, event.target.value);
            }}
            error={ props.error !== false && props.error !== undefined && props.error !== '' }
            helperText= {props.error}
          />
    )
}
export default CustomTextField;