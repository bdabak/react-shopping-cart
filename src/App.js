import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Alert, Container, Divider, Drawer, Snackbar } from "@mui/material";

import Cart from "./components/Cart";
import ShoppingForm from "./components/ShoppingForm";
import StockPane from "./components/StockPane";

import { initialStock } from "./data/index";
import Header from "./components/Header";

function App() {
  const [stockList] = useState(initialStock);
  const [updatedStockList, setUpdatedStockList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartList, setCartList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showNoItem, setShowNoItem] = useState(false);

  const recalculateStock = useCallback(() => {
    setUpdatedStockList(() => {
      const newStockList = stockList.map((stockItem) => {
        let newStockItem = { ...stockItem };
        let foundItem = cartList.find(
          (cartItem) => cartItem.itemId === newStockItem.itemId
        );
        if (foundItem) {
          newStockItem.stock =
            parseFloat(newStockItem.stock) - parseFloat(foundItem.quantity);
          return newStockItem;
        } else {
          return newStockItem;
        }
      });
      return newStockList;
    });
  }, [cartList, stockList]);

  useEffect(() => {
    setUpdatedStockList(() => [...stockList]);
  }, [stockList]);

  useEffect(() => {
    recalculateStock();
  }, [cartList, recalculateStock]);

  return (
    <div className="App">
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "azure",
          padding: "0px !important;",
        }}
      >
        <Header
          setShowCart={setShowCart}
          setShowNoItem={setShowNoItem}
          itemCount={cartList.length}
        />
        <Container
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            paddingLeft: "0px !important;",
            paddingRight: "0px !important;",
          }}
        >
          <StockPane
            stockList={updatedStockList}
            setSelectedItem={setSelectedItem}
          />
          <Divider orientation="vertical" flexItem />
          <ShoppingForm
            selectedItem={selectedItem}
            setCartList={setCartList}
            setSelectedItem={setSelectedItem}
            setShowCart={setShowCart}
          />
        </Container>
      </Container>
      <Drawer open={showCart} onClose={() => setShowCart(false)} anchor="right">
        <Cart
          cartList={cartList}
          setCartList={setCartList}
          setShowCart={setShowCart}
        />
      </Drawer>
      <Snackbar
        open={showNoItem}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={() => setShowNoItem(() => false)}>
          Cart has no items!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
