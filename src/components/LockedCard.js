import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { blockchainContext } from "../context/blockchainContext";
import moment from "moment";
import * as blockchain from "../apis/blockchain";
import { useContext } from "react";

const LockedCard = () => {
  const { lockedUntil } = useContext(blockchainContext);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Locked Until:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {lockedUntil}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LockedCard;
