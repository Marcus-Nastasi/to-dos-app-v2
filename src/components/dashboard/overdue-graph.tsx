import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function OverdueGraph() {
   return (
      <BarChart
         tooltip={{ trigger: 'none' }}
         xAxis={[{ scaleType: 'band', data: ['To-dos'] }]}
         series={[{ data: [4], label: 'Overdue      ' }, { data: [1], label: 'Future' } ]}
         width={400}
         height={300}
         barLabel="value"
         borderRadius={5}
      />
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
