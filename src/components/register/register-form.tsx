'use client'

import { useAlert } from "@/contexts/alert-context";
import { createUser } from "@/service/auth/user.service";
import { Box, Button, FormControl, FormHelperText, Typography } from "@mui/joy";
import { Link, TextField } from "@mui/material";
import { useState } from "react";

export default function RegisterForm() {
   const [ name, setName ] = useState<string>('');
   const [ email, setEmail ] = useState<string>('');
   const [ password, setPassword ] = useState<string>('');
   const { showAlert } = useAlert();

   const handleCreateUser = async () => {
      createUser({ name: name, email: email, password: password })
         .then(response => {
            console.log(response);
            showAlert('You have created your user! Redirecting to /login...', 'success');
         })
         .catch(error => {
            console.error(error);
            showAlert(`${error}`, 'error');
         }); 
   }

   return (
      <Box
         marginTop={10}
         padding={5}
         height={'fit-content'}
         bgcolor={'white'}
         borderRadius={10}
         sx={{
            width: {
               xs: '95%',
               sm: '75%',
               md: '65%',
               lg: '50%',
               xl: '30%'
            }
         }}
      >
         <Typography
            marginBottom={6}
            textAlign={'center'}
            fontSize={40}
            fontWeight={'semibold'}
         >
            To-dos app
         </Typography>
         <FormControl>
            <TextField 
               id="input_name" 
               label="Name" 
               variant='outlined' 
               color='primary'
               value={name}
               onChange={(e) => setName(e.target.value)} 
            />
            <FormHelperText sx={{ marginBottom: 2 }}>enter your name</FormHelperText>
            <TextField 
               id="input_email" 
               label="E-mail" 
               variant='outlined' 
               color='primary'
               value={email}
               onChange={(e) => setEmail(e.target.value)} 
            />
            <FormHelperText sx={{ marginBottom: 2 }}>enter your e-mail</FormHelperText>
            <TextField 
               id="input_password" 
               label="Password" 
               variant='outlined' 
               color="primary" 
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)} 
            />
            <FormHelperText sx={{ marginBottom: 2 }}>enter your password</FormHelperText>
            <Button 
               sx={{ 
                  width: { sm: "80%", lg: '30%' }, 
                  alignSelf: 'center'
               }} 
               color='primary'
               variant='solid'
               onClick={handleCreateUser}
            >
               ENTER
            </Button>
            <FormHelperText sx={{ marginTop: 5, alignSelf: 'end' }}>
               if you already have an account, 
               <Link href="/login" underline="always" color="primary">
                  sign-in
               </Link>
            </FormHelperText>
         </FormControl>
      </Box>
   );
}
