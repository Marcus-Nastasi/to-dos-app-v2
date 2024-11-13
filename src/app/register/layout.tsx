import { Metadata } from "next";
import { Fragment } from "react";
import Register from "./page";

export const metadata: Metadata = {
   title: "Registre - To-dos App",
};

export default function LoginLayout() {
   return (
      <Fragment>
         <Register />
      </Fragment>
   );
}
