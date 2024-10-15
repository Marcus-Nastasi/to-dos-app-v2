import { Metadata } from "next";
import LoginForm from "../../components/login/login-form";
import { Box } from "@mui/joy";

export const metadata: Metadata = {
   title: "Login - To-dos App",
};

export default function Login() {
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
         <LoginForm />
      </Box>
   );
}
