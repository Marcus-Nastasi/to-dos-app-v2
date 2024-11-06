import { Metadata } from 'next';
import { Fragment } from "react";
import Account from './page';
import Dashboard from './page';

export const metadata: Metadata = {
   title: 'Dashboard - To-Dos App'
};

export default function DashboardLayout() {
   return (
      <Fragment>
         <Dashboard />
      </Fragment>
   );
}
