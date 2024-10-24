'use client'

import * as React from 'react';
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/joy';
import { Surfing } from '@mui/icons-material';
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function TodoModal({ 
   open, 
   setOpen
}: { 
   open: boolean, 
   setOpen: Function 
}) {
  return (
    <React.Fragment>
      <Transition in={open} timeout={400}>
        {(state: string) => (
          <Modal
            keepMounted
            open={!['exited', 'exiting'].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: 'none',
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                  }[state],
                },
              },
            }}
            sx={[
               state === 'exited'
               ? { visibility: 'hidden' }
               : { visibility: 'visible' }
            ]}
          >
            <ModalDialog
              sx={{
               opacity: 0,
               transition: `opacity 300ms`,
               ...{
               entering: { opacity: 1 },
               entered: { opacity: 1 },
               }[state],
               width: { xs: '90%', sm: '80%', md: '60%', lg: '40%', xl: '30%' },
               height: '98vh',
               overflowY: "scroll",
               "&::-webkit-scrollbar": {
                  width: "6px",
               },
               "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f1f1f1",
               },
               "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "10px",
               },
               "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555",
               },
              }}
            >
               <Typography level="h1">Title: asmdkasmdkasdm mksdasdmkasd</Typography>
               <Typography level="h2" sx={{ fontSize: 'xl', mb: 0.5 }}>
                  Client
               </Typography>
               <Typography>
               Using `react-transition-group` to create a fade animation. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum error maxime expedita dolore, eaque nulla veritatis nesciunt exercitationem. Voluptate, quasi natus distinctio eum inventore et nulla laboriosam quae aut dicta!
               </Typography>
               <Typography>
                  Using `react-transition-group` to create a fade animation. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum error maxime expedita dolore, eaque nulla veritatis nesciunt exercitationem. Voluptate, quasi natus distinctio eum inventore et nulla laboriosam quae aut dicta!
               </Typography>
               <Chip 
                  sx={{ mt: 2, fontWeight: 'bold' }} 
                  size='md'
                  color='danger' 
                  variant="soft" 
                  startDecorator={<PendingActionsTwoToneIcon color='warning' />}
               >
                  Pending
               </Chip>
               <Chip 
                  sx={{ mb: 2, fontWeight: 'bold' }} 
                  size='md'
                  color='primary' 
                  variant="soft" 
                  startDecorator={<Surfing color='primary' />}
               >
                  High
               </Chip>
               <Typography fontWeight={'bold'} >
                  Due
               </Typography>
               <Typography mb={1}>16/10/2024</Typography>
               <Typography fontWeight={'bold'}>
                  Link
               </Typography>
               <Typography mb={1}>http://localhost:3000</Typography>
               <Typography fontWeight={'bold'} >
                  Created at
               </Typography>
               <Typography mb={1}>12/12/2022</Typography>
               <Typography fontWeight={'bold'}>
                  Last Updated at
               </Typography>
               <Typography>12/12/2022</Typography>
               <Box
                  display={'flex'}
                  justifyContent={'end'}
                  marginTop={2}
               >
                  <Tooltip 
                     arrow 
                     variant='outlined' 
                     title="Edit" 
                     placement="top"
                  >
                     <IconButton 
                        sx={{ mr: 1 }}
                        disabled={false} 
                        variant="plain"
                        color='primary'
                     >
                        <EditNoteRoundedIcon />
                     </IconButton>
                  </Tooltip>
                  <Tooltip 
                     arrow 
                     color='danger' 
                     variant='outlined' 
                     title="Delete" 
                     placement="top"
                  >
                     <IconButton 
                        disabled={false} 
                        variant="plain"
                        color='danger'
                     >
                        <DeleteRoundedIcon />
                     </IconButton>
                  </Tooltip>
               </Box>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}
