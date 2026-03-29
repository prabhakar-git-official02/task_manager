"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type AlertType = "success" | "error" | "warning" | "info";

interface Props {
  open: boolean;
  message: string;
  type: AlertType;
  onClose: () => void;
}

export default function AlertMessage({
  open,
  message,
  type,
  onClose,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={type} variant="filled" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}