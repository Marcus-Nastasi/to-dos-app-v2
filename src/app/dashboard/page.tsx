'use client'

import MenuDrawer from '@/components/shared/menu-drawer';
import { LoginResponseDto } from '@/types/auth/login.dto';
import { UserDetails } from '@/types/user/user.dto';
import Cookie from '@/util/Cookies';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { Box, Button, CssVarsProvider, extendTheme, FormControl, FormLabel, IconButton, Input, Stack, Tooltip, Typography, useColorScheme } from "@mui/joy";
import { Fragment, useEffect } from "react";
import { useState } from 'react';
import { useAlert } from '@/contexts/alert-context';
import HomeSkeleton from '@/components/shared/home-skeleton';
import OverdueGraph from '@/components/dashboard/overdue-graph';
import CompletionRateGraph from '@/components/dashboard/completion-rate-graph';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchClient from '@/components/shared/search-client-box';
import { MetricsResponseDto } from '@/types/metrics/metrics.dto';
import { getAllMetrics } from '@/service/metrics/metrics.service';
import StatusGraph from '@/components/dashboard/status-graph';
import PriorityGraph from '@/components/dashboard/priority-graph';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

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
               && <EmojiObjectsIcon  
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

export default function Dashboard() {
   const [ metrics, setMetrics ] = useState<MetricsResponseDto>();
   const [ loading, setLoading ] = useState<boolean>();
   const [ client, setClient ] = useState<string>('');
   const [ from, setFrom ] = useState<string>('');
   const [ to, setTo ] = useState<string>('');
   const [ user, setUser ] = useState<UserDetails>();
   const { showAlert } = useAlert();
   
   const logOff = (): void => {
      Cookie.cleanCookies();
      window.open('/login', '_self');
   };
   
   useEffect(() => {
      const gettingUser = getUserToken();
      if (!gettingUser) {
         logOff();
         return
      }
      setUser(gettingUser.user);
      getMetrics();
   }, []);

   const getUserToken = (): LoginResponseDto | null => {
      const cookie_token: string | null = Cookie.getCookie('todos_app_session');
      if (!cookie_token || cookie_token == null) {
         logOff();
         return null;
      }
      const data: LoginResponseDto = JSON.parse(cookie_token);
      return data;
   };

   const getMetrics = async (): Promise<MetricsResponseDto | null> => {
      setLoading(true);
      const userToken: LoginResponseDto | null = getUserToken();
      if (!userToken) {
         logOff();
         return null;
      };
      try {
         const response: MetricsResponseDto = await getAllMetrics(
            userToken.user.id, 
            userToken.token, 
            client,
            from, 
            to, 
         );
         if (!response) throw new Error('Cannot get metrics!');
         setMetrics(response);
         return response;
      } catch (error) {
         console.error(error);
         showAlert('Unable to get metrics!', 'error');
         return null;
      } finally {
         setLoading(false);
      }
   }

   return (
      <Fragment>
         <CssVarsProvider theme={theme} defaultMode={"light"} >
            {loading || !user ? <HomeSkeleton /> : 
               <Fragment>
                  <ToggleThemeButton />
                  <Box
                     sx={{
                        bgcolor: 'background.body',
                        width: '100%',
                        minHeight: '100vh',
                        maxHeight: 'fit-content',
                        transition: 'all ease-in-out 320ms'
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
                        Dashboard
                     </Typography>
                     <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                     >
                        <SearchClient 
                           query={client} 
                           setQuery={setClient} 
                        />
                        <Box
                           display={'flex'}
                           justifyContent={'center'}
                           alignItems={'center'}
                        >
                           <FormControl orientation="horizontal">
                              <FormLabel sx={{ m: 2 }}>From</FormLabel>
                              <Input
                                 required
                                 type="date"
                                 value={from}
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFrom(e.target.value)}
                                 endDecorator={ <CalendarMonthIcon /> }
                                 sx={{
                                    "& input::-webkit-calendar-picker-indicator": {
                                       display: "none",
                                    },
                                    "& input[type='date']": {
                                       appearance: "none",
                                    },
                                 }}
                              />
                              <FormLabel sx={{ m: 2 }}>To</FormLabel>
                              <Input
                                 required
                                 type="date"
                                 value={to}
                                 onChange={e => setTo(e.target.value)}
                                 endDecorator={ <CalendarMonthIcon /> }
                                 sx={{
                                    "& input::-webkit-calendar-picker-indicator": {
                                       display: "none",
                                    },
                                    "& input[type='date']": {
                                       appearance: "none",
                                    },
                                 }}
                              />
                           </FormControl>
                           <Tooltip arrow variant='outlined' title="Apply filters" placement="top-start">
                              <Button 
                                 sx={{ 
                                    ml: {
                                       xs: 1,
                                       sm: 2,
                                       md: 3,
                                       lg: 4
                                    },
                                    ":hover": { cursor: 'default' } 
                                 }}
                                 size='sm'
                                 color='neutral'
                                 variant='solid'
                                 onClick={() => {
                                    getMetrics();
                                 }}
                              >
                                 Filter
                              </Button>
                           </Tooltip>
                           <Tooltip arrow variant='outlined' title="Clear filters" placement="right-start">
                              <IconButton
                                 sx={{ 
                                    ml: {
                                       xs: 1,
                                       sm: 2,
                                       md: 3,
                                       lg: 4
                                    },
                                 }}
                                 size='sm'
                                 color='neutral'
                                 variant='soft'
                                 onClick={async () => {
                                    setClient('');
                                    setFrom('');
                                    setTo('');
                                    await getMetrics();
                                 }}
                              >
                                 <ClearRoundedIcon />
                              </IconButton>
                           </Tooltip>
                        </Box>
                     </Box>
                     <Stack
                        flexWrap={'wrap'}
                        direction={{ 
                           xs: 'column', 
                           md: 'row' 
                        }}
                        sx={{
                           width: '100%',
                           padding: { 
                              xs: 2, 
                              md: 3 
                           },
                           justifyContent: 'center',
                           alignItems: { 
                              xs: 'center', 
                              lg: "flex-start" 
                           },
                        }}
                     >
                        <OverdueGraph 
                           overdue={metrics ? metrics.overdue : 0} 
                           future={metrics ? metrics.future : 0} 
                        />
                        <StatusGraph 
                           pending={metrics ? metrics.pending : 0}
                           progress={metrics ? metrics.in_progress : 0}
                           done={metrics ? metrics.done : 0}
                        />
                        <PriorityGraph
                           high={metrics ? metrics.high : 0}
                           medium={metrics ? metrics.medium : 0}
                           low={metrics ? metrics.low : 0}
                        />
                        <CompletionRateGraph
                           completion_rate={metrics ? metrics.completion_rate : 0}
                        />
                     </Stack>
                  </Box>
               </Fragment>
            }
         </CssVarsProvider>
      </Fragment>
   );
}
