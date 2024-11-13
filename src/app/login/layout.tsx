import { Metadata } from "next";
import Login from "./page";
import { Fragment } from "react";

export const metadata: Metadata = {
   title: "Login - To-dos App",
};

export default function LoginLayout() {
   return (
      <Fragment>
         <Login />
      </Fragment>
   );
}
