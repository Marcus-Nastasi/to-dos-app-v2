import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Link } from '@mui/joy';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import LineAxisRoundedIcon from '@mui/icons-material/LineAxisRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function MenuDrawer() {
   const [open, setOpen] = React.useState(false);
   const [type, setType] = React.useState('Guesthouse');

   return (
      <React.Fragment>
         <IconButton
            variant='plain'
            color="neutral"
            size='lg'
            onClick={() => { setOpen(true); }}
            sx={{
               position: 'absolute',
               top: 30,
               left: 30
            }}
         >
            <MenuIcon />
         </IconButton>
         <Drawer
            size="md"
            variant="plain"
            open={open}
            onClose={() => setOpen(false)}
            slotProps={{
               content: {
                  sx: {
                     bgcolor: 'transparent',
                     p: { md: 3, sm: 0 },
                     boxShadow: 'none',
                  },
               },
            }}
         >
         <Sheet
            sx={{
               borderRadius: 'md',
               p: 2,
               display: 'flex',
               flexDirection: 'column',
               gap: 2,
               height: 'fit-content',
               overflow: 'auto',
            }}
         >
            <DialogTitle>Menu</DialogTitle>
            <ModalClose />
            <Divider sx={{ mt: 'auto' }} />
            <DialogContent sx={{ gap: 2 }}>
               <FormControl>
               <FormLabel sx={{ typography: 'title-md', fontWeight: 'bold' }}>
                  App
               </FormLabel>
               <RadioGroup
                  value={type || ''}
                  onChange={(event) => {
                     setType(event.target.value);
                  }}
               >
                  <Box
                     sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: 1.5,
                     }}
                  >
                     {[
                        {
                           name: 'Home',
                           icon: <HomeRoundedIcon color='primary' />,
                           link: '/'
                        },
                        {
                           name: 'Dashboard',
                           icon: <LineAxisRoundedIcon color='success' />,
                           link: '/dashboard'
                        }
                     ].map((item) => (
                        <a href={item.link}>
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
                           </Card>
                        </a>
                     ))}
                  </Box>
               </RadioGroup>
               </FormControl>
               <Typography level="title-md" sx={{ fontWeight: 'bold', mt: 1 }}>
                  Profile
               </Typography>
               <Box
                  sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: 1.5,
                  }}
               >
                  {[
                     {
                        name: 'Account',
                        icon: <PersonPinIcon htmlColor='#A021F0' />,
                        link: '/account'
                     },
                     {
                        name: 'Configuration',
                        icon: <MiscellaneousServicesRoundedIcon color='warning' />,
                        link: '/configuration'
                     }
                  ].map((item) => (
                     <a href={item.link}>
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
                        </Card>
                     </a>
                  ))}
               </Box>
            </DialogContent>
            <Divider sx={{ mt: 2,  }} />
            <Link 
               href='/about'
               width={'fit-content'} 
               underline='none' 
               color='neutral'
               variant='plain'
               startDecorator={<InfoOutlinedIcon />}
            >
               About the app
            </Link>
         </Sheet>
         </Drawer>
      </React.Fragment>
   );
}
