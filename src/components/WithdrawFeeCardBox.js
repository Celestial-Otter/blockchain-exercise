import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { blockchainContext } from "../context/blockchainContext";
import * as blockchain from "../apis/blockchain";

const WithDrawFeeCardBox = ({ title, description }) => {
  const withdraw = async (e) => {
    e.preventDefault();

    //withdraw the fees
    const feePool = await blockchain.withdrawFeePool();
    console.log(feePool + " is the fee pool");
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button variant="contained" color="primary" onClick={withdraw}>
          Withdraw fees
        </Button>
      </CardContent>
    </Card>
  );
};

export default WithDrawFeeCardBox;
