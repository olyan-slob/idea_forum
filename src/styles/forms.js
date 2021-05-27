import { Box } from "@material-ui/core";
import React from "react";

const FormRow = ({ children }) => {
  return (
    <Box marginBottom="1rem" display="block">
      {children}
    </Box>
  );
};

export { FormRow };
