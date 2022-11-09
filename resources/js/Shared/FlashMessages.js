import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default ({ position = "bottom-right", autoClose = 2000 }) => {
  const { flash, errors } = usePage().props;
  const numOfErrors = Object.keys(errors).length;

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
    if (flash.error || numOfErrors > 0) {
      if (numOfErrors === 1) {
        toast.error('There is one form error');
      } else if (numOfErrors > 1) {
        toast.error(`There are ${numOfErrors} form errors.`);
      } else {
        toast.error(flash.error);
      }
    }
  }, [flash, errors]);

  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
