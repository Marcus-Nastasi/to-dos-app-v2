'use client'

import * as React from 'react';
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Typography } from '@mui/joy';

export default function TodoModal({ open, setOpen }: { open: boolean, setOpen: Function }) {
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
                : { visibility: 'visible' },
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
                width: { xs: '90%', sm: '80%', md: '60%', lg: '40%', xl: '30%' }
              }}
            >
              <DialogTitle>Title: asmdkasmdkasdm mksdasdmkasd</DialogTitle>
              <DialogContent>
                  <Typography

                  >
                     Using `react-transition-group` to create a fade animation. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum error maxime expedita dolore, eaque nulla veritatis nesciunt exercitationem. Voluptate, quasi natus distinctio eum inventore et nulla laboriosam quae aut dicta!
                  </Typography>

                  <Typography
                     mt={2}
                  >
                     Due: 16/10/2024
                  </Typography>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}
