// https://blog.suhailkakar.com/setup-and-build-your-first-web-3-application
// https://www.wealdtech.com/articles/ethereum-smart-service-payment-with-tokens/

import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import moment from "moment";

import CardBox from "./components/CardBox";
import BuyTicketCardBox from "./components/BuyTicketCardBox";
import RollLotteryCardBox from "./components/RollLotteryCardBox";
import * as blockchain from "./apis/blockchain";
import { blockchainContext } from "./context/blockchainContext";
import WithDrawFeeCardBox from "./components/WithdrawFeeCardBox";

export default function App() {
  const [currentJackpot, setCurrentJackpot] = React.useState("");
  const [previousJackpot, setPreviousJackpot] = React.useState("");
  const [winningTicket, setWinningTicket] = React.useState("");
  const [lockedUntil, setLockedUntil] = React.useState("");
  const [ticketPrice, setTicketPrice] = React.useState("");
  const [feePool, setFeePool] = React.useState("");

  useEffect(() => {
    blockchain.connectWallet();

    blockchain
      .getCurrentJackpot()
      .then((jackpot) => setCurrentJackpot(jackpot));

    blockchain
      .getPreviousJackpot()
      .then((jackpot) => setPreviousJackpot(jackpot));

    blockchain.getWinningTicket().then((ticket) => setWinningTicket(ticket));

    blockchain.getTicketPrice().then((price) => setTicketPrice(price));

    blockchain.getFeePool().then((feePool) => setFeePool(feePool));

    blockchain
      .getLockedUntil()
      .then((lockedUntil) =>
        setLockedUntil(moment.unix(lockedUntil).format("YYYY-MM-DD HH:mm:ss"))
      );
  }, []);

  return (
    <blockchainContext.Provider
      value={{
        currentJackpot,
        setCurrentJackpot,
        previousJackpot,
        setPreviousJackpot,
        winningTicket,
        setWinningTicket,
        lockedUntil,
        setLockedUntil,
        ticketPrice,
        setTicketPrice,
        feePool,
        setFeePool,
      }}
    >
      <Container>
        <Grid container rowSpacing={8}>
          <Grid item xs={4}>
            <CardBox
              title={"Current Jackpot"}
              description={`${currentJackpot / 10 ** 18} $MOK`}
            />
          </Grid>

          <Grid item xs={4}>
            <CardBox
              title={"Previous Jackpot"}
              description={`${previousJackpot / 10 ** 18} $MOK`}
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
            <RollLotteryCardBox
              title={"Locked Until"}
              description={`${lockedUntil}`}
            />
          </Grid>

          <Grid item xs={4}>
            <WithDrawFeeCardBox
              title={"Withdraw Fees"}
              description={`${feePool / 10 ** 18} $MOK`}
            />
          </Grid>
        </Grid>
      </Container>
    </blockchainContext.Provider>
  );
}
