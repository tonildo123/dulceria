import { Box, Typography } from "@mui/material";
import React from "react";

export const InfoRow = ({ icon, label, value, onClick }) => (
    <Box onClick={onClick} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {React.cloneElement(icon, { fontSize: 'small' })}
      <Typography variant="body1" sx={{ ml: 2, fontWeight: 'bold' }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ ml: 1 }}>
        {value}
      </Typography>
    </Box>
  );