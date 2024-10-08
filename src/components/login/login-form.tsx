'use client'

import { login } from "@/service/auth/auth.service";
import { Box, Button, FormControl, FormHelperText, Typography } from "@mui/joy";
import { Link, TextField } from "@mui/material";
import { useState } from "react";

export default function LoginForm() {
   const [ email, setEmail ] = useState<string>('');
   const [ password, setPassword ] = useState<string>('');

   const handleSignIn = async () => {
      login({ email: email, password: password })
         .then(response => console.log(response))
         .catch(error => console.error(error)); 
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
               onClick={handleSignIn}
            >
               ENTER
            </Button>
            <FormHelperText sx={{ marginTop: 5, alignSelf: 'end' }}>
               if you don't have an account, 
               <Link href="/register" underline="always" color="primary">
                  register
               </Link>
            </FormHelperText>
         </FormControl>
      </Box>
   );
}
