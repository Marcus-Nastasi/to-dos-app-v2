'use client'

import * as React from 'react';
import { Transition } from 'react-transition-group';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/joy';
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { TodoDto } from '@/types/todos/todos.dto';
import { LoginResponseDto } from '@/types/auth/login.dto';
import Cookie from '@/util/Cookies';
import { deleteTodo } from '@/service/todos/todos.service';
import { useAlert } from '@/contexts/alert-context';
import UpdateTodoModal from './update-todo-modal';

export default function TodoModal({ 
   open, 
   setOpen,
   todo,
   refreshTodos
}: { 
   open: boolean, 
   setOpen: Function,
   todo: TodoDto,
   refreshTodos: Function 
}) {
   const [ openEdit, setOpenEdit ] = React.useState<boolean>(false);
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

   const handleDelete = async () => {
      const userToken: LoginResponseDto | null = getUserToken();
      if (!userToken) return;
      try {
         const response = await deleteTodo(+todo.id, userToken.token);
         showAlert('To-do deleted successfully!', 'success');
         setOpen(false);
         refreshTodos();
      } catch (error) {
         console.error(error);
         showAlert('Not able to delete to-do! Try again!', 'error');
      }
   };

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
                     maxHeight: '98vh',
                     minHeight: 'fit-content',
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
                     <Typography level="h1">
                        { todo.title }
                     </Typography>
                     <Typography level="h2" sx={{ fontSize: 'xl', mb: 0.5 }}>
                        { todo.client }
                     </Typography>
                     <Typography>
                        { todo.description }
                     </Typography>
                     {
                        todo.priority == 'HIGH' 
                        ?  <Chip 
                              sx={{ fontWeight: 'bold', mt: 2 }} 
                              size='md'
                              color='warning' 
                              variant="soft" 
                              startDecorator={<KeyboardDoubleArrowUpRoundedIcon color='warning' />}
                           >
                              { todo.priority }
                           </Chip>
                        : todo.priority == 'MEDIUM'
                        ?  <Chip 
                              sx={{ fontWeight: 'bold', mt: 2 }} 
                              size='md'
                              color='primary' 
                              variant="soft" 
                              startDecorator={<KeyboardDoubleArrowRightRoundedIcon color='primary' />}
                           >
                              { todo.priority }
                           </Chip>
                        : todo.priority == 'LOW'
                        ?  <Chip 
                              sx={{ fontWeight: 'bold', mt: 2 }} 
                              size='md'
                              color='success' 
                              variant="soft" 
                              startDecorator={<KeyboardDoubleArrowDownRoundedIcon color='success' />}
                           >
                              { todo.priority }
                           </Chip> : ''
                     }
                     {
                        todo.status == 'PENDING' 
                        ?  <Chip 
                              sx={{ fontWeight: 'bold', mb: 2 }} 
                              size='md'
                              color='danger' 
                              variant="soft" 
                              startDecorator={<PendingActionsTwoToneIcon color='warning' />}
                           >
                              { todo.status }
                           </Chip>
                        : todo.status == 'PROGRESS'
                        ?  <Chip 
                              sx={{ fontWeight: 'bold', mb: 2 }} 
                              size='md'
                              color='primary' 
                              variant="soft" 
                              startDecorator={<RotateRightRoundedIcon color='primary' />}
                           >
                              { todo.status }
                           </Chip>
                        : todo.status == 'DONE'
                        ?  <Chip 
                              sx={{ fontWeight: 'bold', mb: 2 }} 
                              size='md'
                              color='success' 
                              variant="soft" 
                              startDecorator={<TaskAltRoundedIcon color='success' />}
                           >
                              { todo.status }
                           </Chip> : ''
                     }
                     <Typography fontWeight={'bold'} >
                        Due
                     </Typography>
                     <Typography mb={1}>
                        { `${todo.due[2]}/${todo.due[1]}/${todo.due[0]}` }
                     </Typography>
                     <Typography fontWeight={'bold'}>
                        Link
                     </Typography>
                     <Typography mb={1}>{ todo.link }</Typography>
                     <Typography fontWeight={'bold'} >
                        Created at
                     </Typography>
                     <Typography mb={1}>
                        { `${todo.creation[2]}/${todo.creation[1]}/${todo.creation[0]}` }
                     </Typography>
                     <Typography fontWeight={'bold'}>
                        Last Updated at
                     </Typography>
                     <Typography>
                        { `${todo.last_updated[2]}/${todo.last_updated[1]}/${todo.last_updated[0]}` }
                     </Typography>
                     <Box
                        display={'flex'}
                        justifyContent={'end'}
                        marginTop={2}
                     >
                        <UpdateTodoModal 
                           refreshTodos={refreshTodos} 
                           open={openEdit} 
                           setOpen={setOpenEdit} 
                           todo={todo}
                        />
                        <Tooltip 
                           arrow 
                           variant='outlined' 
                           title="Edit" 
                           placement="top"
                        >
                           <IconButton 
                              disabled={false} 
                              variant="plain"
                              color='neutral'
                              onClick={() => setOpenEdit(true)}
                              sx={{ mr: 1 }}
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
                              onClick={handleDelete}
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
