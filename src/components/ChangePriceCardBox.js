import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { blockchainContext } from "../context/blockchainContext";
import * as blockchain from "../apis/blockchain";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const ChangePriceCardBox = () => {
  const { ticketPrice, setTicketPrice } = React.useContext(blockchainContext);
  const [price, setPrice] = React.useState(0);

  const changePrice = async (e) => {
    e.preventDefault();
    await blockchain.setTicketPrice(price).then(console.log("Changed"));
    await blockchain.getTicketPrice().then((ticketPrice) => {
      setTicketPrice(ticketPrice);
    });
  };

  const handleChange = () => (event) => {
    setPrice(event.target.value);
    console.log(event.target.value);
    console.log(ticketPrice);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Change Price
        </Typography>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={price}
            onChange={handleChange()}
            endAdornment={<InputAdornment position="end">$MOK</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          {`Current price: ${ticketPrice / 10 ** 18} $MOK`}
        </Typography>
        <Button variant="contained" color="primary" onClick={changePrice}>
          Change Price
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChangePriceCardBox;
