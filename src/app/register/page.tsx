'use client'

import RegisterForm from "@/components/register/register-form";
import { Box } from "@mui/joy";

export default function Register() {
   return (
      <Box
         margin={0}
         padding={0}
         width={'100%'}
         height={'100vh'}
         bgcolor={'#2D2D2D'}
         display={'flex'}
         justifyContent={'center'}
      >
         <RegisterForm />
      </Box>
   );
}
