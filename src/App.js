// https://blog.suhailkakar.com/setup-and-build-your-first-web-3-application
// https://www.wealdtech.com/articles/ethereum-smart-service-payment-with-tokens/

import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import * as blockchain from "./apis/blockchain";
import CardBox from "./components/CardBox";
import BuyTicketCardBox from "./components/BuyTicketCardBox";
import { Container } from "@mui/system";

export default function App() {
  const [greeting, setGreeting] = React.useState("");
  const [tokenSymbol, setSymbol] = React.useState("");
  const [ticketPrice, setTicketPrice] = React.useState("");

  useEffect(() => {
    blockchain.connectWallet();
    blockchain.fetchGreetings().then((greeting) => setGreeting(greeting));
    blockchain.getSymbol().then((symbol) => setSymbol(symbol));
    //blockchain.approve(50).then(console.log("Approved"));
    blockchain
      .getTicketPrice()
      .then((price) => setTicketPrice(price / 10 ** 18));
  }, []);

  return (
    <Container>
      <h1>{greeting}</h1>
      <Grid container rowSpacing={8}>
        <Grid item xs={4}>
          <CardBox title={"Current Jackpot"} />
          <p>{tokenSymbol}</p>
          <p>{ticketPrice}</p>
        </Grid>

        <Grid item xs={4}>
          <CardBox
            title={"Previous Jackpot"}
            description={"Insert Text here"}
          />
        </Grid>

        <Grid item xs={4}>
          <CardBox title={"Winning Ticket"} description={"Insert Text here"} />
        </Grid>

        <Grid item xs={4}>
          <BuyTicketCardBox title={"Ticket Price"} description={"$MOK"} />
        </Grid>

        <Grid item xs={4}>
          <CardBox title={"Locked Until"} description={"Insert Text here"} />
        </Grid>
      </Grid>
    </Container>
  );
}
