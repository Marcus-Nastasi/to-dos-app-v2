'use client'

import { updateUser } from "@/service/users/user.service";
import { LoginResponseDto } from "@/types/auth/login.dto";
import { UserResponseDto } from "@/types/user/user.dto";
import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import { useEffect, useState } from "react";

export default function CredentialForm({ userCookie }: { userCookie: LoginResponseDto | undefined }) {
   const [ name, setName ] = useState<string | undefined>();
   const [ email, setEmail ] = useState<string | undefined>();
   const [ currentPassword, setCurrentPassword ] = useState<string>();
   const [ newPassword, setNewPassword ] = useState<string>();

   useEffect(() => {
      setName(userCookie?.user.name);
      setEmail(userCookie?.user.email);
   }, []);

   const handleSubmit = async () => {
      try {
         if (!userCookie) {
            document.cookie.split(";").forEach((cookie) => {
               const name = cookie.split("=")[0].trim();
               document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
            });
            window.open('/login', '_self');
            return
         }
         if (!name || !email || !currentPassword || !newPassword) return
         const response: UserResponseDto = await updateUser(
            userCookie.user.id,
            {
               name,
               email,
               currentPassword,
               newPassword
            },
            userCookie.token
         );
         return response;
      } catch(e) {
         console.error(e);
      }
   };

   return (
      <>
         <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
               event.preventDefault();
               handleSubmit();
            }}
         >
            <Stack 
               spacing={2} 
               sx={{ 
                  bgcolor: 'background.level3', 
                  p: 5,
                  borderRadius: 5
               }}
            >
               <FormControl>
                  <FormLabel>
                     Name
                  </FormLabel>
                  <Input 
                     value={name}
                     onChange={e => setName(e.target.value)}
                     required 
                  />
               </FormControl>
               <FormControl>
                  <FormLabel>
                     E-mail
                  </FormLabel>
                  <Input 
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     required 
                  />
               </FormControl>
               <FormControl>
                  <FormLabel>
                     Current password
                  </FormLabel>
                  <Input 
                     value={currentPassword}
                     onChange={e => setCurrentPassword(e.target.value)}
                     type='password'
                     required 
                  />
               </FormControl>
               <FormControl>
                  <FormLabel>
                     New password
                  </FormLabel>
                  <Input 
                     value={newPassword}
                     onChange={e => setNewPassword(e.target.value)}
                     type='password' 
                     required 
                  />
               </FormControl>
               <Button 
                  size='sm'
                  variant='solid'
                  color='success'
                  type="submit"
                  sx={{
                     width: {
                        xs: '100%',
                        sm: '20%' 
                     }
                  }}
               >
                  Submit
               </Button>
            </Stack>
         </form>
      </>
   );
}
