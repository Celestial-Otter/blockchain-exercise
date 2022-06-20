import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const BuyTicketCardBox = ({ title }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          20 $MOK
        </Typography>
        <Button variant="contained" color="primary">
          Buy
        </Button>
      </CardContent>
    </Card>
  );
};

export default BuyTicketCardBox;
