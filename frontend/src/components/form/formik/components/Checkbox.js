import React from 'react';
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

const CheckboxGrid = ({name, label, legend}) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (event) => {
        const {checked} = event.target;
        setFieldValue(name, checked);
    };

    const configCheckbox = {
        ...field,
        onChange: handleChange,


    }

    const configFormControl = {};

    if (meta && meta.touched && meta.error) {
        configFormControl.error = true;

    }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component='legend'>{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel control={<Checkbox {...configCheckbox}/>} label={label} />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGrid;
