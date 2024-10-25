'use client'

import MenuDrawer from '@/components/shared/menu-drawer';
import SearchBox from '@/components/shared/search-box';
import CreateTodoModal from '@/components/todos/create-todo-modal';
import TodoCard from '@/components/todos/todo-card';
import { getAll } from '@/service/todos/todos.service';
import { LoginResponseDto } from '@/types/auth/login.dto';
import { TodoDto, TodosResponseDto } from '@/types/todos/todos.dto';
import Cookie from '@/util/Cookies';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { AspectRatio, Box, Button, CssVarsProvider, extendTheme, Skeleton, Stack, Tooltip, Typography, useColorScheme } from "@mui/joy";
import { Router, useRouter } from 'next/router';
import { Fragment, useEffect } from "react";
import { useState } from 'react';

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
               body: '#2D2D2D', // Definir a cor do fundo do corpo para escuro (0C0D0E)
            },
            text: {
               primary: '#eaeaea',
            },
         },
      },
      light: {
         palette: {
            background: {
               body: "#eaeaea", // Cor de fundo geral da aplicação
            },
            text: {
               primary: "#212121",  // Texto principal em cinza escuro
               secondary: "#424242", // Texto secundário ou descrição
            },
         },
      },
   },
});

export default function Home() {
   const [ todos, setTodos ] = useState<TodosResponseDto>();
   const [ loading, setLoading ] = useState<boolean>();
   let [ page, setPage ] = useState<number>(0);
   const [ query, setQuery ] = useState<string>('');
   const [ client, setClient ] = useState<string>('');
   const [ status, setStatus ] = useState<string>('');
   const [ priority, setPriority ] = useState<string>('');
   const [ from, setFrom ] = useState<string>('');
   const [ to, setTo ] = useState<string>('');
   const [ due, setDue ] = useState<string>('');

   useEffect(() => {
      getUserToken();
      setTimeout(() => {
         getTodosData();
      }, 2000);
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

   const getTodosData = async () => {
      setLoading(true);
      const userData = getUserToken();
      if (!userData) throw new Error();
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
         if (!todos) {
            setTodos(response);
            setLoading(false);
            return
         }
         response.data.forEach((d: TodoDto) => todos.data.push(d));
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
                  To-Dos App
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
                     sx={{ ml: 1, ":hover": { cursor: 'default' } }}
                     size='sm'
                     color='neutral'
                     variant='solid'
                     onClick={getTodosData}
                  >
                     Search
                  </Button>
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
                     todos 
                     && !loading
                     && todos.data.map((t: TodoDto) => <TodoCard todo={t} refreshTodos={getTodosData} />) 
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
               <CreateTodoModal refreshTodos={getTodosData} />
               <Box
                  width={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
               >
                  <Button 
                     variant='soft' 
                     color='neutral'
                     onClick={() => {
                        setPage(page++);
                        getTodosData();
                     }}
                  >
                     Load more...
                  </Button>
               </Box>
            </Box>
         </CssVarsProvider>
      </Fragment>
   );
}
