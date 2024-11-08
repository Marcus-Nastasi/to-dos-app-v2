import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Box, Typography } from '@mui/joy';

const settings = {
  width: 400,
  height: 200,
  value: (0.75*100),
};

export default function CompletionRateGraph() {
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
            mb={3}
         >
            Completion Rate
         </Typography>
         <Gauge
            {...settings}
            cornerRadius="50%"
            text={
               ({ value }) => `${value}%`
            }
            sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
               fontSize: 40,
            },
            [`& .${gaugeClasses.valueArc}`]: {
               ":hover": {
                  fill: 'darkgreen'
               },
               fill: '#179917',
               transition: 'all 200ms ease-in-out'
            },
            [`& .${gaugeClasses.referenceArc}`]: {
               fill: theme.palette.text.disabled,
            },
            })}
         />
      </Box>
   );
}
