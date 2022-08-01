import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomizedSnackbars = () => {
  const { snackbarOpen, snackbarType, snackbarMessage } = useSelector(
    (state) => state.snackbar
  );

  useEffect(() => {
    const notify = () => {
      if (snackbarType === "success") {
        toast.success(snackbarMessage, {
          style: { backgroundColor: "#43A047", color: "#fff" },
        });
      } else if (snackbarType === "error") {
        toast.error(snackbarMessage, {
          style: { backgroundColor: "#EF5350", color: "#fff" },
        });
      }
    };
    snackbarOpen && notify();
  }, [snackbarOpen, snackbarType, snackbarMessage]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="colored"
      pauseOnHover
    />
  );
};

export default CustomizedSnackbars;
