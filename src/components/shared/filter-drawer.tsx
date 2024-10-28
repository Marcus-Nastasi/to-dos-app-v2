'use client'

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Stack from '@mui/joy/Stack';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import { Done } from '@mui/icons-material';
import { Input } from '@mui/joy';

export default function FilterDrawer({ 
   openFilters, 
   setOpenFilters 
}: { 
   openFilters: boolean, 
   setOpenFilters: Function 
}) {
   const [type, setType] = React.useState('Guesthouse');
   const [amenities, setAmenities] = React.useState([0, 6]);

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
                        xs: '90vh',
                        sm: '80vh',
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
               <FormControl>
               <FormLabel sx={{ typography: 'title-md', fontWeight: 'bold' }}>
                  Status
               </FormLabel>
               <RadioGroup
                  value={type || ''}
                  onChange={(event) => setType(event.target.value)}
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
                           icon: <HomeRoundedIcon />,
                        },
                        {
                           name: 'In Progress',
                           icon: <ApartmentRoundedIcon />,
                        },
                        {
                           name: 'Done',
                           icon: <MeetingRoomRoundedIcon />,
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
                              checked={type === item.name}
                              variant="outlined"
                              color="neutral"
                              value={item.name}
                              sx={{ mt: -2 }}
                              slotProps={{
                              action: {
                                 sx: {
                                    ...(type === item.name && {
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
               <FormLabel sx={{ typography: 'title-md', fontWeight: 'bold' }}>
                  Priority
               </FormLabel>
               <RadioGroup
                  value={type || ''}
                  onChange={(event) => setType(event.target.value)}
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
                           icon: <HomeRoundedIcon />,
                        },
                        {
                           name: 'Medium',
                           icon: <ApartmentRoundedIcon />,
                        },
                        {
                           name: 'High',
                           icon: <MeetingRoomRoundedIcon />,
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
                              checked={type === item.name}
                              variant="outlined"
                              color="neutral"
                              value={item.name}
                              sx={{ mt: -2 }}
                              slotProps={{
                              action: {
                                 sx: {
                                    ...(type === item.name && {
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
               />
               <Typography level="title-md" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Creation date
               </Typography>
               <FormControl orientation="horizontal">
                  <FormLabel sx={{ m: 0.2 }}>From</FormLabel>
                  <Input
                     sx={{ m: 1 }}
                     required
                     type="date"
                     // value={due}
                     // onChange={e => setDue(e.target.value)}
                  />
                  <FormLabel sx={{ m: 0.2 }}>To</FormLabel>
                  <Input
                     sx={{ m: 1 }}
                     required
                     type="date"
                     // value={due}
                     // onChange={e => setDue(e.target.value)}
                  />
               </FormControl>
               <Typography level="title-md" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Due date
               </Typography>
               <FormControl orientation="horizontal">
                  <FormLabel sx={{ m: 0.2 }}>Until</FormLabel>
                  <Input
                     sx={{ m: 1, width: '100%' }}
                     required
                     type="date"
                     // value={due}
                     // onChange={e => setDue(e.target.value)}
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
                  onClick={() => setOpenFilters(false)}
               >
                  Apply filters
               </Button>
               <Button
               variant="outlined"
               color="neutral"
               onClick={() => {
                  setType('');
                  setAmenities([]);
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
