import { Snackbar, SnackbarContent } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

type SnackbarContextType = {
  openSnackbar: (newMsg: string, newClassName: string) => void;
};

const snackBarContext = createContext<SnackbarContextType | null>(
  null
);

type SnackbarProps = {
  children: ReactNode;
};

export const SnackbarProvider = ({ children }: SnackbarProps) => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [className, setClassName] = useState("");

  const openSnackbar = (newMsg: string, newClassName: string) => {
    setMsg(newMsg);
    setClassName(newClassName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const contextValue = {
    openSnackbar,
  };

  return (
    <>
      <snackBarContext.Provider value={contextValue}>
        {children}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <SnackbarContent
            message={typeof msg === "string" ? msg : <span>{msg}</span>}
            className={className}
          />
        </Snackbar>
      </snackBarContext.Provider>
    </>
  );
};

export const useSnackbar = () => {
  const context = useContext(snackBarContext);
  if (!context) {
    throw new Error("snackbar must use within snackbar provider");
  }
  return context;
};