import { useState } from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core';

export default ({ name, values, selected }) => {
  const [value, setValue] = useState(selected);
  const handleChange = ({ target: { value } }) => setValue(value);

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label={name} name={name} value={Number(value)} onChange={handleChange}>
        {
          values.map((v, i) => (
            <FormControlLabel
              key={v}
              value={v}
              control={<Radio />}
              label={`$${v.toLocaleString()}`}
            />
          ))
        }
      </RadioGroup>
    </FormControl>
  );
}