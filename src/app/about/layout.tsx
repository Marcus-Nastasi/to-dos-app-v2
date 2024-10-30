import { Metadata } from 'next';
import { Fragment } from "react";
import About from './page';

export const metadata: Metadata = {
   title: 'About - To-Dos App'
};

export default function AboutLayout() {
   return (
      <Fragment>
         <About />
      </Fragment>
   );
}
