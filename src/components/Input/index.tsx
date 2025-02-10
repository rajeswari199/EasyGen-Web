import React from 'react';

import { OutlinedInputProps } from '@mui/material';

import { OutlinedInput } from '@mui/material';

const Input = React.forwardRef((props: OutlinedInputProps, ref) => {
  return (
    <>
      <OutlinedInput ref={ref} id="outlined-adornment-weight" {...props} />
    </>
  );
});

export default React.memo(Input);
