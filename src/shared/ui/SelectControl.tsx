import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

export type SelectControlProps<T extends string> = {
  id: string;
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  size?: "small" | "medium";
};

export const SelectControl = <T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  size = "small",
}: SelectControlProps<T>) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as T);
  };

  const selected = options.find((option) => option.value === value);

  const flagMap: Record<string, string> = {
    EN: "/img/flags/ua.svg",
    CS: "/img/flags/cs.svg",
    DE: "/img/flags/de.svg",
    ES: "/img/flags/es.svg",
    PL: "/img/flags/pl.svg",
  };
  const flagSrc = flagMap[value];

  return (
    <FormControl
      size={size}
      variant="outlined"
      sx={{
        width: "100%",
        minWidth: 280,
        "& .MuiInputBase-root": {
          height: 72,
          borderRadius: 1,
          background:
            "linear-gradient(90deg, rgba(20, 30, 60, 0.95) 0%, rgba(35, 50, 90, 0.95) 100%)",
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.12), 0 10px 24px rgba(0,0,0,0.35)",
          color: "rgba(255,255,255,0.9)",
          transition: "transform 120ms ease, box-shadow 120ms ease, filter 120ms ease",
        },
        "& .MuiInputBase-root:hover": {
          filter: "brightness(1.04)",
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.12), 0 14px 30px rgba(0,0,0,0.4)",
          transform: "translateY(-1px)",
        },
        "& .MuiInputBase-root.Mui-focused": {
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.16), 0 14px 30px rgba(0,0,0,0.4)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-icon": {
          color: "rgba(255,255,255,0.7)",
          right: 18,
          fontSize: 22,
        },
      }}
    >
      <InputLabel id={`${id}-label`} sx={{ display: "none" }}>
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{ disableScrollLock: true }}
        renderValue={() => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "2px solid rgba(255,255,255,0.95)",
                display: "grid",
                placeItems: "center",
              }}
            >
              {flagSrc ? (
                <Box
                  component="img"
                  src={flagSrc}
                  alt=""
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#ffffff" }}>
                  {String(selected?.label ?? value).slice(0, 2).toUpperCase()}
                </Typography>
              )}
            </Box>
            <Typography sx={{ fontSize: 16, color: "rgba(255,255,255,0.85)" }}>
              {selected?.label ?? value}
            </Typography>
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
