'use client'

import MenuDrawer from '@/components/shared/menu-drawer';
import SearchBox from '@/components/shared/search-box';
import CreateTodoModal from '@/components/todos/create-todo-modal';
import TodoCard from '@/components/todos/todo-card';
import { getAll } from '@/service/todos/todos.service';
import { LoginResponseDto } from '@/types/auth/login.dto';
import { TodoDto, TodosResponseDto } from '@/types/todos/todos.dto';
import { UserDetails } from '@/types/user/user.dto';
import Cookie from '@/util/Cookies';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import NightlightIcon from '@mui/icons-material/Nightlight';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { AspectRatio, Box, Button, CssVarsProvider, extendTheme, IconButton, Skeleton, Stack, Tooltip, Typography, useColorScheme } from "@mui/joy";
import { Fragment, useEffect } from "react";
import { useState } from 'react';
import FilterDrawer from '@/components/shared/filter-drawer';

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

export default function Home() {
   const [ todos, setTodos ] = useState<TodosResponseDto>();
   const [ loading, setLoading ] = useState<boolean>();
   const [ loadingMore, setLoadingMore ] = useState<boolean>(false);
   // const [ moreTodos, setMoreTodos ] = useState<boolean>();
   const [ query, setQuery ] = useState<string>('');
   const [ client, setClient ] = useState<string>('');
   const [ status, setStatus ] = useState<string>('');
   const [ priority, setPriority ] = useState<string>('');
   const [ from, setFrom ] = useState<string>('');
   const [ to, setTo ] = useState<string>('');
   const [ due, setDue ] = useState<string>('');
   const [ user, setUser ] = useState<UserDetails>();
   const [ openFilters, setOpenFilters ] = useState<boolean>(false);
   let [ page, setPage ] = useState<number>(0);

   useEffect(() => {
      getTodosData(false);
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

   const callApi = async (): Promise<TodosResponseDto | null> => {
      const userData: LoginResponseDto | null = getUserToken();
      if (!userData) throw new Error();
      setUser(userData.user);
      try {
         const response: TodosResponseDto = await getAll(
            userData.user.id, 
            userData.token, 
            page, 
            query,
            client,
            status, 
            priority, 
            from, 
            to, 
            due
         );
         if (!response) throw new Error();
         return response;
      } catch (error) {
         console.error(error);
         return null;
      }
   }

   const loadMoreTodos = async () => {
      setLoadingMore(true);
      const userData = getUserToken();
      if (!userData) throw new Error();
      try {
         const response: TodosResponseDto | null = await callApi();
         if (!response) throw new Error();
         if (todos) {
            response.data.forEach((d: TodoDto) => todos.data.push(d));
            setLoading(false);
            return
         }
      } catch (error) {
         console.error(error);
      } finally {
         // (todos && todos.page < todos.total) ? setMoreTodos(true) : setMoreTodos(false);
         setLoadingMore(false);
         setLoading(false);
      }
   }

   const getTodosData = async (loadMore: boolean) => {
      const userData = getUserToken();
      if (!userData) throw new Error();
      try {
         if (loadMore && todos) {
            setLoading(false);
            await loadMoreTodos();
            return
         }
         const response: TodosResponseDto | null = await callApi();
         if (!response) throw new Error();
         setTodos(response);
         setLoading(false);
      } catch (error) {
         console.error(error);
      }
   }

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
                  transition: 'all ease-in-out 320ms'
               }}
            >
               <MenuDrawer />
               <Typography
                  textAlign={'center'}
                  paddingY={5}
                  sx={{
                     fontSize: {xs: 25, sm: 30, md: 35, lg: 40, xl: 45},
                     fontWeight: 'bold'
                  }}
               >
                  Welcome, { user?.name }
               </Typography>
               <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
               >
                  <SearchBox 
                     query={query} 
                     setQuery={setQuery} 
                  />
                  <Button 
                     sx={{ 
                        ml: 1,
                        mr: {
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
                        setPage(0);
                        setTodos(undefined);
                        getTodosData(false);
                     }}
                  >
                     Search
                  </Button>
                  <Tooltip variant='outlined' arrow title="Filters" placement="top">
                     <IconButton
                        onClick={() => setOpenFilters(true)}
                     >
                        <FilterAltIcon />
                     </IconButton>
                  </Tooltip>
                  <FilterDrawer 
                     openFilters={openFilters} 
                     setOpenFilters={setOpenFilters} 
                     client={client}
                     setClient={setClient}
                     due={due}
                     setDue={setDue}
                     from={from}
                     setFrom={setFrom}
                     to={to}
                     setTo={setTo}
                     priority={priority}
                     setPriority={setPriority}
                     status={status}
                     setStatus={setStatus}
                     getTodosData={getTodosData}
                  />
               </Box>
               <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  flexWrap={'wrap'}
                  sx={{
                     width: '100%',
                     padding: { xs: 2, md: 5 },
                     justifyContent: 'space-evenly',
                     alignItems: { xs: 'center', lg: "flex-start" },
                  }}
               >
                  { 
                     todos && !loading
                     && todos.data.map((t: TodoDto) => 
                        <TodoCard 
                           todo={t} 
                           refreshTodos={() => {
                              setPage(0);
                              setTodos(undefined);
                              getTodosData(false);
                           }} 
                        />) 
                     || <Box
                           sx={{
                              display: 'flex',
                              flexWrap: 'wrap'
                           }}
                        >
                           <AspectRatio variant="plain" sx={{ width: '20vw', m: 2 }}>
                              <Skeleton loading={loading}>
                              </Skeleton>
                           </AspectRatio>
                           <AspectRatio variant="plain" sx={{ width: '20vw', m: 2 }}>
                              <Skeleton loading={loading}>
                              </Skeleton>
                           </AspectRatio>
                           <AspectRatio variant="plain" sx={{ width: '20vw', m: 2 }}>
                              <Skeleton loading={loading}>
                              </Skeleton>
                           </AspectRatio>
                           <AspectRatio variant="plain" sx={{ width: '20vw', m: 2 }}>
                              <Skeleton loading={loading}>
                              </Skeleton>
                           </AspectRatio>
                        </Box>
                  }
               </Stack>
               <CreateTodoModal 
                  refreshTodos={() => {
                     setTodos(undefined);
                     setPage(0);
                     getTodosData(false);
                  }}  
               />
               {
                  todos?.data && todos?.total > 1 && (todos.page + 1) <= todos.total 
                  && <Box
                        width={'100%'}
                        pb={4}
                        display={'flex'}
                        justifyContent={'center'}
                     >
                        <Button 
                           variant='soft' 
                           color='neutral'
                           loading={loadingMore}
                           onClick={() => {
                              setPage(++page);
                              getTodosData(true);
                           }}
                        >
                           Load more...
                        </Button>
                     </Box>
               }
            </Box>
         </CssVarsProvider>
      </Fragment>
   );
}
