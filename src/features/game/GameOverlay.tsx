import React, { useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type GameOverlayProps = {
  open: boolean;
  onClose: () => void;
  url: string;
  closeLabel: string;
};

export const GameOverlay: React.FC<GameOverlayProps> = ({ open, onClose, url, closeLabel }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const timeout = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1400,
        backgroundColor: "#000",
      }}
    >
      <IconButton
        ref={closeButtonRef}
        onClick={onClose}
        aria-label={closeLabel}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 2,
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.5)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        component="iframe"
        src={url}
        title="Casino Game"
        sx={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};
