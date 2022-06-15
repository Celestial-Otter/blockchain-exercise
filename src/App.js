import React, { useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";

export default function App() {
  const [greeting, setGreeting] = React.useState("");

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
    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // contract address
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      provider
    );
    const greeting = await contract.greet();
    setGreeting(greeting);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      <h1>Hello {greeting}</h1>
    </div>
  );
}
