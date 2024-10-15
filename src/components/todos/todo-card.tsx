import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';

export default function TodoCard() {
   return (
      <Card
         variant="solid"
         color="primary"
         invertedColors
         sx={{
            boxShadow: 'lg',
            width: {
               xs: '90%',
               sm: '70%',
               md: '50%',
               lg: '30%',
               xl: '30%'
            },
            height: 'fit-content',
            m: 1
         }}
      >
         <Box
            sx={{
               position: 'absolute',
               right: 10
            }}
         >
            <Dropdown>
               <MenuButton
                  variant='plain'
                  sx={{
                     width: 'fit-content'
                  }}
               >
                  Format
               </MenuButton>
               <Menu>
                  <MenuItem>pending</MenuItem>
                  <MenuItem>in progress</MenuItem>
                  <MenuItem>done</MenuItem>
               </Menu>
            </Dropdown>
         </Box>
         <Box>
            <Typography level="h2" mb={3}>
               Title bla bla bla
            </Typography>
            <Chip size="md" variant="soft" color='warning' sx={{ mb: 3 }}>
               High
            </Chip>
         </Box>
         <CardContent>
            <Typography level="title-lg">16/10/2024</Typography>
         </CardContent>
      </Card>
   );
}
