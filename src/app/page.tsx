'use client'

import { LightbulbCircleOutlined } from "@mui/icons-material";
import NightlightIcon from '@mui/icons-material/Nightlight';
import { Box, Button, CssVarsProvider, extendTheme, useColorScheme } from "@mui/joy";
import { Fragment } from "react";

function ToggleThemeButton() {
   const { mode, setMode } = useColorScheme();
   const toggleMode = () => mode == "dark" ? setMode("light") : setMode("dark");
   return (
      <Button
         variant="plain"
         color={'primary'} 
         onClick={toggleMode}
         sx={{
            width: 'fit-content',
            height: 'fit-content',
            padding: 0.3,
            position: 'absolute',
            right: 5,
            top: 5,
            margin: { xs: 2, md: 3 }
         }}
      >
         {
            mode == "dark" 
            ? <LightbulbCircleOutlined  
               sx={{
                  fontSize: { xs: 27, md: 29 },
               }}
            />  
            : <NightlightIcon 
               sx={{
                  fontSize: { xs: 30, md: 32 },
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
            primary: {
               50: "#fffbeb",
               100: "#fef3c7",
               200: "#fde68a",
               300: "#fcd34d",
               400: "#fbbf24",
               500: "#f59e0b",
               600: "#d97706",
               700: "#b45309",
               800: "#92400e",
               900: "#78350f"
            },
            background: {
               body: '#0C0D0E', // Definir a cor do fundo do corpo para escuro
            },
            text: {
               primary: '#ffffff',
            },
         },
      },
      light: {
         palette: {
            background: {
               body: '#ffffff', // Cor de fundo clara
            },
            text: {
               primary: '#000000',
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

            </Box>
         </CssVarsProvider>
      </Fragment>
   );
}
