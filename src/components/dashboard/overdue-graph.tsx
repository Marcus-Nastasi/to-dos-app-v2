import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function OverdueGraph() {
   return (
      <BarChart
         tooltip={{ trigger: 'none' }}
         xAxis={[{ scaleType: 'band', data: [''] }]}
         series={[
            { data: [4], label: 'Overdue' },
            { data: [10], label: 'Future' }
         ]}
         width={600}
         height={350}
      />
   );
}
