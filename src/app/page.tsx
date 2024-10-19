'use client'

import MenuDrawer from '@/components/shared/menu-drawer';
import CreateTodoModal from '@/components/todos/create-todo-modal';
import TodoCard from '@/components/todos/todo-card';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { Box, Button, CssVarsProvider, extendTheme, Stack, Typography, useColorScheme } from "@mui/joy";
import { Fragment, useEffect } from "react";
import * as React from 'react';

function ToggleThemeButton() {
   const { mode, setMode } = useColorScheme();
   const toggleMode = () => mode == "dark" ? setMode("light") : setMode("dark");

   useEffect(() => {
      mode == "dark" ? setMode("dark") : setMode("light");
   });

   return (
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
            mode == "dark" 
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
                  <TodoCard />
                  <TodoCard />
                  <TodoCard />
                  <TodoCard />
               </Stack>
               <CreateTodoModal />
            </Box>
         </CssVarsProvider>
      </Fragment>
   );
}
