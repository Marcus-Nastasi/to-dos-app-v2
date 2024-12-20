'use client'

import MenuDrawer from '@/components/shared/menu-drawer';
import AddIcon from '@mui/icons-material/Add';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, accordionSummaryClasses, Box, Button, CssVarsProvider, DialogActions, DialogContent, DialogTitle, Divider, extendTheme, Modal, ModalDialog, Tooltip, Typography, useColorScheme } from "@mui/joy";
import { Fragment, useEffect, useState } from "react";
import CredentialForm from '@/components/users/credential-form';
import { LoginResponseDto } from '@/types/auth/login.dto';
import Cookie from '@/util/Cookies';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Brightness5RoundedIcon from '@mui/icons-material/Brightness5Rounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { deleteUser } from '@/service/users/user.service';
import { useAlert } from '@/contexts/alert-context';

function ToggleThemeButton() {
   const { mode, setMode } = useColorScheme();
   const toggleMode = () => mode == "dark" ? setMode("light") : setMode("dark");

   useEffect(() => {
      mode == "dark" ? setMode("dark") : setMode("light");
   });

   return (
      <Tooltip variant='outlined' arrow title="Theme" placement="left">
         <Button
            variant='plain'
            color={'neutral'} 
            onClick={toggleMode}
            sx={{
               width: 'fit-content',
               height: 'fit-content',
               padding: 0.3,
               position: 'absolute',
               right: { xs: 10, md: 15 },
               top: { xs: 10, md: 15 },
               margin: { xs: 2, md: 3 },
            }}
         >
            {
               mode === "dark" 
               && <Brightness5RoundedIcon  
                     sx={{
                        fontSize: { xs: 27, md: 29 },
                     }}
                  />  
               || <NightlightIcon 
                     sx={{
                        fontSize: { xs: 30, md: 32 },
                        ":hover": {
                           cursor: 'unset'
                        }
                     }}
                  /> 
            }
         </Button>
      </Tooltip>
   );
}

const theme = extendTheme({
   colorSchemes: {
      dark: {
         palette: {
            background: {
               level2: 'white',
               body: '#2D2D2D', 
               level3: '#424242'
            },
            text: {
               primary: '#eaeaea',
            },
         },
      },
      light: {
         palette: {
            background: {
               body: "#eaeaea",
            },
            text: {
               primary: "#212121",
               secondary: "#424242",
            },
         },
      },
   },
});

export default function Account() {
   const [ userCookie, setUserCookie ] = useState<LoginResponseDto>();
   const [ openLogOut, setOpenLogOut] = useState<boolean>(false);
   const [ openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false);
   const { showAlert } = useAlert();

   useEffect(() => {
      const gettingUser = getUserToken();
      if (!gettingUser) {
         Cookie.cleanCookies();
         window.open('/login', '_self');
         return
      }
      setUserCookie(gettingUser);
   }, []);

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

   const handleLogOut = (e: MouseEvent) => {
      e.preventDefault();
      Cookie.cleanCookies();
      window.open('/login', '_self');
   };

   const handleDeleteAccount = async (): Promise<void> => {
      try {
         const userCookie: LoginResponseDto | null = getUserToken();
         if (userCookie) await deleteUser(userCookie.user.id, userCookie.token);
         Cookie.cleanCookies();
         window.open('/register', '_self');
      } catch (error: any) {
         console.error(error);
         showAlert(error.message(), 'error');
      }
   }

   return (
      <Fragment>

         {/* Confirm log off */}
         <Modal
            open={openLogOut} 
            onClose={() => setOpenLogOut(false)}
         >
            <ModalDialog 
               variant="outlined" 
               role="alertdialog"
            >
               <DialogTitle>
                  <WarningRoundedIcon />
                  Confirmation
               </DialogTitle>
               <Divider />
               <DialogContent>
                  Are you sure you want to logout?
               </DialogContent>
               <DialogActions>
                  <Button 
                     size='sm'
                     variant="solid" 
                     color="danger" 
                     onClick={(e: any) => handleLogOut(e)}
                  >
                     Logout
                  </Button>
                  <Button 
                     size='sm'
                     variant="plain" 
                     color="neutral" 
                     onClick={() => setOpenLogOut(false)}
                  >
                     Cancel
                  </Button>
               </DialogActions>
            </ModalDialog>
         </Modal>
         {/* end */}

         {/* Confirm delete account */}
         <Modal
            open={openDeleteAccount} 
            onClose={() => setOpenDeleteAccount(false)}
         >
            <ModalDialog 
               variant="outlined" 
               role="alertdialog"
            >
               <DialogTitle>
                  <WarningRoundedIcon />
                  Confirmation
               </DialogTitle>
               <Divider />
               <DialogContent sx={{ fontWeight: 'bold' }}>
                  Are you sure you want to delete your account? 
               </DialogContent>
               <DialogContent sx={{ fontWeight: 'bold' }} >
                  You can not undo this operaition and your to-dos will be lost.
               </DialogContent>
               <DialogActions>
                  <Button 
                     size='sm'
                     variant="solid" 
                     color="danger" 
                     onClick={() => handleDeleteAccount()}
                  >
                     Delete
                  </Button>
                  <Button 
                     size='sm'
                     variant="plain" 
                     color="neutral" 
                     onClick={() => setOpenDeleteAccount(false)}
                  >
                     Cancel
                  </Button>
               </DialogActions>
            </ModalDialog>
         </Modal>
         {/* end */}

         <CssVarsProvider theme={theme} defaultMode={"light"} >
            <ToggleThemeButton />
            <Box
               sx={{
                  bgcolor: 'background.body',
                  width: '100%',
                  minHeight: '100vh',
                  maxHeight: 'fit-content',
                  transition: 'all ease-in-out 320ms',
                  overflowX: 'hidden'
               }}
            >
               <MenuDrawer />
               <Typography
                  textAlign={'center'}
                  paddingY={5}
                  sx={{
                     fontSize: {
                        xs: 25, 
                        sm: 30, 
                        md: 35,
                     },
                     fontWeight: 'bold'
                  }}
               >
                  Manage account
               </Typography>
               <Box
                  width={'100vw'}
                  height={'fit-content'}
                  display={'flex'}
                  justifyContent={'center'}
               >
                  <Box
                     display={'flex'}
                     justifyContent={'center'}
                     width={{ 
                        xs: '95vw', 
                        sm: '85vw', 
                        md: '80vw', 
                        lg: '65vw' 
                     }}
                     paddingX={{ 
                        xs: 3, 
                        sm: 4, 
                        lg: 5 
                     }}
                     mb={5}
                     borderRadius={5}
                  >
                     <AccordionGroup
                        size='lg'
                        sx={{
                           maxWidth: { 
                              xs: '100%', 
                              md: '50%',
                              xl: '60%'
                           },
                           [`& .${accordionSummaryClasses.indicator}`]: {
                              transition: '0.2s',
                           },
                           [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
                              transform: 'rotate(45deg)',
                           },
                        }}
                     >
                        <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              <Typography
                                 startDecorator={<AccountCircleRoundedIcon />}
                                 fontWeight={'bold'}
                              >
                                 Credentials
                              </Typography>
                           </AccordionSummary>
                           <AccordionDetails>
                              <CredentialForm userCookie={userCookie} />
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              <Typography
                                 startDecorator={<BadgeRoundedIcon />}
                                 fontWeight={'bold'}
                              >
                                 Account
                              </Typography>
                           </AccordionSummary>
                           <AccordionDetails
                              sx={{ pt: 3 }}
                           >
                              <Button
                                 size='sm'
                                 variant='solid'
                                 color='danger'
                                 sx={{ 
                                    width: 'fit-content', 
                                    alignSelf: 'center',
                                    borderRadius: 4 
                                 }}
                                 onClick={() => setOpenDeleteAccount(true)}
                              >
                                 Delete account
                              </Button>
                           </AccordionDetails>
                        </Accordion>
                        <Box
                           padding={3}
                           display={{ 
                              xs: 'flex' 
                           }}
                           justifyContent={{ 
                              xs: 'center', 
                              md: 'end' 
                           }}
                           width={'100%'}
                           mt={5}
                        >
                           <Button
                              size='sm'
                              variant='solid'
                              color='danger'
                              onClick={() => setOpenLogOut(true)}
                              sx={{
                                 width: {
                                    xs: '80%',
                                    md: 'fit-content'
                                 },
                                 borderRadius: 4
                              }}
                           >
                              Logout
                           </Button>
                        </Box>
                     </AccordionGroup>
                  </Box>
               </Box>
            </Box>
         </CssVarsProvider>
      </Fragment>
   );
}
