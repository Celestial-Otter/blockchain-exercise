// https://blog.suhailkakar.com/setup-and-build-your-first-web-3-application
// https://www.wealdtech.com/articles/ethereum-smart-service-payment-with-tokens/

import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import MOKToken from "./artifacts/contracts/MOKToken.sol/MOKToken.json";
import { ethers } from "ethers";

import CardBox from "./components/CardBox";
import BuyTicketCardBox from "./components/BuyTicketCardBox";
import { Container } from "@mui/system";

export default function App() {
  const [greeting, setGreeting] = React.useState("");
  const [tokenSymbol, setSymbol] = React.useState("");
  const connectWallet = async () => {
    // connect to wallet
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      fetchGreetings();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGreetings = async () => {
    // fetch greetings from contract
    let greeterContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // contract address
    let MOKTokenContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // contract address
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const greeterContract = new ethers.Contract(
      greeterContractAddress,
      Greeter.abi,
      provider
    );
    const mokTokenContract = new ethers.Contract(
      MOKTokenContractAddress,
      MOKToken.abi,
      provider
    );
    const greeting = await greeterContract.greet();
    setGreeting(greeting);
    console.log(greeting);

    const symbol = await mokTokenContract.symbol();
    setSymbol(symbol);
  };

  useEffect(() => {
    connectWallet();
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
