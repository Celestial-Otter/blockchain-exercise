import { ethers } from "ethers";
import MOKToken from "../artifacts/contracts/MOKToken.sol/MOKToken.json";
import Greeter from "../artifacts/contracts/Greeter.sol/Greeter.json";

let greeterContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // contract address
let MOKTokenContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // contract address

export const connectWallet = async () => {
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
  } catch (error) {
    console.log(error);
  }
};

//!Test Function, Note: It works
export const fetchGreetings = async () => {
  // fetch greetings from contract
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

  const greeting = await greeterContract.greet();
  return greeting;
};

//!Test Function, Note: It works
export const getSymbol = async () => {
  // fetch greetings from contract
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokTokenContract = new ethers.Contract(
    MOKTokenContractAddress,
    MOKToken.abi,
    provider
  );
  const symbol = await mokTokenContract.symbol();
  return symbol;
};

//function to transfer tokens to the contract
export const transferTokens = async (amount) => {
  // fetch greetings from contract
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mokTokenContract = new ethers.Contract(
    MOKTokenContractAddress,
    MOKToken.abi,
    provider
  );
  const tx = await mokTokenContract.transfer(greeterContractAddress, amount);
  return tx;
};
