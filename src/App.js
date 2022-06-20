// https://blog.suhailkakar.com/setup-and-build-your-first-web-3-application
// https://www.wealdtech.com/articles/ethereum-smart-service-payment-with-tokens/

import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import MOKToken from "./artifacts/contracts/MOKToken.sol/MOKToken.json";
import { ethers } from "ethers";
import { connectWallet, fetchGreetings, getSymbol } from "./apis/blockchain";
import CardBox from "./components/CardBox";
import BuyTicketCardBox from "./components/BuyTicketCardBox";
import { Container } from "@mui/system";

export default function App() {
  const [greeting, setGreeting] = React.useState("");
  const [tokenSymbol, setSymbol] = React.useState("");

  useEffect(() => {
    connectWallet();
    fetchGreetings().then((greeting) => setGreeting(greeting));
    getSymbol().then((symbol) => setSymbol(symbol));
  }, []);

  return (
    <Container>
      <h1>{greeting}</h1>
      <Grid container rowSpacing={8}>
        <Grid item xs={4}>
          <CardBox title={"Current Jackpot"} />
          <p>{tokenSymbol}</p>
        </Grid>

        <Grid item xs={4}>
          <CardBox title={"Previous Jackpot"} />
        </Grid>

        <Grid item xs={4}>
          <CardBox title={"Winning Ticket"} />
        </Grid>

        <Grid item xs={4}>
          <BuyTicketCardBox title={"Ticket Price"} />
        </Grid>

        <Grid item xs={4}>
          <CardBox title={"Locked Until"} />
        </Grid>
      </Grid>
    </Container>
  );
}
