'use client'

import { useAlert } from "@/contexts/alert-context";
import { updateUser } from "@/service/users/user.service";
import { LoginResponseDto } from "@/types/auth/login.dto";
import { UserResponseDto } from "@/types/user/user.dto";
import { Box, Button, FormControl, FormLabel, Input } from "@mui/joy";
import { useEffect, useState } from "react";

export default function CredentialForm({ userCookie }: { userCookie: LoginResponseDto | undefined }) {
   const [ name, setName ] = useState<string | undefined>();
   const [ email, setEmail ] = useState<string | undefined>();
   const [ currentPassword, setCurrentPassword ] = useState<string>();
   const [ newPassword, setNewPassword ] = useState<string>();
   const { showAlert } = useAlert();

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
         showAlert(`Update successful! Please, log-in again...`, 'success');
         setTimeout(() => {
            window.open('/login', '_self');            
         }, 1000);
         return response;
      } catch(e) {
         console.error(e);
         showAlert(`Update not successful! Please, try again...`, 'error');
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
            <Box
               width={'100%'}
               display={'flex'}
               flexDirection={{ 
                  xs: 'column', 
                  md: 'row' 
               }}
               flexWrap={'wrap'}
               justifyContent={'space-evenly'}
               padding={5}
               borderRadius={5}
               bgcolor={'background.level1'}
            >
               <FormControl>
                  <FormLabel>
                     Name
                  </FormLabel>
                  <Input 
                     value={name}
                     onChange={e => setName(e.target.value)}
                     required 
                     sx={{
                        width: {
                           xs: '100%',
                           md: 'fit-content'
                        },
                     }}
                  />
               </FormControl>
               <FormControl
                  sx={{
                     mt: {
                        xs: 3,
                        xl: 0
                     }
                  }}
               >
                  <FormLabel>
                     E-mail
                  </FormLabel>
                  <Input 
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     required 
                     sx={{
                        width: {
                           xs: '100%',
                           md: 'fit-content'
                        },
                     }}
                  />
               </FormControl>
               <FormControl
                  sx={{
                     mt: 3
                  }}
               >
                  <FormLabel>
                     Current password
                  </FormLabel>
                  <Input 
                     value={currentPassword}
                     onChange={e => setCurrentPassword(e.target.value)}
                     type='password'
                     required 
                     sx={{
                        width: {
                           xs: '100%',
                           md: 'fit-content'
                        },
                     }}
                  />
               </FormControl>
               <FormControl
                  sx={{
                     mt: 3
                  }}
               >
                  <FormLabel>
                     New password
                  </FormLabel>
                  <Input 
                     value={newPassword}
                     onChange={e => setNewPassword(e.target.value)}
                     type='password' 
                     required 
                     sx={{
                        width: {
                           xs: '100%',
                           md: 'fit-content'
                        },
                     }}
                  />
               </FormControl>
               <Box
                  sx={{
                     width: '100%'
                  }}
               >
                  <Button 
                     size='sm'
                     variant='soft'
                     color='primary'
                     type="submit"
                     sx={{
                        mt: 5,
                        width: {
                           xs: '100%',
                           sm: 'fit-content' 
                        }
                     }}
                  >
                     Submit
                  </Button>
               </Box>
            </Box>
         </form>
      </>
   );
}
