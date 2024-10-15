import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { Transition } from 'react-transition-group';
import { Box, IconButton } from '@mui/joy';

export default function CreateTodoModal() {
   const [open, setOpen] = React.useState<boolean>(false);
   return (
      <Box
         sx={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            alignSelf: 'center'
         }}
      >
         <IconButton
            variant='soft'
            color='neutral'
            // startDecorator={<Add />}
            onClick={() => setOpen(true)}
            size='lg'
         >
            <Add />
         </IconButton>
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
                     }}
                  >
                     <DialogTitle>Create new project</DialogTitle>
                     <DialogContent>Fill in the information of the project.</DialogContent>
                     <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        setOpen(false);
                        }}
                     >
                        <Stack spacing={2}>
                        <FormControl>
                           <FormLabel>Name</FormLabel>
                           <Input autoFocus required />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Description</FormLabel>
                           <Input required />
                        </FormControl>
                        <Button type="submit">Submit</Button>
                        </Stack>
                     </form>
                  </ModalDialog>
               </Modal>
            )}
         </Transition>
      </Box>
   );
}
