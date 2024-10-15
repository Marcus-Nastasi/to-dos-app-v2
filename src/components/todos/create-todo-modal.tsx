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
import { Box, IconButton, Option, Select, selectClasses } from '@mui/joy';
import { KeyboardArrowDown } from '@mui/icons-material';

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
            <Add fontWeight={'bold'} />
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
                     minWidth={'400px'}
                  >
                     <DialogTitle>Create new to-do</DialogTitle>
                     <DialogContent>Fill in the information of the to-do.</DialogContent>
                     <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        setOpen(false);
                        }}
                     >
                        <Stack spacing={2}>
                        <FormControl>
                           <FormLabel>Title</FormLabel>
                           <Input autoFocus required />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Client</FormLabel>
                           <Input required />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Description</FormLabel>
                           <Input required />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Link</FormLabel>
                           <Input required />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Due</FormLabel>
                           {/* <Input required /> */}
                           <Input
                              required
                              type="date"
                           />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Priority</FormLabel>
                           <Select
                              placeholder="Select a priority…"
                              indicator={<KeyboardArrowDown />}
                              sx={{
                              width: 240,
                              [`& .${selectClasses.indicator}`]: {
                                 transition: '0.2s',
                                 [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                 },
                              },
                              }}
                           >
                              <Option value="dog">High</Option>
                              <Option value="cat">Medium</Option>
                              <Option value="fish">Low</Option>
                           </Select>
                        </FormControl>
                        <Button type="submit" color='primary'>Submit</Button>
                        </Stack>
                     </form>
                  </ModalDialog>
               </Modal>
            )}
         </Transition>
      </Box>
   );
}
