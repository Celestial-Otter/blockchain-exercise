// https://blog.suhailkakar.com/setup-and-build-your-first-web-3-application
// https://www.wealdtech.com/articles/ethereum-smart-service-payment-with-tokens/

import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";

import CardBox from "./components/CardBox";
import BuyTicketCardBox from "./components/BuyTicketCardBox";
import * as blockchain from "./apis/blockchain";
import { blockchainContext } from "./context/blockchainContext";

export default function App() {
  const [currentJackpot, setCurrentJackpot] = React.useState("");
  const [previousJackpot, setPreviousJackpot] = React.useState("");
  const [winningTicket, setWinningTicket] = React.useState("");
  const [lockedUntil, setLockedUntil] = React.useState("");
  const [ticketPrice, setTicketPrice] = React.useState("");

  useEffect(() => {
    blockchain.connectWallet();
    blockchain
      .getCurrentJackpot()
      .then((jackpot) => setCurrentJackpot(jackpot));
    blockchain
      .getPreviousJackpot()
      .then((jackpot) => setPreviousJackpot(jackpot));
    blockchain.getTicketPrice().then((price) => setTicketPrice(price));
  }, []);

  return (
    <blockchainContext.Provider
      value={{
        currentJackpot,
        previousJackpot,
        winningTicket,
        lockedUntil,
        ticketPrice,
      }}
    >
      <Container>
        <Grid container rowSpacing={8}>
          <Grid item xs={4}>
            <CardBox
              title={"Current Jackpot"}
              description={`${currentJackpot}`}
            />
          </Grid>

          <Grid item xs={4}>
            <CardBox
              title={"Previous Jackpot"}
              description={`${previousJackpot}`}
            />
          </Grid>

          <Grid item xs={4}>
            <CardBox
              title={"Winning Ticket"}
              description={`${winningTicket}`}
            />
          </Grid>

          <Grid item xs={4}>
            <BuyTicketCardBox
              title={"Ticket Price"}
              description={`${ticketPrice / 10 ** 18} $MOK`}
            />
          </Grid>

          <Grid item xs={4}>
            <CardBox title={"Locked Until"} description={`${lockedUntil}`} />
          </Grid>
        </Grid>
      </Container>
    </blockchainContext.Provider>
  );
}
