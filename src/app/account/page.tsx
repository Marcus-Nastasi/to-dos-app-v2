'use client'

import MenuDrawer from '@/components/shared/menu-drawer';
import AddIcon from '@mui/icons-material/Add';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import NightlightIcon from '@mui/icons-material/Nightlight';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, accordionSummaryClasses, Box, Button, CssVarsProvider, extendTheme, Tooltip, Typography, useColorScheme } from "@mui/joy";
import { Fragment, useEffect, useState } from "react";
import CredentialForm from '@/components/users/credential-form';
import { UserDetails } from '@/types/user/user.dto';
import { LoginResponseDto } from '@/types/auth/login.dto';
import Cookie from '@/util/Cookies';

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
               && <EmojiObjectsIcon  
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

   useEffect(() => {
      const gettingUser = getUserToken();
      if (!gettingUser) {
         window.open('/login', '_self');
         return
      }
      setUserCookie(gettingUser);
   }, []);

   const getUserToken = (): LoginResponseDto | null => {
      const cookie_token: string | null = Cookie.getCookie('todos_app_session');
      if (!cookie_token || cookie_token == null) {
         window.open('/login', '_blank');
         return null;
      }
      const data: LoginResponseDto = JSON.parse(cookie_token);
      return data;
   };

   return (
      <Fragment>
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
                        lg: 40, 
                        xl: 45
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
                     // sx={(theme) => ({
                     //    bgcolor: theme.palette.mode === 'light' 
                     //    ? theme.palette.neutral[300] 
                     //    : theme.palette.neutral[800]
                     // })}
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
                                 startDecorator={<AccountCircleOutlinedIcon />}
                                 fontWeight={'bold'}
                              >
                                 Credentials
                              </Typography>
                           </AccordionSummary>
                           <AccordionDetails>
                              <CredentialForm userCookie={userCookie} />
                           </AccordionDetails>
                        </Accordion>
                        {/* <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              <Typography
                                 startDecorator={<InfoOutlinedIcon />}
                                 fontWeight={'bold'}
                              >
                                 Information
                              </Typography>
                           </AccordionSummary>
                           <AccordionDetails>
                              <InformationForm />
                           </AccordionDetails>
                        </Accordion> */}
                        <Box
                           display={{ xs: 'flex' }}
                           justifyContent={{ xs: 'center', md: 'end' }}
                           width={'100%'}
                           mt={5}
                        >
                           <Button
                              variant='soft'
                              color='danger'
                              onClick={(e) => {
                                 e.preventDefault();
                                 if (!confirm('Really want to leave?')) return
                                 document.cookie.split(";").forEach((cookie) => {
                                    const name = cookie.split("=")[0].trim();
                                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
                                 });
                                 window.open('/login', '_self');
                              }}
                              sx={{
                                 width: {
                                    xs: '100%',
                                    sm: '80%',
                                    md: 'fit-content'
                                 }
                              }}
                           >
                              Log out
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