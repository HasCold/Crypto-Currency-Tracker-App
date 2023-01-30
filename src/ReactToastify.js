import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// In this example, the toast.success method is executed only when the showToast prop is true, and it is triggered inside a useEffect hook. The useEffect hook is executed only when the showToast value changes, so it won't be executed unnecessarily.

const ReactToastify = ({ showToast }) => {
  useEffect(() => {
    if (showToast) {
      toast.success("Data Successfully Rendered");
    }
  }, [showToast]);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ReactToastify;