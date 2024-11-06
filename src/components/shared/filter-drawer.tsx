'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import { Input } from '@mui/joy';

export default function FilterDrawer({ 
   openFilters, 
   setOpenFilters,
   client, 
   setClient,
   status, 
   setStatus,
   priority, 
   setPriority,
   from, 
   setFrom,
   to, 
   setTo,
   due, 
   setDue,
   getTodosData,
   page, 
   setPage
}: { 
   openFilters: boolean, 
   setOpenFilters: Function ,
   client: string, 
   setClient: Function,
   status: string, 
   setStatus: Function,
   priority: string, 
   setPriority: Function,
   from: string, 
   setFrom: Function
   to: string, 
   setTo: Function,
   due: string, 
   setDue: Function,
   getTodosData: Function,
   page: number, 
   setPage: Function
}) {
   const [ loading, setLoading ] = React.useState<boolean>(false);

   return (
      <React.Fragment>
         <Drawer
            size="md"
            variant="plain"
            open={openFilters}
            anchor='right'
            onClose={() => setOpenFilters(false)}
            slotProps={{
               content: {
                  sx: {
                     bgcolor: 'transparent',
                     p: { md: 3, sm: 0 },
                     boxShadow: 'none',
                     height: {
                        xs: '80vh',
                        md: 'fit-content'
                     },
                     width: {
                        xs: '100%',
                        sm: 'fit-content'
                     }
                  },
               },
            }}
         >
         <Sheet
            sx={{
               alignSelf: 'end',
               borderRadius: 'md',
               p: 2,
               display: 'flex',
               flexDirection: 'column',
               gap: 2,
               height: '100%',
               overflow: 'auto',
               width: {
                  xs: '100%',
                  sm: 'fit-content'
               }
            }}
         >
            <DialogTitle>Filters</DialogTitle>
            <ModalClose />
            <Divider sx={{ mt: 'auto' }} />
            <DialogContent 
               sx={{ 
                  gap: 2,
                  p: 2,
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                     width: "6px",
                     borderRadius: 10
                  },
                  "&::-webkit-scrollbar-track": {
                     backgroundColor: "#f1f1f1",
                     borderRadius: 10
                  },
                  "&::-webkit-scrollbar-thumb": {
                     backgroundColor: "#888",
                     borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                     backgroundColor: "#555",
                     borderRadius: 10
                  }, 
               }}
            >
               <FormControl>
                  <FormLabel 
                     sx={{ 
                        typography: 'title-md', 
                        fontWeight: 'bold' 
                     }}
                     >
                     Priority
                  </FormLabel>
                  <RadioGroup
                     value={priority || ''}
                     onChange={(event) => setPriority(event.target.value)}
                     sx={{
                        mt: -0.1
                     }}
                  >
                     <Box
                        sx={{
                           display: 'grid',
                           gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                           gap: 1.5,
                        }}
                     >
                        {[
                           {
                              name: 'Low',
                              icon: <KeyboardDoubleArrowDownRoundedIcon color='success' />,
                              value: '0'
                           },
                           {
                              name: 'Medium',
                              icon: <KeyboardDoubleArrowRightRoundedIcon color='primary' />,
                              value: '1'
                           },
                           {
                              name: 'High',
                              icon: <KeyboardDoubleArrowUpRoundedIcon color='warning' />,
                              value: '2'
                           },
                        ].map((item) => (
                           <Card
                              key={item.name}
                              sx={{
                                 boxShadow: 'none',
                                 '&:hover': { bgcolor: 'background.level1' },
                              }}
                           >
                              <CardContent>
                                 {item.icon}
                                 <Typography level="title-md">{item.name}</Typography>
                              </CardContent>
                              <Radio
                                 disableIcon
                                 overlay
                                 checked={priority === item.value}
                                 variant="outlined"
                                 color="neutral"
                                 value={item.value}
                                 sx={{ mt: -2 }}
                                 slotProps={{
                                    action: {
                                       sx: {
                                          ...(priority === item.value && {
                                             borderWidth: 2,
                                             borderColor:
                                             'var(--joy-palette-primary-outlinedBorder)',
                                          }),
                                          '&:hover': {
                                             bgcolor: 'transparent',
                                          },
                                       },
                                    },
                                 }}
                              />
                           </Card>
                        ))}
                     </Box>
                  </RadioGroup>
               </FormControl>
               <FormControl>
                  <FormLabel 
                     sx={{ 
                        typography: 'title-md', 
                        fontWeight: 'bold' 
                     }}
                  >
                     Status
                  </FormLabel>
                  <RadioGroup
                     value={status || ''}
                     onChange={(event) => setStatus(event.target.value)}
                     sx={{
                        mt: -0.1
                     }}
                  >
                     <Box
                        sx={{
                           display: 'grid',
                           gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                           gap: 1.5,
                        }}
                     >
                        {[
                           {
                              name: 'Pending',
                              icon: <PendingActionsTwoToneIcon color='warning' />,
                              value: '0'
                           },
                           {
                              name: 'In Progress',
                              icon: <RotateRightRoundedIcon color='primary' />,
                              value: '1'
                           },
                           {
                              name: 'Done',
                              icon: <TaskAltRoundedIcon color='success' />,
                              value: '2'
                           },
                        ].map((item) => (
                           <Card
                              key={item.name}
                              sx={{
                                 boxShadow: 'none',
                                 '&:hover': { bgcolor: 'background.level1' },
                              }}
                           >
                              <CardContent>
                                 {item.icon}
                                 <Typography level="title-md">{item.name}</Typography>
                              </CardContent>
                              <Radio
                                 disableIcon
                                 overlay
                                 checked={status === item.value}
                                 variant="outlined"
                                 color="neutral"
                                 value={item.value}
                                 sx={{ mt: -2 }}
                                 slotProps={{
                                 action: {
                                    sx: {
                                       ...(status === item.value && {
                                          borderWidth: 2,
                                          borderColor:
                                             'var(--joy-palette-primary-outlinedBorder)',
                                       }),
                                       '&:hover': {
                                          bgcolor: 'transparent',
                                       },
                                    },
                                 },
                                 }}
                              />
                           </Card>
                        ))}
                     </Box>
                  </RadioGroup>
               </FormControl>
               <Typography 
                  level="title-md" 
                  sx={{ 
                     fontWeight: 'bold', 
                     mt: 1 
                  }}
               >
                  Client
               </Typography>
               <Input 
                  type='text' 
                  variant='outlined' 
                  color='neutral'
                  placeholder="Client's name..."
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  sx={{
                     mt: -1
                  }}
               />
               <Typography 
                  level="title-md" 
                  sx={{ 
                     fontWeight: 'bold', 
                     mt: 2 
                  }}
               >
                  Creation date
               </Typography>
               <FormControl 
                  orientation="horizontal"
                  sx={{
                     mt: -2
                  }}
               >
                  <FormLabel sx={{ m: 0.2 }}>From</FormLabel>
                  <Input
                     sx={{ m: 1 }}
                     required
                     type="date"
                     value={from}
                     onChange={e => setFrom(e.target.value)}
                  />
                  <FormLabel sx={{ m: 0.2 }}>To</FormLabel>
                  <Input
                     sx={{ m: 1 }}
                     required
                     type="date"
                     value={to}
                     onChange={e => setTo(e.target.value)}
                  />
               </FormControl>
               <Typography 
                  level="title-md" 
                  sx={{ 
                     fontWeight: 'bold', 
                     mt: 1 
                  }}
               >
                  Due date
               </Typography>
               <FormControl 
                  orientation="horizontal"
                  sx={{
                     mt: -2
                  }}
               >
                  <FormLabel sx={{ mx: 0.2 }}>Until</FormLabel>
                  <Input
                     sx={{ m: 1, width: '100%' }}
                     required
                     type="date"
                     value={due}
                     onChange={e => setDue(e.target.value)}
                  />
               </FormControl>
            </DialogContent>
            <Divider sx={{ mt: 'auto' }} />
            <Stack
               direction="row"
               useFlexGap
               spacing={1}
               sx={{ justifyContent: 'space-between' }}
            >
               <Button 
                  variant='solid'
                  color='neutral'
                  loading={loading}
                  onClick={async () => {
                     setLoading(true);
                     setPage(0);
                     // to remove setTimeout... 
                     setTimeout(async () => {
                        await getTodosData(false);
                        setLoading(false);
                        setOpenFilters(false);
                     }, 2000);
                  }}
               >
                  Apply filters
               </Button>
               <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => { 
                     setClient('');
                     setStatus('');
                     setPriority('');
                     setFrom('');
                     setTo('');
                     setDue('');
                  }}
               >
                  Clear
               </Button>
            </Stack>
         </Sheet>
         </Drawer>
      </React.Fragment>
   );
}
