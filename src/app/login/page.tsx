'use client'

import { useEffect, useState } from "react";
import { Box, Button, Card, CssVarsProvider, Divider, extendTheme, FormControl, FormHelperText, Input, Link, Theme, Tooltip, Typography, useColorScheme } from "@mui/joy";
import NightlightIcon from '@mui/icons-material/Nightlight';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Brightness5RoundedIcon from '@mui/icons-material/Brightness5Rounded';
import { LoginResponseDto } from "@/types/auth/login.dto";
import { login } from "@/service/auth/auth.service";
import { useAlert } from "@/contexts/alert-context";
import Cookie from "@/util/Cookies";

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
               right: { 
                  xs: 10, 
                  md: 15 
               },
               top: { 
                  xs: 10, 
                  md: 15 
               },
               margin: { 
                  xs: 2, 
                  md: 3 
               },
            }}
         >
            {
               mode === "dark" 
               && <Brightness5RoundedIcon  
                     sx={{
                        fontSize: { 
                           xs: 27, 
                           md: 29 
                        },
                     }}
                  />  
               || <NightlightIcon 
                     sx={{
                        fontSize: { 
                           xs: 30, 
                           md: 32 
                        },
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
               body: '#2D2D2D',
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

export default function Login() {
   const [ email, setEmail ] = useState<string>('');
   const [ password, setPassword ] = useState<string>('');
   const [ loading, setLoading ] = useState<boolean>();
   const [ viewPassword, setViewPassword ] = useState<boolean>(false);
   const { showAlert } = useAlert();

   const handleSignIn = async (): Promise<void> => {
      setLoading(true);
      try {
         const data: LoginResponseDto = await login({ 
            email: email, 
            password: password 
         });
         Cookie.create('todos_app_session', JSON.stringify(data), 7);
         setLoading(false);
         showAlert(`Login successful! You're beeing redirected...`, 'success');
         window.open('/', '_self');
      } catch(error) {
         console.log(error);
         showAlert(`${error}`, 'error');
         setLoading(false);
      }
   }

   const formColor = (theme: Theme) => {
      theme.palette.mode == 'light' ? '#FFFFFF' : '#000000'
   }

   return (
      <CssVarsProvider theme={theme} defaultMode={"light"} >
         <Box
            margin={0}
            padding={0}
            width={'100%'}
            height={'100vh'}
            display={'flex'}
            justifyContent={'center'}
            sx={(theme) => ({
               bgcolor: 'background.body',
               transition: 'all ease-in-out 300ms'
            })}
         >
            <ToggleThemeButton />
            <Card
               invertedColors
               sx={(theme) => ({
                  width: {
                     xs: '95%',
                     sm: '65%',
                     md: '50%',
                     lg: '40%',
                     xl: '30%'
                  },
                  mt: 10,
                  p: 3,
                  height: 'fit-content',
                  borderRadius: 10
               })}
            >
               <Typography
                  level='body-md'
                  textAlign={'center'}
                  fontSize={40}
                  fontWeight={'semibold'}
               >
                  To-dos app
               </Typography>
               <Divider sx={{ mb: 3 }}>login</Divider>
               <FormControl sx={{ px: { xs: 1, md: 2} }}>
                  <Input 
                     id="input_name"  
                     placeholder="E-mail"
                     required
                     value={email}
                     onChange={(e: any) => setEmail(e.target.value)} 
                  />
                  <FormHelperText sx={{ marginBottom: 2 }}>enter your e-mail</FormHelperText>
                  <Input 
                     id="input_password" 
                     placeholder="Password" 
                     required
                     value={password}
                     type={ !viewPassword ? "password" : 'text' }
                     endDecorator={ 
                        !viewPassword 
                        ?  <VisibilityOutlinedIcon 
                              sx={{ ":hover": { cursor: 'pointer' } }} 
                              onClick={() => setViewPassword(true)} 
                           /> 
                        :  <VisibilityOffOutlinedIcon 
                              sx={{ ":hover": { cursor: 'pointer' } }} 
                              onClick={() => setViewPassword(false)} 
                           /> 
                     }
                     onChange={(e: any) => setPassword(e.target.value)} 
                  />
                  <FormHelperText sx={{ marginBottom: 2 }}>enter your password</FormHelperText>
                  <Box
                     display={'flex'}
                     flexDirection={{ xs: 'column', sm: 'row-reverse' }}
                     justifyContent={'space-between'}
                     alignItems={'center'}
                  >
                     {
                        loading
                        && <Button 
                              loading
                              loadingPosition='start'
                              variant='solid'
                              color='primary'
                              sx={{
                                 width: { 
                                    xs: '90%', 
                                    sm: '20%' 
                                 }, 
                                 alignSelf: {
                                    xs: 'center',
                                    lg: 'end'
                                 },
                                 mt: {
                                    xs: 2,
                                    md: 3
                                 }
                              }}
                           >
                              loading...
                           </Button>
                        || <Button 
                              size="sm"
                              color='primary'
                              variant='solid'
                              onClick={handleSignIn}
                              sx={{ 
                                 width: { 
                                    xs: '90%', 
                                    sm: '20%' 
                                 }, 
                                 alignSelf: {
                                    xs: 'center',
                                    lg: 'end'
                                 },
                                 mt: {
                                    xs: 2,
                                    md: 3
                                 }
                              }}
                           >
                              Enter
                           </Button>
                     }
                     <FormHelperText 
                        sx={{ 
                           alignSelf: { xs: 'flex-start', sm: 'flex-end'},
                           mt: { xs: 2, sm: 0 }
                        }} 
                     >
                        if you don't have an account, 
                        <Link href="/register" underline="always" color="primary">
                           register
                        </Link>
                     </FormHelperText>
                  </Box>
               </FormControl>
            </Card>
         </Box>
      </CssVarsProvider>
   );
}
