import { useEffect, useRef, useState } from "react";

import {
  Box,
  Stack,
  TextField,
  Paper,
  Alert,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import { currencyFormat, calculateAmount } from "../utils";

const ShoppingForm = ({
  selectedItem,
  setCartList,
  setSelectedItem,
  setShowCart,
}) => {
  const [quantity, setQuantity] = useState(0);
  const quantityRef = useRef(null);

  const handleAddToCart = (e) => {
    e.preventDefault();

    const newItem = {
      itemId: selectedItem.itemId,
      itemText: selectedItem.itemText,
      unit: selectedItem.unit,
      unitAmount: selectedItem.unitAmount,
      quantity: quantity,
      amount: calculateAmount(selectedItem.unitAmount, quantity),
    };

    setCartList((chartList) => {
      let found = false;
      const updatedCart = chartList.map((item) => {
        if (item.itemId === newItem.itemId) {
          found = true;
          item.quantity =
            parseFloat(item.quantity) + parseFloat(newItem.quantity);
          item.amount = calculateAmount(newItem.unitAmount, item.quantity);
          return item;
        } else {
          return item;
        }
      });
      if (!found) updatedCart.push(newItem);
      return updatedCart;
    });
    setShowCart(() => true);
    setSelectedItem(() => null);
  };

  useEffect(() => {
    setQuantity(0);

    if (selectedItem) {
      quantityRef.current.focus();
    }
  }, [selectedItem]);

  return (
    <Box
      sx={{
        width: "60%",
        padding: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!selectedItem && (
        <Alert severity="info" sx={{ margin: "1rem" }}>
          Please select an item from the left pane!
        </Alert>
      )}
      {selectedItem && (
        <>
          <form onSubmit={handleAddToCart}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", padding: "1rem" }}
            >
              Add Item to Cart
            </Typography>
            <Divider />
            <Paper elevation={0} sx={{ padding: "2rem" }} square>
              <Stack spacing={2}>
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: "0.2rem",
                    paddingRight: "0.2rem",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {selectedItem.itemText}
                  </Typography>
                  <Box>
                    <Typography variant="body1" align="right" fontWeight="bold">
                      {currencyFormat(selectedItem.unitAmount)} ₺ /{" "}
                      {selectedItem.unit}
                    </Typography>
                    <Typography variant="body2">
                      Available stock: {selectedItem.stock}
                    </Typography>
                  </Box>
                </Paper>
                <TextField
                  value={quantity}
                  label={`Quantity (${selectedItem?.unit})`}
                  placeholder={`Enter quantity in ${selectedItem?.unit}`}
                  variant="filled"
                  autoComplete="off"
                  inputRef={quantityRef}
                  onChange={(e) => {
                    let v = e.currentTarget.value;
                    if (isNaN(v)) {
                      setQuantity(0);
                      return;
                    }
                    if (parseInt(v) < 0) {
                      setQuantity(0);
                      return;
                    }

                    if (v > selectedItem.stock) {
                      setQuantity(selectedItem.stock);
                      return;
                    }
                    setQuantity(e.currentTarget.value);
                  }}
                />
                {quantity > 0 && (
                  <>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="body1">
                        {calculateAmount(selectedItem.unitAmount, quantity)}
                      </Typography>
                    </Box>
                  </>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    parseFloat(quantity) <= 0 ||
                    quantity === "" ||
                    quantity === null
                  }
                  sx={{ textTransform: "none" }}
                >
                  Add to Cart
                </Button>
              </Stack>
            </Paper>
          </form>
        </>
      )}
    </Box>
  );
};

export default ShoppingForm;
