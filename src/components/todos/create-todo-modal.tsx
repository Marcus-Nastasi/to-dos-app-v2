'use client'

import { FormEvent, useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { Transition } from 'react-transition-group';
import { Box, IconButton, Option, Select, selectClasses, Tooltip } from '@mui/joy';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useAlert } from '@/contexts/alert-context';
import { TodosRequestDto } from '@/types/todos/todos.dto';
import { LoginResponseDto } from '@/types/auth/login.dto';
import Cookie from '@/util/Cookies';
import { create } from '@/service/todos/todos.service';

export default function CreateTodoModal({ refreshTodos }: { refreshTodos: Function }) {
   const [open, setOpen] = useState<boolean>(false);
   const [ title, setTitle ] = useState<string>('');
   const [ client, setClient ] = useState<string>('');
   const [ description, setDescription ] = useState<string>('');
   const [ link, setLink ] = useState<string>('');
   const [ due, setDue ] = useState<string>('');
   const [ priority, setPriority ] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('LOW');
   const { showAlert } = useAlert();

   const getUserToken = (): LoginResponseDto | null => {
      const cookie_token: string | null = Cookie.getCookie('todos_app_session');
      if (!cookie_token || cookie_token == null) {
         Cookie.cleanCookies();
         window.open('/login', '_blank');
         return null;
      }
      const data: LoginResponseDto = JSON.parse(cookie_token);
      return data;
   };

   const handleSubmit = async (e: FormEvent): Promise<void> => {
      if (!title && !client && !description && !link && !due && !priority)
         throw new Error();
      const userToken: LoginResponseDto | null = getUserToken();
      if (!userToken) {
         Cookie.cleanCookies();
         throw new Error('Invalid user');
      }
      const data: TodosRequestDto = {
         user_id: userToken.user.id,
         title,
         client,
         description,
         link,
         due,
         priority
      };
      try {
         await create(data, userToken.token);
         showAlert('To-do created successfully!', 'success');
         refreshTodos();
      } catch (error) {
         showAlert('Not able to create to-do! Try again!', 'error');
         console.error(error);
      }
   };

   return (
      <Box
         sx={{
            position: 'fixed',
            bottom: { xs: 20, md: 40 },
            right: { xs: 20, md: 40 },
            alignSelf: 'center'
         }}
      >
         <Tooltip variant='outlined' arrow title="New to-do" placement='top-end'>
            <IconButton
               variant='soft'
               color='neutral'
               onClick={() => setOpen(true)}
               size='lg'
            >
               <Add fontWeight={'bold'} />
            </IconButton>
         </Tooltip>
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
                           handleSubmit(event);
                        }}
                     >
                        <Stack spacing={2}>
                        <FormControl>
                           <FormLabel>Title</FormLabel>
                           <Input 
                              autoFocus 
                              required 
                              placeholder='Title...'
                              value={title}
                              onChange={(e: any) => setTitle(e.target.value)} 
                           />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Client</FormLabel>
                           <Input 
                              required
                              placeholder='Client...'
                              value={client}
                              onChange={(e: any) => setClient(e.target.value)} 
                           />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Description</FormLabel>
                           <Input 
                              required
                              placeholder='Description...'
                              value={description}
                              onChange={(e: any) => setDescription(e.target.value)} 
                           />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Link</FormLabel>
                           <Input 
                              required 
                              placeholder='Link...'
                              value={link}
                              onChange={(e: any) => setLink(e.target.value)} 
                           />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Due</FormLabel>
                           <Input
                              required
                              type="date"
                              value={due}
                              onChange={e => setDue(e.target.value)}
                           />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Priority</FormLabel>
                           <Select
                              placeholder="Select a priority…"
                              indicator={
                                 priority == 'HIGH' ? 
                                 <KeyboardDoubleArrowUpRoundedIcon color='warning' /> :
                                 priority == 'MEDIUM' ?
                                 <KeyboardDoubleArrowRightRoundedIcon color='primary' /> :
                                 priority == 'LOW' ?
                                 <KeyboardDoubleArrowDownRoundedIcon color='success' /> : <KeyboardArrowDown/>
                              }
                              value={priority}
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
                              <Option value="HIGH" onClick={() => setPriority('HIGH')}>
                                 <KeyboardDoubleArrowUpRoundedIcon color='warning' />
                                 High
                              </Option>
                              <Option value="MEDIUM" onClick={() => setPriority('MEDIUM')}>
                                 <KeyboardDoubleArrowRightRoundedIcon color='primary' />
                                 Medium
                              </Option>
                              <Option value="LOW" onClick={() => setPriority('LOW')}>
                                 <KeyboardDoubleArrowDownRoundedIcon color='success' />
                                 Low
                              </Option>
                           </Select>
                        </FormControl>
                        <Button type="submit" color='neutral' variant='solid'>Submit</Button>
                        </Stack>
                     </form>
                  </ModalDialog>
               </Modal>
            )}
         </Transition>
      </Box>
   );
}
