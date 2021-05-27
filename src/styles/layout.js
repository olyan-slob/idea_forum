import { Box } from "@material-ui/core";
import React from "react";

const HeaderFooterWrapper = ({ children }) => {
  return (
    <Box
      maxWidth="720px"
      my={0}
      mx="auto"
      display="grid"
      gridTemplateRows="max-content auto max-content"
      minHeight="100vh"
    >
      {children}
    </Box>
  );
};

const Header = ({ children }) => {
  return (
    <Box my="3rem" px="1rem" display="flex" justifyContent="space-between">
      {children}
    </Box>
  );
};

const Page = ({ children }) => {
  return <Box p="1rem">{children}</Box>;
};

const Footer = ({ children }) => {
  return (
    <Box p="1rem" textAlign="center" color="text.disabled">
      {children}
    </Box>
  );
};

export { HeaderFooterWrapper, Header, Page, Footer };
