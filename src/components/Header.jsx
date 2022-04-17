import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";

const Header = ({ setShowNoItem, setShowCart, itemCount }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SMOD Shopping Cart
        </Typography>
        <IconButton
          onClick={(e) => {
            setShowNoItem(() => false);
            if (itemCount > 0) {
              setShowCart(() => true);
            } else {
              setShowNoItem(() => true);
            }
          }}
          sx={{ marginLeft: "auto" }}
        >
          <Badge badgeContent={`${itemCount}`} color="secondary">
            <ShoppingCartIcon color="action" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
