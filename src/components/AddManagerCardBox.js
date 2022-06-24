import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import * as blockchain from "../apis/blockchain";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const AddManagerCardBox = () => {
  const [address, setAddress] = React.useState("");

  const handleChange = () => (event) => {
    setAddress(event.target.value);
    console.log(event.target.value);
  };

  const addManager = async (e) => {
    e.preventDefault();

    await blockchain.addManager(address).then(console.log("Added"));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Add manager
        </Typography>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Address</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={address}
            onChange={handleChange()}
            label="Amount"
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={addManager}>
          Add Manager
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddManagerCardBox;
