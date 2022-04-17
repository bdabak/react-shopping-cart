import React, { useEffect, useState } from "react";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import uuid from "react-uuid";

const Cart = ({ cartList, setCartList, setShowCart }) => {
  const [total, setTotal] = useState(0);

  const handleDeleteItem = (id) => {
    setCartList((oldList) => {
      const newList = oldList.filter((item) => item.itemId !== parseInt(id));
      return newList;
    });
  };

  useEffect(() => {
    let t = 0;
    cartList.forEach((item) => {
      t = t + parseFloat(item.amount);
    });
    setTotal(() => parseFloat(t).toFixed(2));
    if (cartList?.length === 0) {
      setShowCart(() => false);
    }
  }, [cartList, setShowCart]);

  return (
    <Box sx={{ minWidth: "350px" }}>
      <Paper elevation={0}>
        {cartList.map((item) => {
          return (
            <React.Fragment key={uuid()}>
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "0.5rem",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "light" }}>
                  {item.itemText} x ({item.quantity} {item.unit})
                </Typography>
                <Box
                  sx={{
                    marginLeft: "auto",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">{item.amount} ₺</Typography>
                  <IconButton onClick={() => handleDeleteItem(item.itemId)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </Paper>
              <Divider />
            </React.Fragment>
          );
        })}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
            padding: "0.5rem",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6" sx={{ marginLeft: "auto" }}>
            {total} ₺
          </Typography>
        </Paper>
      </Paper>
    </Box>
  );
};

export default Cart;
