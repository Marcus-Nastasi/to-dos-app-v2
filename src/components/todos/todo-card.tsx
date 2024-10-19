'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, accordionSummaryClasses, Button, Dropdown, Menu, MenuButton, MenuItem, Tooltip } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import MoreVert from '@mui/icons-material/MoreVert';
import { AddCircleOutline } from '@mui/icons-material';
import TodoModal from './todo-modal';

export default function TodoCard() {
   const [open, setOpen] = React.useState<boolean>(false);
   return (
      <Card
         variant='outlined'
         color='neutral'
         invertedColors
         sx={{
            boxShadow: 'md',
            width: {
               xs: '90%',
               sm: '80%',
               md: '47%',
               lg: '40%',
               xl: 400
            },
            height: 'fit-content',
            my: {
               xs: 1,
               md: 2,
            }
         }}
      >
         <Box
            sx={{
               position: 'absolute',
               right: 10
            }}
         >
            <Dropdown>
               <Tooltip variant='outlined' arrow title="Status" placement="top">
                  <MenuButton
                     slots={{ root: IconButton }}
                     slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                  >
                     <MoreVert />
                  </MenuButton>
               </Tooltip>
               <Menu>
                  <MenuItem color='danger' sx={{ color: 'gray' }}>
                     Pending
                  </MenuItem>
                  <MenuItem color='primary' sx={{ color: 'gray' }}>
                     In progress
                  </MenuItem>
                  <MenuItem color='success' sx={{ color: 'gray' }}>
                     Done
                  </MenuItem>
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
         <AccordionGroup
            size='md'
            sx={{
               maxWidth: 400,
               [`& .${accordionSummaryClasses.indicator}`]: {
                  transition: '0.2s',
               },
               [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
                  transform: 'rotate(45deg)',
               },
               borderRadius: 5
            }}
         >
            <Accordion>
               <AccordionSummary indicator={<AddCircleOutline />}>
                  Details
               </AccordionSummary>
               <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.
                  <Button 
                     onClick={() => setOpen(true)}
                     variant='soft'
                     color='neutral'
                     size='sm'
                     sx={{
                        mt: 2.5
                     }}
                  >
                     Open
                  </Button>
                  <TodoModal open={open} setOpen={setOpen} />
               </AccordionDetails>
            </Accordion>
         </AccordionGroup>
      </Card>
   );
}
