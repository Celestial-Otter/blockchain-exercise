import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { blockchainContext } from "../context/blockchainContext";
import * as blockchain from "../apis/blockchain";

const ApproveCardBox = () => {
  const { isApproved, setApprove, setApprovedAmount } =
    React.useContext(blockchainContext);

  const approveWallet = async (e) => {
    e.preventDefault();
    const userBalance = await blockchain.getBalance().then((balance) => {
      return balance;
    });
    await blockchain.approve(userBalance).then(console.log("Approved"));

    setApprovedAmount(userBalance);
    setApprove(true);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Approve
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click to give the contract access to your tokens
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={approveWallet}
          disabled={isApproved}
        >
          Approve
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApproveCardBox;
