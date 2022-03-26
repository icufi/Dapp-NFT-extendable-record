import React from 'react'
import { TextField, MenuItem } from '@mui/material'
import {useField, useFormikContext} from 'formik'

const SelectField = ({name, options, ...otherProps}) => {

    const {setFieldValue} = useFormikContext()
    const [field, meta] = useField(name);

const handleChange = (event) => {
    const {value} = event.target;
    setFieldValue(name, value);
}


    const configSelect = {
        ...otherProps,
        ...field,
          select: true,
          variant: 'outlined',
          fullWidth: true,
          onChange: handleChange,
    }

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect}>
        {Object.keys(options).map((item, pos) => (
            <MenuItem key={pos} value={item}>{options[item]}</MenuItem>
        ))}
        </TextField>
    )
}

export default SelectField
