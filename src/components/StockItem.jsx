import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { currencyFormat } from "../utils";
const StockItem = ({ item, setSelectedItem }) => {
  return (
    <>
      <ListItem sx={{ padding: "0px !important;" }}>
        <ListItemButton
          onClick={() => setSelectedItem(() => item)}
          disabled={item.stock <= 0}
        >
          <ListItemText primary={item.itemText} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="subtitle1">{`${currencyFormat(
              item.unitAmount
            )} ₺ / ${item.unit} `}</Typography>
            <Typography variant="subtitle2" color="green">
              Available stock: {item.stock}
            </Typography>
          </Box>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default StockItem;
