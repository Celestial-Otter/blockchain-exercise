import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { blockchainContext } from "../context/blockchainContext";
import * as blockchain from "../apis/blockchain";

const BuyTicketCardBox = ({ title, description }) => {
  const { ticketPrice, setCurrentJackpot, setFeePool } =
    React.useContext(blockchainContext);

  const joinLottery = async (e) => {
    e.preventDefault();
    await blockchain.approve(ticketPrice).then(console.log("Approved"));
    await blockchain.joinLottery().then(console.log("Joined"));
    await blockchain.getCurrentJackpot().then((jackpot) => {
      setCurrentJackpot(jackpot);
    });
    await blockchain.getFeePool().then((feePool) => {
      setFeePool(feePool);
    });
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
        <Button variant="contained" color="primary" onClick={joinLottery}>
          Buy
        </Button>
      </CardContent>
    </Card>
  );
};

export default BuyTicketCardBox;
