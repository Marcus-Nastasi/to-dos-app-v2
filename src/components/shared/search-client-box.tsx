import * as React from 'react';
import Input from '@mui/joy/Input';

export default function SearchClient({ 
   query, 
   setQuery
}: { 
   query: string, 
   setQuery: Function, 
}) {
   return (
      <>
         <Input  
            color='neutral'
            placeholder="Filter by client's name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            sx={(theme) => ({
               p: 1.3,
               mr: 2,
               ml: { 
                  xs: 0, 
                  sm: 4, 
                  md: 7, 
                  lg: 8 
               },
               width: 'fit-content',
               '&::before': {
                  border: '1.5px solid' ,
                  borderColor: theme.palette.mode === 'light' 
                     ? '#424242'
                     : '#CDD7E1',
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
            })}
         /> 
      </>
   );
}
