import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/joy';

export default function OverdueGraph() {
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
            colors={[ '#D83A3A', '#179917' ]}
            tooltip={{ trigger: 'none' }}
            xAxis={[{ scaleType: 'band', data: ['To-dos'] }]}
            series={[
               { data: [4], label: 'Overdue      ' }, 
               { data: [1], label: 'Future' } ,
            ]}
            width={400}
            height={300}
            barLabel="value"
            borderRadius={5}
         />
      </Box>
      // <BarChart
      //    tooltip={{ trigger: 'none' }}
      //    xAxis={[{ scaleType: 'band', data: ['To-dos'] }]}
      //    series={[
      //       { data: [10], label: 'To-dos' },
      //       // { data: [10], label: 'Future' }
      //    ]}
      //    borderRadius={5}
      //    width={400}
      //    height={350}
      // />
   );
}
