import * as React from 'react';
import Input from '@mui/joy/Input';

export default function SearchBox() {
   return (
      <>
         <Input  
            color='neutral'
            placeholder="Search by title or description..."
            sx={{
               width: {
                  xs: '90%',
                  sm: '70%',
                  md: '50%',
                  lg: '20%'
               },
               '&::before': {
               border: '1.5px solid #424242' , // light theme #CDD7E1
               transform: 'scaleX(0)',
               left: '2.5px',
               right: '2.5px',
               bottom: 0,
               top: 'unset',
               transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
               borderRadius: 0,
               borderBottomLeftRadius: '64px 20px',
               borderBottomRightRadius: '64px 20px',
               },
               '&:focus-within::before': {
               transform: 'scaleX(1)',
               },
            }}
         /> 
      </>
   );
}
