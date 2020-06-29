import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function Message(props) {
  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={props.information}
        key={vertical + horizontal}
        autoHideDuration={4000}
      />
    </div>
  );
}
