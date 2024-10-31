'use client'

import { AspectRatio, Box, Skeleton } from "@mui/joy";
import { Fragment } from "react";

export default function HomeSkeleton() {
   return (
      <Fragment>
         <Box
            sx={(theme) => ({
               width: '99vw',
               minHeight: '100vh',
               maxHeight: 'fit-content',
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
            <Box
               sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
               }}
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
                        md: 5
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
                        md: 5
                     } 
                  }} 
               />
            </Box>
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
            )}
         </Box>
      </Fragment>
   );
}
