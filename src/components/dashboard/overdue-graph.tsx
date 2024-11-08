import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/joy';

export default function OverdueGraph({ overdue, future }: { overdue: number, future: number }) {
   return (
      <Box
         padding={3}
         borderRadius={8}
         m={2}
         boxShadow={'0px 0px 3px 0.1px gray'}
         sx={(theme) => ({
            bgcolor: theme.palette.mode == 'light' ? 'white' : 'black'
         })}
      >
         <BarChart
            colors={[ '#ff6d38', '#179917' ]}
            tooltip={{ trigger: 'none' }}
            xAxis={[{ scaleType: 'band', data: ['To-dos'] }]}
            series={[
               { data: [overdue], label: 'Overdue      ' }, 
               { data: [future], label: 'Future' } ,
            ]}
            width={400}
            height={300}
            barLabel="value"
            borderRadius={5}
         />
      </Box>
   );
}
