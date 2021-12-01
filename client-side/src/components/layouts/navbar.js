import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { navbarData } from "../../data/navbarData";
import Logout from "../layouts/Logout";
import authContext from "../context/authContext";
import { Button } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";

import { Drawer } from "@mui/material";
import { Divider } from "@mui/material";

const drawerWidth = 240;

const Navbar = () => {
  const { loggedIn } = useContext(authContext);
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(!open);
  };
  const closeDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box flexGrow="1" sx={{ background: "rgb(51, 153, 255)" }}>
          <AppBar>
            <Toolbar>
              <IconButton onClick={openDrawer}>
                <MenuIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Button onClick={closeDrawer}>
          <CloseIcon fontSize="large" sx={{ color: "rgb(51, 153, 255)" }} />
        </Button>
        <Divider />
        <List>
          {loggedIn ? (
            <>
              <ListItem>
                <ListItemButton>
                  <Link to="/home">Home</Link>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <Link to="/dashboard">DashBoard</Link>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <Link to="/home">Link</Link>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <Link to="/home">Link</Link>
                </ListItemButton>
              </ListItem>

              <Container sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Logout />
              </Container>
            </>
          ) : (
            <>
              <ListItem>
                <ListItemButton>
                  <Link to="signup">Sign Up</Link>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <Link to="/login">Login</Link>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

// ALT WAY OF MAPPING LINKS
//  { {navbarData.map((link) => {
//       return (
//         <li key={link.id}>
//           <Link to={link.path}>{link.title}</Link>
//         </li>
//       );
//     })} }
export default Navbar;
