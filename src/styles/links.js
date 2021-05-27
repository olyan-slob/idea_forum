import MaterialLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

const InternalLink = ({ to, children }) => {
  return (
    <MaterialLink
      component={Link}
      to={to}
      style={{ color: "#524450", marginTop: "10px" }}
    >
      {children}
    </MaterialLink>
  );
};

const HeaderLink = ({ to, children }) => {
  return (
    <Typography variant="h3">
      <MaterialLink
        component={Link}
        to={to}
        color="inherit"
        style={{
          color: "#181219",
          fontFamily: "Crimson Text",
        }}
      >
        {children}
      </MaterialLink>
    </Typography>
  );
};

export { InternalLink, HeaderLink };
