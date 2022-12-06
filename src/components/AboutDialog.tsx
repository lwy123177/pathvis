import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AboutDialog: React.FC<{
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}> = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Path Visualizer App"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          A visualization tool for finding a path from target to destination.
          While the BFS and the A* algorithm can guarantee to find the shortest
          path, the DFS algorithm can only find one that exists(which most
          likely won't be the shortest😂)
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AboutDialog;
