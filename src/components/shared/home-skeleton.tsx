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
               px: 10,
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
               sx={{ my: 8 }} 
            />
            <Skeleton 
               variant="text" 
               level="h2" 
               sx={{ mb: 8 }}
            />

            {[
               '', '', '', '', '', '', '', '', '', '', '', ''
            ].map(() => 
               <AspectRatio 
                  variant="plain" 
                  sx={{ width: '20vw', m: 2 }}
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
