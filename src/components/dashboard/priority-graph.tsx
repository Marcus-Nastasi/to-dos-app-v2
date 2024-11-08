'use client'

import * as React from 'react';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';

export const priorities = [
   {
      label: 'Pending',
      value: 72.72,
   },
   {
      label: 'In Progress',
      value: 13.38,
   },
   {
      label: 'Done',
      value: 10.83,
   },
];

export const valueFormatter = (item: { value: number }) => `${item.value}%`;
 
export default function PriorityGraph() {
  return (
    <PieChart
      tooltip={{ trigger: 'none' }}
      {...size}
      series={[
         {
            data: priorities,
            highlightScope: { 
               fade: 'global', 
               highlight: 'item' 
            },
            faded: { 
               innerRadius: 30, 
               additionalRadius: -30, 
               color: 'gray' 
            },
            valueFormatter,
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 35,
            arcLabelRadius: '60%',
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
         },
      ]}
      sx={{
         justifySelf: 'center',
         [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
            fontSize: 13
         },
      }}
    />
  );
}

const size = {
  width: 400,
  height: 300,
};
