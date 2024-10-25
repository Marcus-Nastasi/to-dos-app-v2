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
            // primary: {
            //    50: "#fffbeb",
            //    100: "#fef3c7",
            //    200: "#fde68a",
            //    300: "#fcd34d",
            //    400: "#fbbf24",
            //    500: "#f59e0b",
            //    600: "#d97706",
            //    700: "#b45309",
            //    800: "#92400e",
            //    900: "#78350f"
            // },
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
            // primary: {
            //    50: "#fafafa",  // Um tom quase branco, para áreas muito claras
            //    100: "#f5f5f5", // Off-white suave, ideal para fundos de componentes
            //    200: "#eaeaea", // Tom mais acinzentado, útil para bordas ou fundos de destaque
            //    300: "#d6d6d6", // Cinza claro, para hover ou elementos de interação
            //    400: "#bdbdbd", // Tom intermediário, bom para botões em estado normal
            //    500: "#9e9e9e", // Cinza médio, pode ser usado em textos ou ícones
            //    600: "#757575", // Cinza escuro, excelente para textos ou ícones em destaque
            //    700: "#616161", // Cinza muito escuro, quase preto, para títulos ou headers
            //    800: "#424242", // Usado para contrastar em áreas pequenas
            //    900: "#212121", // Preto suave, ideal para textos principais
            // },
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

   useEffect(() => {
      getUserToken();
      setTimeout(() => {
         getTodosData();
      }, 5000);
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
         const response: TodosResponseDto = await getAll(userData.user.id, userData.token, 0);
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
                  To-Dos App
               </Typography>
               <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
               >
                  <SearchBox />
                  <Button 
                     sx={{ ml: 1, ":hover": { cursor: 'default' } }}
                     size='sm'
                     color='neutral'
                     variant='solid'
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
            </Box>
         </CssVarsProvider>
      </Fragment>
   );
}
