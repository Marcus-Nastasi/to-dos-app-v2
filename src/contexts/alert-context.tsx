'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface AlertContextProps {
   showAlert: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
   const context = useContext(AlertContext);
   if (!context) {
      throw new Error('useAlert must be used within an AlertProvider');
   }
   return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState<string>();
   const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>();

   const showAlert = (msg: string, sev: 'success' | 'error' | 'warning' | 'info') => {
      setMessage(msg);
      setSeverity(sev);
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <AlertContext.Provider value={{ showAlert }}>
         {children}
         <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
         >
            <Alert 
               onClose={handleClose} 
               severity={severity} 
               variant='standard' 
               color={severity}
               sx={{ width: '100%' }}
            >
               {message}
            </Alert>
         </Snackbar>
      </AlertContext.Provider>
   );
};
