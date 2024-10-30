'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, accordionSummaryClasses, Button, Dropdown, Menu, MenuButton, MenuItem, Tooltip } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import MoreVert from '@mui/icons-material/MoreVert';
import { AddCircleOutline } from '@mui/icons-material';
import TodoModal from './todo-modal';
import { TodoDto, TodosResponseDto } from '@/types/todos/todos.dto';
import { LoginResponseDto } from '@/types/auth/login.dto';
import Cookie from '@/util/Cookies';
import { useAlert } from '@/contexts/alert-context';
import { updateStatus } from '@/service/todos/todos.service';

export default function TodoCard({ todo, refreshTodos }: { todo: TodoDto, refreshTodos: Function }) {
   const [open, setOpen] = React.useState<boolean>(false);
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

   const updateSt = async (status: 'PENDING' | 'PROGRESS' | 'DONE'): Promise<TodosResponseDto | null> => {
      const userToken: LoginResponseDto | null = getUserToken();
      if (!userToken) throw new Error();
      try {
         const response: TodosResponseDto = await updateStatus(status, todo.id, userToken.token);
         if (!response) throw new Error('cannot update to-do');
         refreshTodos();
         return response;
      } catch (error) {
         showAlert('Unable to get to-dos!' + error, 'error');
         console.error(error);
         return null;
      }
   }

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
            },
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
               <Tooltip variant='outlined' arrow title="Status" placement="top">
                  <MenuButton
                     slots={{ root: IconButton }}
                     slotProps={{ 
                        root: { 
                           variant: 'plain', 
                           color: 'neutral' 
                        } 
                     }}
                  >
                     <MoreVert />
                  </MenuButton>
               </Tooltip>
               <Menu>
                  <MenuItem 
                     color='neutral' 
                     onClick={() => updateSt('PENDING')}
                     sx={{ color: 'gray' }}
                  >
                     <PendingActionsTwoToneIcon color='warning' />
                     Pending
                  </MenuItem>
                  <MenuItem 
                     color='neutral' 
                     onClick={() => updateSt('PROGRESS')}
                     sx={{ color: 'gray' }}
                  >
                     <RotateRightRoundedIcon color='primary' />
                     In progress
                  </MenuItem>
                  <MenuItem 
                     color='neutral'
                     onClick={() => updateSt('DONE')} 
                     sx={{ color: 'gray' }}
                  >
                     <TaskAltRoundedIcon color='success' />
                     Done
                  </MenuItem>
               </Menu>
            </Dropdown>
         </Box>
         <Box>
            <Typography level="h2" >
               { todo.title }
            </Typography>
            <Box
               display={'flex'}
               alignItems={'center'}
               mt={1}
               mb={1}
            >
               {
                  todo.priority == 'HIGH' 
                  ?  <Chip 
                        sx={{ fontWeight: 'bold', mr: 1 }} 
                        size='md'
                        color='warning' 
                        variant="soft" 
                        startDecorator={<KeyboardDoubleArrowUpRoundedIcon color='warning' />}
                     >
                        { todo.priority }
                     </Chip>
                  : todo.priority == 'MEDIUM'
                  ?  <Chip 
                        sx={{ fontWeight: 'bold', mr: 1 }} 
                        size='md'
                        color='primary' 
                        variant="soft" 
                        startDecorator={<KeyboardDoubleArrowRightRoundedIcon color='primary' />}
                     >
                        { todo.priority }
                     </Chip>
                  : todo.priority == 'LOW'
                  ?  <Chip 
                        sx={{ fontWeight: 'bold', mr: 1 }} 
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
                        sx={{ fontWeight: 'bold' }} 
                        size='md'
                        color='danger' 
                        variant="soft" 
                        startDecorator={<PendingActionsTwoToneIcon color='warning' />}
                     >
                        { todo.status }
                     </Chip>
                  : todo.status == 'PROGRESS'
                  ?  <Chip 
                        sx={{ fontWeight: 'bold' }} 
                        size='md'
                        color='primary' 
                        variant="soft" 
                        startDecorator={<RotateRightRoundedIcon color='primary' />}
                     >
                        { todo.status }
                     </Chip>
                  : todo.status == 'DONE'
                  ?  <Chip 
                        sx={{ fontWeight: 'bold' }} 
                        size='md'
                        color='success' 
                        variant="soft" 
                        startDecorator={<TaskAltRoundedIcon color='success' />}
                     >
                        { todo.status }
                     </Chip> : ''
               }
            </Box>
         </Box>
         <CardContent>
            <Typography level="title-lg">
               { `${todo.due[2]}/${todo.due[1]}/${todo.due[0]}` }
            </Typography>
         </CardContent>
         <AccordionGroup
            transition="1s ease"
            size='md'
            sx={{
               width: '100%',
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
                  { todo.description }
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
                  <TodoModal 
                     todo={todo} 
                     open={open} 
                     setOpen={setOpen} 
                     refreshTodos={refreshTodos} 
                  />
               </AccordionDetails>
            </Accordion>
         </AccordionGroup>
      </Card>
   );
}
