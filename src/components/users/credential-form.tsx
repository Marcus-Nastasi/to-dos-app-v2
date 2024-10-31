'use client'

import { updateUser } from "@/service/users/user.service";
import { LoginResponseDto } from "@/types/auth/login.dto";
import { UserResponseDto } from "@/types/user/user.dto";
import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import { useState } from "react";

export default function CredentialForm({ userCookie }: { userCookie: LoginResponseDto | undefined }) {
   const [ name, setName ] = useState<string | undefined>(userCookie?.user.name);
   const [ email, setEmail ] = useState<string | undefined>(userCookie?.user.email);
   const [ currentPassword, setCurrentPassword ] = useState<string>();
   const [ newPassword, setNewPassword ] = useState<string>();

   const handleSubmit = async () => {
      try {
         if (!userCookie) return
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
            <Stack spacing={2}>
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
                  variant='soft'
                  color='success'
                  type="submit"
               >
                  Submit
               </Button>
            </Stack>
         </form>
      </>
   );
}
