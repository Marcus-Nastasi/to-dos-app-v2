'use client'

import { useAlert } from "@/contexts/alert-context";
import { updateUser } from "@/service/users/user.service";
import { LoginResponseDto } from "@/types/auth/login.dto";
import { UserResponseDto } from "@/types/user/user.dto";
import Cookie from "@/util/Cookies";
import { Box, Button, Card, Divider, FormControl, FormLabel, Input, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function CredentialForm({ userCookie }: { userCookie: LoginResponseDto | undefined }) {
   const [ name, setName ] = useState<string | undefined>();
   const [ email, setEmail ] = useState<string | undefined>();
   const [ currentPassword, setCurrentPassword ] = useState<string>();
   const [ viewCurrentPassword, setViewCurrentPassword ] = useState<boolean>();
   const [ newPassword, setNewPassword ] = useState<string>();
   const [ viewNewPassword, setViewNewPassword ] = useState<boolean>();
   const [ loading, setLoading ] = useState<boolean>(false);
   const { showAlert } = useAlert();

   useEffect(() => {
      const cookie: string | null = Cookie.getCookie('todos_app_session');
      if (!cookie) {
         Cookie.cleanCookies();
         return
      }
      const cookieObject: LoginResponseDto = JSON.parse(cookie);
      setName(cookieObject.user.name);
      setEmail(cookieObject.user.email);
   }, []);

   const handleSubmit = async () => {
      setLoading(true);
      try {
         if (!userCookie) {
            Cookie.cleanCookies();
            window.open('/login', '_self');
            return
         }
         if (!name || !email || !currentPassword || !newPassword) {
            showAlert('To save, update the information and confirm your password.', 'error');
            return
         }
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
         Cookie.cleanCookies();
         window.open('/login', '_self');
         return response;
      } catch(e) {
         console.error(e);
         showAlert(`Update not successful! Please, try again...`, 'error');
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <form
            style={{ display: 'flex', justifyContent: 'center' }}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
               event.preventDefault();
               handleSubmit();
            }}
         >
            <Card
               sx={{
                  width: { xs: '100%', xl: '70%' },
                  display: 'flex',
                  flexDirection: 'column',
               }}
            >
               <Box>
                  <Typography
                     startDecorator={<AccountCircleRoundedIcon />}
                     padding={2}
                     level='title-md'
                  >
                     Update your credentials
                  </Typography>
                  <Divider />
               </Box>
               <Box
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  flexWrap={'wrap'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  paddingY={1}
               >
                  <FormControl>
                     <FormLabel
                        sx={{
                           color: 'text.primary',
                           fontSize: {
                              xs: 15,
                              lg: 17,
                           }
                        }}
                     >
                        Name
                     </FormLabel>
                     <Input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required 
                        sx={{
                           width: {
                              xs: '100%',
                              sm: 'fit-content'
                           },
                        }}
                     />
                  </FormControl>
                  <FormControl
                     sx={{ mt: 3 }}
                  >
                     <FormLabel
                        sx={{
                           color: 'text.primary',
                           fontSize: {
                              xs: 15,
                              lg: 17,
                           }
                        }}
                     >
                        E-mail
                     </FormLabel>
                     <Input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required 
                        type='email'
                        sx={{
                           width: {
                              xs: '100%',
                              sm: 'fit-content'
                           },
                        }}
                     />
                  </FormControl>
                  <FormControl
                     sx={{
                        mt: 3,
                        alignItems: 'center'
                     }}
                  >
                     <FormLabel
                        sx={{
                           pl: 2,
                           color: 'text.primary',
                           fontSize: {
                              xs: 15,
                              lg: 17,
                           },
                        }}
                     >
                        Current password
                     </FormLabel>
                     <Input 
                        required 
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        type={ !viewCurrentPassword ? "password" : 'text' }
                        endDecorator={ 
                           !viewCurrentPassword 
                           ?  <VisibilityOutlinedIcon 
                                 sx={{ ":hover": { cursor: 'pointer' } }} 
                                 onClick={() => setViewCurrentPassword(true)} 
                              /> 
                           :  <VisibilityOffOutlinedIcon 
                                 sx={{ ":hover": { cursor: 'pointer' } }} 
                                 onClick={() => setViewCurrentPassword(false)} 
                              /> 
                        }
                        sx={{ width: '90%' }}
                     />
                  </FormControl>
                  <FormControl
                     sx={{
                        mt: 3,
                        alignItems: 'center'
                     }}
                  >
                     <FormLabel
                        sx={{
                           pl: 2,
                           color: 'text.primary',
                           fontSize: {
                              xs: 15,
                              lg: 17,
                           }
                        }}
                     >
                        New password
                     </FormLabel>
                     <Input 
                        required 
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        type={ !viewNewPassword ? "password" : 'text' }
                        endDecorator={ 
                           !viewNewPassword 
                           ?  <VisibilityOutlinedIcon 
                                 sx={{ ":hover": { cursor: 'pointer' } }} 
                                 onClick={() => setViewNewPassword(true)} 
                              /> 
                           :  <VisibilityOffOutlinedIcon 
                                 sx={{ ":hover": { cursor: 'pointer' } }} 
                                 onClick={() => setViewNewPassword(false)} 
                              /> 
                        }
                        sx={{ width: { xs: '90%' } }}
                     />
                  </FormControl>
                  <Box
                     paddingX={3}
                     width={'100%'}
                     display={'flex'}
                     justifyContent={'center'}
                  >
                     <Button 
                        loading={loading}
                        size='sm'
                        variant='solid'
                        color='neutral'
                        type="submit"
                        sx={{
                           paddingX: 3,
                           mt: 5,
                           width: {
                              xs: '70%',
                           },
                        }}
                     >
                        Save
                     </Button>
                  </Box>
               </Box>
            </Card>
         </form>
      </>
   );
}
