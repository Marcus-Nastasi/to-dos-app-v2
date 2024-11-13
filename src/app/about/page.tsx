'use client'

import MenuDrawer from '@/components/shared/menu-drawer';
import AddIcon from '@mui/icons-material/Add';
import NightlightIcon from '@mui/icons-material/Nightlight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Accordion, accordionClasses, AccordionDetails, AccordionGroup, AccordionSummary, accordionSummaryClasses, Box, Button, CssVarsProvider, extendTheme, Tooltip, Typography, useColorScheme } from "@mui/joy";
import { Fragment, useEffect } from "react";
import Brightness5RoundedIcon from '@mui/icons-material/Brightness5Rounded';

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

export default function About() {
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
                  About us
               </Typography>
               <Box
                  width={'100vw'}
                  height={'fit-content'}
                  display={'flex'}
                  justifyContent={'center'}
               >
                  <Box
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
                     sx={(theme) => ({
                        bgcolor: theme.palette.mode === 'light' 
                        ? theme.palette.neutral[300] 
                        : theme.palette.neutral[800]
                     })}
                  >
                     <Typography
                        textAlign={'center'}
                        paddingY={5}
                        paddingBottom={2}
                        sx={{
                           fontSize: {
                              xs: 25, 
                              sm: 30, 
                              md: 35, 
                           },
                           fontWeight: 'bold'
                        }}
                     >
                        Goals
                     </Typography>
                     <Typography
                        marginBottom={5}
                        textAlign={'center'}
                        sx={{
                           fontSize: {
                              xs: 15,  
                              md: 20, 
                           },
                           fontWeight: 'semibold'
                        }}
                     >
                        Welcome to our open-source software for to-dos/task management. 
                        Our goal is to simplify the management of tasks and allow users to focus on what truly matters. 
                        This application offers a robust and modern layout designed to maximize your user experience.
                     </Typography>
                     {[
                        'Create: Easily create new tasks with a user-friendly interface.',
                        'Update: Modify your tasks as needed to reflect current progress.',
                        'Delete: Remove tasks that are no longer relevant.',
                        'Manage: Track the status of tasks, ensuring nothing falls through the cracks.'
                     ].map(s => 
                        <Typography
                           my={{ 
                              xs: 2, 
                              sm: 1, 
                              md: 0 
                           }}
                           startDecorator={<FiberManualRecordIcon sx={{ fontSize: 10 }} />}
                           sx={{
                              fontSize: {
                                 xs: 15,  
                                 md: 20, 
                              },
                              fontWeight: 'semibold'
                           }}
                        >
                           { s }
                        </Typography>
                     )}
                     <Typography
                        marginTop={5}
                        textAlign={'center'}
                        sx={{
                           fontSize: {
                              xs: 15,  
                              md: 20, 
                           },
                           fontWeight: 'semibold'
                        }}
                     >
                        The backend of this application is built with Java using SpringBoot and SpringSecurity, 
                        ensuring a secure and reliable environment. The frontend is developed with NextJs, 
                        providing a dynamic and responsive user experience.
                     </Typography>
                     <Typography
                        textAlign={'center'}
                        paddingY={5}
                        paddingBottom={2}
                        sx={{
                           fontSize: {
                              xs: 25, 
                              sm: 30, 
                              md: 35, 
                           },
                           fontWeight: 'bold'
                        }}
                     >
                        How to Use the App
                     </Typography>
                     <AccordionGroup
                        size='lg'
                        sx={(theme) => ({
                           mb: 10,
                           mt: 2,
                           borderRadius: 5,
                           [`& .${accordionClasses.root}`]: {
                              marginTop: '0.5rem',
                              transition: '0.2s ease',
                              '& button:not([aria-expanded="true"])': {
                                 transition: '0.2s ease',
                                 paddingBottom: '0.625rem',
                              },
                              '& button:hover': {
                                 borderRadius: 'md',
                                 background: theme.palette.mode == 'light' ? 'background.level2' : '#000000'
                              },
                           },
                           [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
                              bgcolor: theme.palette.mode == 'light' ? 'background.level2' : '#000000',
                              borderRadius: 'md',
                              borderBottom: '1px solid',
                              borderColor: 'background.level2',
                           },
                           '& [aria-expanded="true"]': {
                              boxShadow: `inset 0 -1px 0 ${theme.vars.palette.divider}`,
                           },
                           [`& .${accordionSummaryClasses.indicator}`]: {
                              transition: '0.2s',
                           },
                           [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
                              transform: 'rotate(45deg)',
                           },
                        })}
                     >
                        <Accordion>
                           <AccordionSummary 
                              indicator={<AddIcon />}
                           >
                              Create an Account
                           </AccordionSummary>
                           <AccordionDetails>
                              Start by creating a new account in /register. 
                              Once your account is created, you will be redirected to the login page.
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              Login
                           </AccordionSummary>
                           <AccordionDetails>
                              Enter your credentials and login to the application. You will be taken to the home page.
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              Add a New Task
                           </AccordionSummary>
                           <AccordionDetails>
                              <Typography
                                 startDecorator={
                                    <Box
                                       component="span"
                                       sx={{
                                          bgcolor: 'neutral.400',
                                          width: '0.5em',
                                          height: '0.5em',
                                          borderRadius: '50%',
                                       }}
                                    />
                                 }
                              >
                                 Click the 'plus' button to create a new to-do.
                              </Typography>
                              <Typography
                                 startDecorator={
                                    <Box
                                       component="span"
                                       sx={{
                                          bgcolor: 'neutral.400',
                                          width: '0.5em',
                                          height: '0.5em',
                                          borderRadius: '50%',
                                       }}
                                    />
                                 }
                              >
                                 Fill in the details of your task and save it.
                              </Typography>
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              View Tasks
                           </AccordionSummary>
                           <AccordionDetails>
                              On the home page, you will see a summary of all your to-dos.
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              Change Task Status
                           </AccordionSummary>
                           <AccordionDetails>
                              <Typography
                                 startDecorator={
                                    <Box
                                       component="span"
                                       sx={{
                                          bgcolor: 'neutral.400',
                                          width: '0.5em',
                                          height: '0.5em',
                                          borderRadius: '50%',
                                       }}
                                    />
                                 }
                              >
                                 Each to-do card on the home page shows a summary of the task.
                              </Typography>
                              <Typography
                                 startDecorator={
                                    <Box
                                       component="span"
                                       sx={{
                                          bgcolor: 'neutral.400',
                                          width: '0.5em',
                                          height: '0.5em',
                                          borderRadius: '50%',
                                       }}
                                    />
                                 }
                              >
                                 Click the three dots on the to-do card to change the status of 
                                 the task between 'pending', 'in progress', and 'done'.
                              </Typography>
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              View Task Details
                           </AccordionSummary>
                           <AccordionDetails>
                              Click on the task summary 'details' then on 'open' to view detailed information about the task.
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              Edit or Delete Tasks
                           </AccordionSummary>
                           <AccordionDetails>
                              <Typography
                                 startDecorator={
                                    <Box
                                       component="span"
                                       sx={{
                                          bgcolor: 'neutral.400',
                                          width: '0.5em',
                                          height: '0.5em',
                                          borderRadius: '50%',
                                       }}
                                    />
                                 }
                              >
                                 In the task details view, you can click the 'edit' button to update the task. 
                                 This will take you to the update modal.
                              </Typography>
                              <Typography
                                 startDecorator={
                                    <Box
                                       component="span"
                                       sx={{
                                          bgcolor: 'neutral.400',
                                          width: '0.5em',
                                          height: '0.5em',
                                          borderRadius: '50%',
                                       }}
                                    />
                                 }
                              >
                                 Click the 'delete' button to remove the task permanently.
                              </Typography>
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary indicator={<AddIcon />}>
                              Manage Account Settings
                           </AccordionSummary>
                           <AccordionDetails>
                              <Typography
                                 startDecorator={
                                    <Box
                                       component="span"
                                       sx={{
                                          bgcolor: 'neutral.400',
                                          width: '0.5em',
                                          height: '0.5em',
                                          borderRadius: '50%',
                                       }}
                                    />
                                 }
                              >
                                 On the home page, click the hamburger menu in the top left corner.
                              </Typography>
                              <Typography
                                 startDecorator={
                                    <Box
                                       component="span"
                                       sx={{
                                          bgcolor: 'neutral.400',
                                          width: '0.5em',
                                          height: '0.5em',
                                          borderRadius: '50%',
                                       }}
                                    />
                                 }
                              >
                                 From there, you can access the Account 
                                 page to manage your account settings.
                              </Typography>
                           </AccordionDetails>
                        </Accordion>
                     </AccordionGroup>
                  </Box>
               </Box>
            </Box>
         </CssVarsProvider>
      </Fragment>
   );
}
