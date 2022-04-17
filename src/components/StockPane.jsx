import { Box, Divider, Typography } from "@mui/material";
import uuid from "react-uuid";
import StockItem from "./StockItem";

const StockPane = ({ stockList, setSelectedItem }) => {
  return (
    <Box
      sx={{
        width: "40%",
        paddingLeft: "0px !important;",
        paddingRight: "0px !important;",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "left", padding: "1rem" }}>
        Items
      </Typography>
      <Divider />
      {stockList.map((item) => (
        <StockItem key={uuid()} item={item} setSelectedItem={setSelectedItem} />
      ))}
    </Box>
  );
};

export default StockPane;
