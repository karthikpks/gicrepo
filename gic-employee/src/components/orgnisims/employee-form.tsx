import React from 'react';
import {EmployeeInputFieldGroup, EmployeeGenderRadioButtonsGroup} from '../molecules';
import { CustomButton } from '../atoms';
import { makeStyles } from '@material-ui/core/styles';
import { Constants } from '../../utils';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 0, 2),
        float: 'right',
        position: 'relative',
        width: '30%',
    },
  }));

const EmployeeFormContainer = (props: any) => {
    const classes = useStyles();
    return (
        <>
            <EmployeeInputFieldGroup {...props} />
            <EmployeeGenderRadioButtonsGroup {...props} />
            <div>
                <CustomButton
                    name={Constants.LABEL_SUBMIT}
                    type='submit'
                    style={classes.button}
                    onClick={() => props.onSubmit(props.record.id)}
                />
            </div>
        </>
    );
};

export default EmployeeFormContainer;