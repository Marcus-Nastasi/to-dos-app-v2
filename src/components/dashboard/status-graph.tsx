'use client'

import * as React from 'react';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/joy';
 
export default function StatusGraph({ pending, progress, done }: { pending: number, progress: number, done: number }) {

   const priorities = [
      {
         label: 'Pending',
         value: +((pending / (pending + progress + done)) * 100).toFixed(2),
      },
      {
         label: 'In Progress',
         value: +((progress / (pending + progress + done)) * 100).toFixed(2),
      },
      {
         label: 'Done',
         value: +((done / (pending + progress + done)) * 100).toFixed(2),
      },
   ];
   
   const valueFormatter = (item: { value: number }) => `${item.value}%`;

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
         <Typography
            textAlign={'center'}
            fontWeight={'bold'}
            fontSize={{ xs: 15, md: 20 }}
            mb={-2}
         >
            Status
         </Typography>
         <PieChart
            colors={[ '#ff6d38', '#3386D5', '#179917' ]}
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
      </Box>
   );
}

const size = {
  width: 400,
  height: 300,
};
