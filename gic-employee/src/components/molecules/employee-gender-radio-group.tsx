import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const EmployeeGenderRadioButtonsGroup = (props: any) => {
  const [value, setValue] = React.useState('');
  
  useEffect(() => {
    if(props.record.gender) {
      setValue(props.record.gender);
    }
  }, [props.record.gender]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    props.onChange('gender', event.target.value);
  };

  return (
    <div>
        <FormControl component="fieldset" error={props.validateResult.gender !== false && props.validateResult.gender !== undefined && props.validateResult.gender !== '' }>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender" value={value} onChange={handleChange}>
            <FormControlLabel value="Man" control={<Radio />} label="Man" />
            <FormControlLabel value="Trans*Man" control={<Radio />} label="Trans*Man" />
            <FormControlLabel value="Gender Fluid" control={<Radio />} label="Gender Fluid" />
            <FormControlLabel value="Cis" control={<Radio />} label="Cis" />
            <FormControlLabel value="Cisgender Woman" control={<Radio />} label="Cisgender Woman" />
            <FormControlLabel value="Trans Female" control={<Radio />} label="Trans Female" />
            <FormControlLabel value="Transexual Man" control={<Radio />} label="Transexual Man" />
            <FormControlLabel value="Neutrois" control={<Radio />} label="Neutrois" />
            <FormControlLabel value="Gender Nonconforming" control={<Radio />} label="Gender Nonconforming" />
            <FormControlLabel value="Intersex" control={<Radio />} label="Intersex" />
        </RadioGroup>
        <FormHelperText>{props.validateResult.gender}</FormHelperText>
        </FormControl>
    </div>
  );
};

export default EmployeeGenderRadioButtonsGroup;