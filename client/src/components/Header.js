import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/system";
import { useGlobalContext } from "../context/GlobalContext";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Draw from "./SideNavigation";

export default function Header() {
  const { user, logout } = useGlobalContext();
  const { pathname } = useLocation();

  return (
    <Box marginBottom={5}>
      <AppBar position="sticky" style={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BugTracker
          </Typography>
          {pathname === "/" ? (
            <Stack direction="row" spacing={2}>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button color="inherit" component={Link} to="/">
                Login
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
