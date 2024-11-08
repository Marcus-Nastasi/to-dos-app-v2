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
import Stack from '@mui/joy/Stack';
import { Transition } from 'react-transition-group';
import { Box, Option, Select, selectClasses } from '@mui/joy';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useAlert } from '@/contexts/alert-context';
import { TodoDto, TodosRequestDto } from '@/types/todos/todos.dto';
import { LoginResponseDto } from '@/types/auth/login.dto';
import Cookie from '@/util/Cookies';
import { updateTodo } from '@/service/todos/todos.service';

export default function UpdateTodoModal({ 
   refreshTodos,
   open,
   setOpen,
   setLoading,
   todo
}: { 
   refreshTodos: Function,
   open: boolean,
   setOpen: Function,
   setLoading: Function,
   todo: TodoDto
}) {
   const [ title, setTitle ] = useState<string>(todo.title);
   const [ client, setClient ] = useState<string>(todo.client);
   const [ description, setDescription ] = useState<string>(todo.description);
   const [ link, setLink ] = useState<string>(todo.link);
   const [ due, setDue ] = useState<string>(`${todo.due[0]}-${todo.due[1]}-${todo.due[2]}`);
   const [ priority, setPriority ] = useState<string>(todo.priority);
   const { showAlert } = useAlert();

   const getUserToken = (): LoginResponseDto | null => {
      const cookie_token: string | null = Cookie.getCookie('todos_app_session');
      if (!cookie_token || cookie_token == null) {
         window.open('/login', '_blank');
         return null;
      }
      const data: LoginResponseDto = JSON.parse(cookie_token);
      return data;
   };

   const handleSubmit = async (e: FormEvent) => {
      setLoading(true);
      if (!title && !client && !description && !link && !due && !priority)
         throw new Error();
      const userToken: LoginResponseDto | null = getUserToken();
      if (!userToken) {
         window.open('/login', '_self');
         throw new Error('Invalid user');
      }
      const data: Partial<TodosRequestDto> = {
         title,
         client,
         description,
         link,
         due,
         priority
      };
      try {
         const response: TodoDto = await updateTodo(data, +todo.id, userToken.token);
         console.log(response);
         showAlert('To-do updated successfully!', 'success');
         await refreshTodos();
      } catch (error) {
         showAlert('Not able to update to-do! Try again!', 'error');
         console.error(error);
      } finally {
         setLoading(false);
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
                     <DialogTitle>Update to-do</DialogTitle>
                     <DialogContent>Update the information of the to-do.</DialogContent>
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
                              value={title}
                              onChange={(e: any) => setTitle(e.target.value)} 
                           />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Client</FormLabel>
                           <Input 
                              required
                              value={client}
                              onChange={(e: any) => setClient(e.target.value)} 
                           />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Description</FormLabel>
                           <Input 
                              required
                              value={description}
                              onChange={(e: any) => setDescription(e.target.value)} 
                           />
                        </FormControl>
                        <FormControl>
                           <FormLabel>Link</FormLabel>
                           <Input 
                              required 
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
                              indicator={<KeyboardArrowDown />}
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
                                 High
                              </Option>
                              <Option value="MEDIUM" onClick={() => setPriority('MEDIUM')}>
                                 Medium
                              </Option>
                              <Option value="LOW" onClick={() => setPriority('LOW')}>
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
