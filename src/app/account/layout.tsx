import { Metadata } from 'next';
import { Fragment } from "react";
import Account from './page';

export const metadata: Metadata = {
   title: 'Account - To-Dos App'
};

export default function AboutLayout() {
   return (
      <Fragment>
         <Account />
      </Fragment>
   );
}
