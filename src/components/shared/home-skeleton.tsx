'use client'

import { AspectRatio, Box, extendTheme, Skeleton } from "@mui/joy";
import { Fragment } from "react";

export default function HomeSkeleton() {
   return (
      <Fragment>
         <Box
            sx={(theme) => ({
               width: '99vw',
               height: 'fit-content',
               px: { 
                  xs: 1,
                  sm: 2,
                  md: 5,
                  lg: 10
               },
               py: 2,
               display: 'flex',
               justifyContent: 'center',
               flexWrap: 'wrap',
               overflowX: 'hidden',
               bgcolor: theme.palette.mode == 'dark' ? '#2D2D2D' : ''
            })}
         >
            <Skeleton 
               variant="text" 
               level="h1" 
               sx={{
                  width: {
                     xs: '90%',
                     sm: '80%', 
                     md: '50%'
                  }, 
                  my: {
                     xs: 2,
                     md: 8
                  } 
               }} 
            />
            <Skeleton 
               variant="text" 
               level="h2" 
               sx={{
                  width: {
                     xs: '70%',
                     sm: '60%', 
                     md: '50%'
                  }, 
                  my: {
                     xs: 2,
                     md: 8
                  } 
               }} 
            />
            {[
               '', '', '', '', '', '', '', '', '', '', '', ''
            ].map(() => 
               <AspectRatio 
                  variant="plain" 
                  sx={{ 
                     width: { 
                        xs: '100vw',
                        md: '20vw' 
                     }, 
                     m: 2 
                  }}
               >
                  <Skeleton loading={true}>
                  </Skeleton>
               </AspectRatio>
            )
            }
         </Box>
      </Fragment>
   );
}
