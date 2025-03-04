import React from "react";
import Typography from "@mui/material/Typography";

/**
 * General-use stylized paragraph component.
 *
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 */
export const P = ({ children }: { children: React.ReactNode }) => (
  <Typography component="p" sx={{ lineHeight: 2, marginTop: 2 }}>
    {children}
  </Typography>
);
