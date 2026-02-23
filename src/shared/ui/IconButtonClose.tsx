import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, IconButtonProps } from "@mui/material";

export const IconButtonClose: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props}>
      <CloseIcon />
    </IconButton>
  );
};
