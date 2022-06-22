import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { blockchainContext } from "../context/blockchainContext";
import moment from "moment";
import * as blockchain from "../apis/blockchain";

const UnlockedCard = () => {
  const { setLockedUntil } = React.useContext(blockchainContext);
  const rollLottery = async (e) => {
    e.preventDefault();
    console.log("Rolling");
    //TODO add roll lottery logic

    setLockedUntil(moment().add(5, "minute").format("YYYY-MM-DD HH:mm:ss"));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Roll the lottery!
        </Typography>
        <Button variant="contained" color="primary" onClick={rollLottery}>
          Pick a Winner
        </Button>
      </CardContent>
    </Card>
  );
};

export default UnlockedCard;